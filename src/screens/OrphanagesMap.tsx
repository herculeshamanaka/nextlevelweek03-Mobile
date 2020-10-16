import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout }  from 'react-native-maps';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png';


export default function OrphanagesMap() {
  const navigation = useNavigation();

  function handleNavigateToOrphanageDetails() {
    navigation.navigate('OrphanageDetails');
  }

  return (
  <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map} 
      initialRegion={{ 
        latitude: -23.4934369,
        longitude: -47.4000453,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008
      }}
    >
      <Marker 
        icon={mapMarker}
        coordinate={{
          latitude:-23.4934369, 
          longitude:-47.4000453
        }}
        calloutAnchor={{
          x: 2.7,
          y: 0.8,
        }}
      >
        <Callout 
          tooltip
          onPress={handleNavigateToOrphanageDetails}
        >
          <View style={styles.calloutContainer}>
            <Text style={styles.calloutText}>Teste</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>

    <View style={styles.footer}>
      <Text style={styles.footerText}>2 Orphanages found</Text>
      <TouchableOpacity style={styles.createOrphanageButton}>
        <Feather name="plus" size={20} color='#fff' />
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',

  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 14,
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 10,
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 5}
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },
  
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
