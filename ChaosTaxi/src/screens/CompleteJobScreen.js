import React, {useContext, useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Button} from 'react-native';
import {Context as JobContext} from '../context/CityContext';
import {Context as DriverContext} from '../context/RosterContext';
import { FlatList } from "react-native-gesture-handler";


const CompleteJobScreen = ({navigation}) => {

    const [choice, setChoice] = useState(0);
    const {state: drivers, reduce_Health, reduce_Stamina, add_Money} = useContext(DriverContext);
    const {state: job} = useContext(JobContext);
    const [pickedDriverId, setPickedDriverId] = useState(null);
    const [gridNum, setGridNum] = useState(0);
    const [currentDriver, setCurrentDriver] = useState(null);
    const [resultsString, setResultsString] = useState(null);
    const [currentHealth, setCurrentHealth] = useState(null);
    const currentGrid = job.jobPath[gridNum];
    const reward = job.reward;
    const length = job.jobPath.length - 1;

    const setJobChoice = (driverId) => { 
        const selected = drivers.find((driver) => driver.id === driverId);   
        setPickedDriverId(driverId);
        setCurrentDriver(selected);
        reduce_Stamina(driverId);
        setChoice(1);
    };

    const interateBlock = async () => {
        if(!currentGrid.danger){
            add_Money(pickedDriverId, reward);
            setChoice(2);
            return;
        }
        await reduce_Health(pickedDriverId, currentGrid.danger);
        const updatedDriver = drivers.find((driver) => driver.id === pickedDriverId);
        setCurrentDriver(updatedDriver);
        const updated_health = updatedDriver.health - Math.floor(currentGrid.danger/ updatedDriver.skill);
        console.log("updatedHealth", updated_health);
        
        if (updated_health <= 0){
            setChoice(3); 
        }
        else {
            if (gridNum < length) {
                setGridNum(gridNum + 1);
            }
            else {
                add_Money(pickedDriverId, reward);
                setChoice(2);
            }
        }
    };
    
    useEffect(() => {
          const updatedDriver = drivers.find((driver) => driver.id === pickedDriverId);
          if (updatedDriver) {
            setResultsString("Driver health is now: " + updatedDriver.health);
            setCurrentDriver(updatedDriver);
          }
      }, [pickedDriverId, currentDriver, drivers]);

    if(choice === 0){
        return <ImageBackground source={require('../../assets/city.jpg')} style={styles.backgroundImage} resizeMode="stretch">
            <View>
            <Text style={styles.title}>Pick A Driver</Text>
            <FlatList
                data={drivers}
                keyExtractor={(driver) => {return driver.id}}
                renderItem={({ item }) => {
                    if (item.stanima === 0 || item.health <= 0){
                        return null;
                    }
                    return(
                        <TouchableOpacity style={styles.button} onPress={()=> setJobChoice(item.id)}>
                            <Text style={styles.buttonText}>Driver: {item.name}{'\n'}Driver ID: {item.id}</Text>
                        </TouchableOpacity>
                    );
                }}

            />
            </View>
        </ImageBackground>
    }
    else if(choice === 1){
        //console.log(pickedDriverId);
        const frontEnemyString = ["There are some smelly and nasty looking ", "There are some really mean and sassy ",
                                  "Wow, look at all those angry "];
        const backEnemyString = ["! They want to claim all your stuff by licking it....plus hurt you a bit!",
                                 "! This group is going to attack you because they just doesn't like your face.",
                                 "! Take a good look at them, what do you think is about to happen!"];
        return <ImageBackground source={require('../../assets/city.jpg')} style={styles.backgroundImage} resizeMode="stretch">
                    <View style={styles.container}>
                        <Text style={styles.title}>City Block {gridNum + 1} of {job.jobPath.length}</Text>
                        <View style={styles.gridInfoBox}>
                            <Text style={styles.gridInfoText}>
                                Danger Level: {currentGrid.danger}{'\n'}
                                Enemy: {'\n'}{frontEnemyString[Math.floor(Math.random()*3)]}{currentGrid.enemy}{backEnemyString[Math.floor(Math.random()*3)]}{'\n'}{'\n'}
                                {'\n'}{resultsString}{'\n'}
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.quitButton} onPress={() => navigation.navigate('Guildhall')}>
                                <Text style={styles.buttonText}>Quit(Guild Hall)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.nextButton} onPress={()=> interateBlock()}>
                                <Text style={styles.buttonText}>Next Block</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
               </ImageBackground>
    }
    else if (choice === 2){
        return<ImageBackground source={require('../../assets/city.jpg')} style={styles.backgroundImage} resizeMode="stretch">
            <View style={styles.container}>
                <View style={styles.gridInfoBox}>
                    <Text style={styles.gridInfoText}>{'\n'}{resultsString}{'\n'}</Text>
                    <Text style={styles.gridInfoText}>You Won, your driver complete the fare, and you have been paid ${reward}!</Text>
                    <TouchableOpacity style={styles.quitButton} onPress={() => navigation.navigate('Guildhall')}>
                        <Text style={styles.buttonText}>Quit(Guild Hall)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    }
    else{
        return<ImageBackground source={require('../../assets/city.jpg')} style={styles.backgroundImage} resizeMode="stretch">
            <View style={styles.container}>
                <View style={styles.gridInfoBox}>
                    <Text style={styles.gridInfoText}>{'\n'}{resultsString}{'\n'}</Text>
                    <Text style={styles.gridInfoText}>You lost, your driver couldn't complete the fare!</Text>
                    <TouchableOpacity style={styles.quitButton} onPress={() => navigation.navigate('Guildhall')}>
                        <Text style={styles.buttonText}>Quit(Guild Hall)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    }
}
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
  gridInfoBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20
    },
    gridInfoText: {
        color: 'white',
        fontSize: 18,
    },
    buttonContainer: {
        
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quitButton: {
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 4,
        width: 150,
    },
    nextButton: {
        backgroundColor: '#00FF00',
        padding: 10,
        borderRadius: 4,
        width: 150,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
      backgroundColor: 'rgba(0, 0, 255, 0.5)',
      padding: 10,
      borderRadius: 4,
      marginTop: 10,
  },
});
  
  export default CompleteJobScreen;