import React, {useContext} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Button} from 'react-native';
import {Context as CityContext} from '../context/CityContext';

const JobScreen = (props) => {
    const { state, generateEasyJob, generateMediumJob, generateHardJob } = useContext(CityContext);
  
    return (
      <ImageBackground source={require('../../assets/city.jpg')} style={styles.backgroundImage} resizeMode="stretch">
      <View style={styles.container}>
        <Text style={styles.title}>Guild Job Board</Text>
        <Text style={styles.subheading}>Select Difficulty</Text>
        <TouchableOpacity style={styles.button} onPress={()=> {generateEasyJob(); props.navigation.navigate('Adventure')}}>
            <Text style={styles.buttonText}>Easy Job</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> {generateMediumJob(); props.navigation.navigate('Adventure')}}>
            <Text style={styles.buttonText}>Medium Job</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> {generateHardJob(); props.navigation.navigate('Adventure')}}>
            <Text style={styles.buttonText}>Hard Job</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={()=> {props.navigation.navigate('Guildhall')}}>
            <Text style={styles.buttonText2}>Guild Hall</Text>
        </TouchableOpacity>
        
      </View>
      </ImageBackground>
    );
  };
  
  const getColorForDangerLevel = (dangerLevel) => {
    switch (dangerLevel) {
      case 1:
        return "green";
      case 2:
        return "yellow";
      case 3:
        return "red";
      default:
        return "white";
    }
  };
  
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%'
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'green',
      marginTop: 20
  },
  subheading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'yellow',
    marginTop: 20
  },
  button: {
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
      padding: 10,
      borderRadius: 4,
      marginTop: 10,
  },
  button2: {
    backgroundColor: 'rgba(255, 255, 0, 0.5)',
    padding: 10,
    borderRadius: 4,
    marginTop: 100,
  },
  buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
  },
  buttonText2: {
    color: 'red',
    fontSize: 18,
  },
  });
  
  export default JobScreen;