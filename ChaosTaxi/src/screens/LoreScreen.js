import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const LoreScreen = ({navigation}) => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ['The world has ended, you know the social econmical coloplse, nuclear war, or something...', 
                 'ChaosBurg is one of the last cities that still contains a semblence of society.',
                 'But there are sections of the cities that are controlled by dangerous mauraders, mutants, and gangs!',
                 'So the only way to safe way to traverse Chaosburg is by requesting rides from the Taxi Guids!'];

  const handlePreviousText = () => {
    if (textIndex === 0) {
      setTextIndex(texts.length - 1);
    } else {
      setTextIndex(textIndex - 1);
    }
  };

  const handleNextText = () => {
    if (textIndex === texts.length - 1) {
      setTextIndex(0);
    } else {
      setTextIndex(textIndex + 1);
    }
  };

  return (
    <ImageBackground source={require('../../assets/lore.jpg')} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePreviousText}>
                <Text style={styles.buttonText}>Previous Text</Text>
            </TouchableOpacity>

            <Text style={{fontFamily:'sans-serif-light', fontSize: 24, color: 'red'}}>{texts[textIndex]}</Text>

            <TouchableOpacity style={styles.button} onPress={handleNextText}>
                <Text style={styles.buttonText}>Next Text</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={ () => {navigation.navigate('Guildhall')} }>
                <Text style={styles.buttonText}>Go back to Guildhall</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'green',
  },
  button: {
    backgroundColor: '#0000FF',
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
}
});

export default LoreScreen;