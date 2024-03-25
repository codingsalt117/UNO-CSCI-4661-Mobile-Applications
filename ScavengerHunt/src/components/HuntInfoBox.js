import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Context as HuntContext} from "../context/HuntContext";

const HuntInfoBox = (props) => {
  const {state} = useContext(HuntContext);
  //console.log("In HIB, state object: " + state);
  const huntID  = props.hunt.id;
  console.log("In HIB, Hunt ID: " + huntID);

  let hunts = state.hunts
  const hunt = props.hunt;
/*   const hunt = hunts.find((current) =>{
      return current.huntID === huntID;
  }); */

  //console.log("huntin'")
  //console.log("statin'")
  //console.log(state)
  //console.log(hunt)

  if (hunt.locations.length > 0){
    //console.log("In HIB, CurrentHunt variable: "+ current_Hunt);
    const total_Caches = hunt.locations.length;
    const found_Caches = hunt.locations.filter(location => location.isFound === true);
    let total_Found = found_Caches.length;
    const labels = ['Total Caches: ' + total_Caches, 'Total Points: ', 'Found Caches: ' + total_Found, 'Your Points: '];

    return (
        <View style={styles.whiteBox}>
          {labels.map((label, index) => (
              <Text key={index} style={styles.label}>
                {label}
              </Text>
          ))}
        </View>
    );
  } else {
    // TODO: what do when no locations available? probably disable the hunts button?
    return <View>

    </View>
  }
};

const styles = StyleSheet.create({
  whiteBox: {
    backgroundColor: '#C1E1C1',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#355E3B',
  },
});

export default HuntInfoBox;
