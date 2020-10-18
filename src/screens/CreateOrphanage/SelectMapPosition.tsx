import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent, PROVIDER_GOOGLE } from 'react-native-maps';

import { Feather } from '@expo/vector-icons';

import mapMarkerImg from '../../images/map-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [mapPosition, setMapPosition] = useState({ latitude: 0, longitude: 0});

  function handleNextStep() {
    navigation.navigate('OrphanageData', { mapPosition });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setMapPosition(event.nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        { mapPosition.latitude !== 0 && (
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ latitude: mapPosition.latitude, longitude: mapPosition.longitude }}
            />
          )
        }
      </MapView>

      { mapPosition.latitude !== 0 && (
          <RectButton style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Feather name="arrow-right-circle" size={24} color="#FFF" />
          </RectButton>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,

    flexDirection: 'row',
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    paddingRight: 10,
  }
})
