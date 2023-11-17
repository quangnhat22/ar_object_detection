import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ViroARNavigationPage from './src/pages/ViroARNavigationPage';
import HomePage from './src/pages/HomePage';
import ViroAR3DObjectPage from './src/pages/3DUiObjectPage';
import ViroARDetectionImagesPage from './src/pages/ViroARDetectionImagesPage';
import ViroARDetectionObjectPage from './src/pages/ViroARDetectionObjectPage';

export type RootStackParamList = {
  Home: undefined;
  Direction: undefined;
  DetectObject: undefined;
  Model3D: undefined;
  DetectImage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen
              name={'Home'}
              options={{
                headerShown: false,
              }}
              component={HomePage}
            />
            <Stack.Screen name={'Direction'} component={ViroARNavigationPage} />
            <Stack.Screen
              name={'DetectObject'}
              component={ViroARDetectionObjectPage}
            />
            <Stack.Screen name={'Model3D'} component={ViroAR3DObjectPage} />
            <Stack.Screen
              name={'DetectImage'}
              component={ViroARDetectionImagesPage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
export default App;
