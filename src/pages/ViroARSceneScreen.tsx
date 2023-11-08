import {ViroARSceneNavigator} from '@viro-community/react-viro';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import DetectObject from './DetectObject';
import Ui3DObject from './3DUiObject';
import NavigationPage from './NavigationPage';
import CompassObject from '../components/CompassObject';
import GetCurrentLocationExample from '../services/GetCurrentLocation';
import WatchPositionExample from '../services/WatchPosition';

function ViroARSceneScreen(): JSX.Element {
  function _onResetScene() {
    console.log('onReset');
    //navigation.navigate('YourScreen', {id: 2});
    //props.navigation.push('WebView');
  }

  return (
    <View style={styles.outer}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: NavigationPage,
          //scene: () => DetectObject({sceneNavigator: []}),
          //scene: () => Ui3DObject({sceneNavigator: []}),
        }}
        style={styles.rootContainer}
      />

      <View style={styles.fab3DButton}>
        <CompassObject />
      </View>

      <View style={styles.location}>
        <GetCurrentLocationExample />
      </View>
      {/* <View style={styles.fab3DButton}>
        <TouchableHighlight
          style={styles.buttons}
          onPress={_onResetScene}
          underlayColor={'#00000000'}>
          <Image
            source={require('../../assets/images/mocks/btn_mode_objects.png')}
          />
        </TouchableHighlight>
      </View> */}
    </View>
  );
}

export default ViroARSceneScreen;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
  },
  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
  fab3DButton: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  location: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
