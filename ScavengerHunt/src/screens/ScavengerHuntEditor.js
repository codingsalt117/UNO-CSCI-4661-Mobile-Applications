import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Button} from 'react-native';
import LocationDetail from '../components/LocationDetail';
import LocationList from '../components/LocationList'; 


const ScavengerHuntEditor = (props) => {
        const [selectedLocation, setSelectedLocation] = React.useState(null);

        const handleLocationSelect = (location) => {
            setSelectedLocation(location);
        };

        const handleCreateNewLocation = () => {
            props.navigation.navigate('Cache');
        };

        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                <Text style={styles.title}>Select or Create Hunt Cache</Text>
                </View>
                <LocationList/>

                {selectedLocation && (
                    <View style={styles.selectedLocationContainer}>
                        <Text style={styles.selectedLocationText}>Selected Hunt:</Text>
                        <LocationDetail location={selectedLocation}/>
                    </View>
                )}
                <View>
                <TouchableOpacity style={styles.createButton}onPress={handleCreateNewLocation}>
                <Text style={styles.headerText}>Create New Location</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
};

const styles=StyleSheet.create({
    container:{
        flex: 1,
        padding:16,
    },
    titleContainer:{
        flex: .1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize:24,
        fontWeight: 'bold',
        marginBottom:16,
    },
    headerText:{
        fontSize:24,
        textAlign: 'center',
    },
    createButton:{
        borderWidth: 2,
        borderRadius: 100,
        padding: '2%',
    },
    selectedLocationContainer:{
        marginTop:16,
    },
    selectedLocationText:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:8,
    },
});
    

export default ScavengerHuntEditor;