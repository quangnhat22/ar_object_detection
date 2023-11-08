import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';

export default function GetCurrentLocationExample() {
  const [position, setPosition] = useState<string | null>(null);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos);
        //setPosition(JSON.stringify(pos));
        const {latitude, longitude} = pos.coords; // Trích xuất latitude và longitude
        setPosition(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      error => console.log(error),
      {enableHighAccuracy: true},
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.angle}>{position}</Text>
      <Button title="Get Current Position" onPress={getCurrentPosition} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
  container: {
    flex: 1,
  },
  angle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  direction: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
});
