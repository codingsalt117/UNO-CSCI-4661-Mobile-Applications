import React, {useContext} from 'react';
import { StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import { withNavigation } from 'react-navigation';

import HuntDetail from './HuntDetail';
import { Context as HuntContext} from '../context/HuntContext';

const HuntList = (props) => {

    const {state: huntState} = useContext(HuntContext);

    console.log("hunt listin'")

    let hunts = huntState.hunts

    console.log(hunts)

    if (hunts.length === 0) {
        console.log("No hunts to show!")
        return null;
    }

    const filterState = () => {
        if(props.listType === 'UserCreatedList'){
            return huntState.filter((item) => item.createdByUser === true);
        }
        return huntState;
    }

    const screenNavigation = () => {
        if(props.nav === "editHuntScreen"){
            //props.navigation.navigate("EditHunt", {});
        } else {
            props.navigation.navigate("SpecificHunt", {});
        }
    }

    // TODO: from kurt's proto branch
    // renderItem = {({item}) => {
    //     return <TouchableOpacity onPress={() => {screenNavigation(item.id)}}>
    //         <HuntDetail hunt={item} format={props.listType}/>
    //     </TouchableOpacity>
    // }}

    return <View style={styles.container}>
        <FlatList
            data = {hunts}
            keyExtractor={(hunt) => {return hunt.id}}
            renderItem = {({item}) => {
                console.log("item:")
                console.log(item)
                return <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate("ShowCreatedHunt", { id: item.id })
                    }}>
                    <HuntDetail hunt={item}/>
                </TouchableOpacity>}}
            showsVerticalScrollIndicator={true}

        />
    </View>
}

const styles = StyleSheet.create({
    container: {

    }
});

export default withNavigation(HuntList);
