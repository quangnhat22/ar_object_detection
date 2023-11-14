import {
  ViroARImageMarker,
  ViroARTrackingTargets,
} from '@viro-community/react-viro';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ObjectInfoCard from '../components/ObjectInfoCard';

type ObjectDetectionProps = {
  modelName: string;
  description: string;
  images: Record<string, any>;
  imageLogo: any;
  productType: string;
  price: string;
  url: string;
  handleClick: () => void;
};

function ObjectDetectionPage(props: ObjectDetectionProps): JSX.Element {
  interface TargetData {
    [key: string]: {
      source: any;
      orientation: string;
      physicalWidth: number;
    };
  }

  const [targetDataCreated, setTargetDataCreated] = useState(false);
  const [indexImageFound, setIndexImageFound] = useState<number>(-1);
  const [indexOld, setIndexOld] = useState<number>(-1);

  useEffect(() => {
    const targetData: TargetData = {};
    // Sử dụng mảng imagePaths để tạo targetData
    Object.keys(props.images).forEach((key, i) => {
      targetData[`${props.modelName}${i + 1}`] = {
        source: props.images[key],
        orientation: 'Up',
        physicalWidth: 0.25, // real-world width in meters
      };
    });

    ViroARTrackingTargets.createTargets(targetData);

    // Set the flag to indicate that targetData is created
    setTargetDataCreated(true);
  }, [props.images, props.modelName]);

  function _onFoundObject(evt: any, id: number) {
    try {
      console.log(
        `Found Object ${props.modelName} ${id} , indexOld ${indexOld}`,
        evt,
      );
      setIndexImageFound(() => id);
      setIndexOld(indexImageFound);
    } catch (err) {
      console.log(err);
    }
  }

  function _onUpdatedObject(_: any) {}

  function _onLostObject(_: any) {
    setIndexImageFound(-1);
    setIndexOld(indexImageFound);
  }

  const renderList = () => {
    const listItems = [];
    try {
      for (let i = 0; i < Object.keys(props.images).length; i++) {
        if (i !== indexImageFound) {
          listItems.push(
            <ViroARImageMarker
              key={`${props.modelName}${i}`}
              target={`${props.modelName}${i + 1}`}
              onAnchorFound={() => _onFoundObject(props.modelName, i)}
              onAnchorRemoved={_onLostObject}
            />,
          );
        }
      }

      if (indexImageFound !== -1 && indexOld !== indexImageFound) {
        listItems.push(
          <ViroARImageMarker
            key={`${props.modelName}${indexImageFound}`}
            target={`${props.modelName}${indexImageFound + 1}`}
            onAnchorRemoved={_onLostObject}
            onAnchorUpdated={_onUpdatedObject}>
            {/* <ObjectText modelName={props.modelName} color={props.color} /> */}
            {/* <ObjectCardInfo
              modelName={props.modelName}
              color={props.color}
              image={props.imageLogo}
              description={props.description}
            /> */}
            <ObjectInfoCard
              modelName={props.modelName}
              image={props.imageLogo}
              description={props.description}
              productType={props.productType}
              price={props.price}
              url={props.url}
              handleClick={props.handleClick}
            />
          </ViroARImageMarker>,
        );
      }
    } catch (err) {
      console.log(err);
    }
    return listItems;
  };

  return <View>{targetDataCreated && renderList()}</View>;
}

export default ObjectDetectionPage;
