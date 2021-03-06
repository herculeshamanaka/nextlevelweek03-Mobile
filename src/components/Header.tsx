import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showCancelButton?: boolean;
}

export default function Header({ title, showCancelButton = true }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBackToHome() {
    navigation.navigate('OrphanagesMap');
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#fff" />
      </BorderlessButton>
      
      <Text style={styles.title}>
        {title}
      </Text>

      { showCancelButton ? (
          <BorderlessButton onPress={handleGoBackToHome}>
            <Feather name="x" size={24} color="#ff009d" />
          </BorderlessButton>
        ) : (
          <View />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#15c3d6',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 44,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#fff',
    fontSize: 16,
  }
});