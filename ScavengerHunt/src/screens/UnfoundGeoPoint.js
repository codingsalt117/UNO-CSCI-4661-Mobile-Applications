import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import {Context as HuntContext} from "../context/HuntContext";

const UnfoundGeoPoint = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  const {state} = useContext(HuntContext);
  const hunt_ID  = props.navigation.getParam("huntID");
  const location_ID = props.navigation.getParam("loc_ID");;
  //console.log("In UGP, Location_ID: " + location_ID);
  //console.log("In UGP, hunt_ID: " + hunt_ID);
  const current_Hunt = state.hunts.find((current) =>{
    return current.id === hunt_ID;
  });
  //console.log(current_Hunt.name);

  const location = current_Hunt.locations.find(loc => loc.id === location_ID);
  const hintText = location ? location.hint : "No hint available";
  const name = current_Hunt.name;
  const point_Name = current_Hunt.locations[location_ID].title;
  const description = location ? location.description : "No description available";
  const coordinates = location ? location.latLng : { latitude: 0, longitude: 0 };
  //console.log(hintText);


  const hint = "place holder";

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.topBoxText}>Unfound point: {point_Name} {'\n'}Hunt: {name}</Text>
      </View>
      <View style={styles.middleBox}>
        <Text style={styles.middleBoxText}>Description:{'\n'} {description}</Text>
        <Text style={styles.middleBoxText}>{'\n'}</Text>
        <Text style={styles.middleBoxText}>Coordinates:{'\n'} {coordinates.latitude}, {coordinates.longitude}</Text>
      </View>
      <TouchableOpacity style={styles.hintButton} onPress={toggleModalVisibility}>
        <Text style={styles.hintButtonText}>Need a Hint?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => {props.navigation.navigate('SpecificHunt')}}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModalVisibility}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{hintText}</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModalVisibility}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#355E3B",
  },
  topBox: {
    backgroundColor: '#C1E1C1',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  topBoxText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#355E3B',
  },
  middleBox: {
    backgroundColor: '#C1E1C1',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'flex-start',
  },
  middleBoxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#355E3B',
  },
  hintButton: {
    backgroundColor: '#C1E1C1',
    padding: 10,
    margin: 40,
    borderRadius: 5,
  },
  hintButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#355E3B',
  },
  backButton: {
    backgroundColor: '#C1E1C1',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#355E3B',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#C1E1C1',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#355E3B',
  },
  modalCloseButton: {
    backgroundColor: '#355E3B',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  modalCloseButtonText: {
    color: '#C1E1C1',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UnfoundGeoPoint;