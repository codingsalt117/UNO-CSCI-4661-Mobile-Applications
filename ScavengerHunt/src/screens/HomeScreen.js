import React from "react";

// curlies to do partial imports
import {Text, StyleSheet, View, Button} from "react-native";

// components have four parts
// 1.) imports
// 2.) definition of the component
// 3.) style
// 4.) export statement

const HomeScreen = ({navigation}) => {
  return <View>
    <Button
        title={"Create Hunt!!"}
        onPress={function (){navigation.navigate("CreateHunt")}}
    />
    <Button
        title={"Show Map"}
        onPress={() => { navigation.navigate("ShowMap") }}
    />
    <Button
        title={"Show Win Screen"}
        onPress={() => { navigation.navigate("ShowWinScreen") }}
    />
    <Button
        title={"Joined List"}
        onPress={() => { navigation.navigate("JoinedList") }}
    />
    <Button
        title={"Created List"}
        onPress={() => { navigation.navigate("CreatedList") }}
    />
    <Button
        title={"*Real* Home Screen"}
        onPress={() => { navigation.navigate("MainMenu") }}
    />
    <Button
        title={"Cache Screen"}
        onPress={() => { navigation.navigate("Cache") }}
    />
    <Button
        title={"Scaveger Editor"}
        onPress={() => { navigation.navigate("Scav") }}
    />
  </View>;

};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
