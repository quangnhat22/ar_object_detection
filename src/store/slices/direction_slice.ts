import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {convertDeg2Rad, getObjectPosition} from '../../utils/get_angle_service';
import {ProductPosition} from '../../data/ProductObject';

export type Direction = {
  heading: number;
  accuracy: number;
  rad: number;
};

interface DirectionState {
  direction: Direction;
  objectPosition: ProductPosition;
  isFindPositionObject: boolean;
}

const initialState: DirectionState = {
  direction: {
    heading: 0,
    accuracy: 0,
    rad: 0.0,
  },
  objectPosition: {
    x: 0,
    y: 0,
    z: 0,
  },
  isFindPositionObject: false,
};

export const DirectionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    initPosition: (
      state,
      action: PayloadAction<{x: number; y: number; z: number}>,
    ) => {
      const {x, y, z} = action.payload;
      state.objectPosition = {...state.objectPosition, x, y, z};
    },
    updateDirection: (
      state,
      action: PayloadAction<{heading: number; accuracy: number}>,
    ) => {
      const {heading, accuracy} = action.payload;
      const rad = convertDeg2Rad(heading);
      if (!state.isFindPositionObject) {
        const newObjectPosition = getObjectPosition(
          {
            x: 0,
            y: 0,
            z: 2,
          },
          heading,
          rad,
        );
        state.objectPosition = {...state.objectPosition, ...newObjectPosition};
        state.isFindPositionObject = true;
      }
      state.direction = {...state.direction, heading, accuracy, rad};
    },
  },
});

export default DirectionSlice.reducer;
export const {initPosition, updateDirection} = DirectionSlice.actions;
