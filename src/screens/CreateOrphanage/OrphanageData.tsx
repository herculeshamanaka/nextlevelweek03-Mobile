import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';

interface OrphanageRouteParams {
  mapPosition: {
    latitude: number;
    longitude: number;
  }
}


export default function OrphanageData() {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as OrphanageRouteParams;
  
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
    })();
  }, []);

  async function handleCreateOrphanage() {
    const { latitude, longitude } = routeParams.mapPosition;
    
    const orphanageData = new FormData();
    orphanageData.append('name', name);
    orphanageData.append('about', about);
    orphanageData.append('latitude', String(latitude));
    orphanageData.append('longitude', String(longitude));
    orphanageData.append('instructions', instructions);
    orphanageData.append('opening_hours', opening_hours);
    orphanageData.append('open_on_weekends', String(open_on_weekends));
    orphanageData.append('name', name);

    images.forEach((image, index) => {
      orphanageData.append('orphanage_images', {
        type: 'image/jpg',
        uri: image,
        name: `image_${index}.jpg`,
      } as any);
    });

    await api.post('orphanages', orphanageData);

    alert('Orphanage created! ✅')
    navigation.navigate('OrphanagesMap');
  }


  async function handleSelectImages() {
    // const { status: permissionStatus } = await ImagePicker.requestCameraRollPermissionsAsync();

    // if (permissionStatus !== 'granted') {
    //   alert('Ops, we need acces to your camera roll. 😟');
    //   const { status: newPermissionStatus } = await ImagePicker.requestCameraRollPermissionsAsync();

    //   if (newPermissionStatus !== 'granted') {
    //     return;
    //   }      
    // }    

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaType: ImagePicker.MediaTypeOptions.Images,      
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;
    setImages([...images, image]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Main Data</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />

      <Text style={styles.label}>About</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        value={about}
        onChangeText={setAbout}
        multiline
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Photos</Text>
      <View style={styles.uploadedImagesContainer}>
        {images.map(image => {
          return (
            <Image 
              key={image}
              source={{uri: image}}
              style={styles.uploadedImage}
            />
          );
        })}
      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visiting</Text>

      <Text style={styles.label}>Instructions</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Open on weekends?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Save data</Text>
        <Feather name="check-circle" size={24} color="#FFF" />
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row',
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,

    flexDirection: 'row',
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
    paddingRight: 10,
  }
})