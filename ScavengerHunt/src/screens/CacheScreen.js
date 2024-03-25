import {
    Text,
    ScrollView,
    TouchableOpacity,
    View,
    TextInput,
    StyleSheet,
    Dimensions
} from 'react-native';
import MapView, {Marker} from "react-native-maps";
import {useContext, useState} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import {Context as HuntContext} from "../context/HuntContext";

const deviceWidth =Dimensions.get("window").width
let CacheScreen = ({navigation}) => {

    const {state: huntState, addLocation: addLocation} = useContext(HuntContext);
    let unoHunt = huntState.hunts[3]
    //console.log(unoHunt.locations)

    let [locationName, setLocationName] = useState(null)
    let [difficulty, setDifficulty] = useState(null)
    let [location, setLocation] = useState(null)
    let [hint, setHint] = useState(null)
    let [cacheMarker, setCacheMarker] = useState(null)
    let [open, setOpen] = useState(false);
    let [difficultyLevels, setDifficultyLevels] = useState([
        {label: 'Easy', value: '1'},
        {label: 'Medium', value: '2'},
        {label: 'Hard', value: '3'}
    ])

    const [stateRegion, setRegion] = useState({
        latitude: 30.02802333000551,
        longitude: -90.06781479343772,
        latitudeDelta: 0.007394771328048222,
        longitudeDelta: 0.008541159331798553,
    })

    const addPin = (e) => {
        let [longPressLat, longPressLon] = updateMarkerLocation(e)

        setCacheMarker( {
            description: hint,
            title: locationName,
            latLng: {
                latitude: longPressLat,
                longitude: longPressLon
            }
        })
    }

    const updatePin = (e) => {
        console.log(e)
        updateMarkerLocation(e)
    }

    let updateMarkerLocation = (e) => {
        let longPressLat = e.coordinate.latitude
        let longPressLon = e.coordinate.longitude
        console.log("adding pin at ", longPressLat, longPressLon)

        let userLocation = longPressLat + "," + longPressLon
        setLocation(userLocation)
        return [longPressLat, longPressLon]
    }

    const onRegionChange = (region) => {
        setRegion({ region });
    }

    let saveCache = () => {
        console.log("Saving cache to hunt...")
        var str = JSON.stringify(huntState, null, 2);
        console.log(str)
        console.log(unoHunt)
        console.log(unoHunt.locations.length)

        let newLocation ={
            id: unoHunt.locations.length + 1,
            description: hint,
            title: locationName,
            latLng:{
                latitude: cacheMarker.latLng.latitude,
                longitude: cacheMarker.latLng.longitude,
            },

            difficulty: difficulty,
        };

        console.log("hunt id:")
        console.log(unoHunt.id)
        console.log(newLocation)
        addLocation(unoHunt.id, newLocation)

        console.log(unoHunt)

        // TODO: once the location list has been updated, take us back to the hunt screen

        // TODO: will almost certainly have to do something with the context, but let's worry about that later
    }

    let mapMarker = null
    if (cacheMarker != null){
        mapMarker =  <Marker
            key={0}
            coordinate={cacheMarker.latLng}
            title={cacheMarker.title}
            description={cacheMarker.description}
            onDragEnd={(e) => updatePin(e.nativeEvent) }
            draggable={true}
        ></Marker>
    }

    // todo: make a number dropdown for difficulty
    // todo: hook up touchable opacity logic for back and save, make sure save is disabled until all things filled out
    // todo: style
    // todo: save a region of hunt when first location is saved

    // todo: handle placeholder case (when editing an existing cache)

    return <View>
        <ScrollView style={styles.scroller} nestedScrollEnabled={true}>

            <Text style={styles.header}>Location Name:</Text>
            <TextInput
                style={styles.inputBox}
                onChangeText={setLocationName}
                placeholder="Enter Location Name"
                value={locationName}
            />

            <Text style={styles.header}>Long press to add location:</Text>
            <MapView
                style={styles.map}
                region={stateRegion}
                onRegionChange={onRegionChange}
                onLongPress={(e) => {addPin(e.nativeEvent)}}>

                {mapMarker}

            </MapView>

            <Text style={styles.header}>Difficulty:</Text>
            <DropDownPicker
                style={styles.dropdown}
                placeholder={"Choose Difficulty"}
                open={open}
                value={difficulty}
                items={difficultyLevels}
                setOpen={setOpen}
                setValue={setDifficulty}
                setItems={setDifficultyLevels}
                listMode={"SCROLLVIEW"}
            />

            <Text style={styles.header}>Hint:</Text>
            <TextInput
                style={styles.inputBox}
                onChangeText={setHint}
                placeholder="Enter Hint"
                value={hint}
            />

            <View style={styles.saveBackView}>
                <TouchableOpacity style={styles.saveButtonTO}
                                  onPress={saveCache}
                                  disabled={ hint === null || location === null || difficulty === null || locationName === null }
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButtonTO}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    </View>


    // <SafeAreaView style={styles.container}>
    //
    //         <View style={styles.text}>


    //         </View>
    //
    //     </SafeAreaView>

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    header: {
        fontSize: 20
    },
    inputBox: {
        height: 40,
        margin: 12,
        borderRadius:100,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "white"
    },
    scroller: {

    },
    text: {

    },
    locationView: {
        flexDirection: 'row'
    },
    saveBackView: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    saveButtonTO: {
        flex: 1,
        borderRadius: 100,
        alignItems: 'center',
        padding: 10
    },
    backButtonTO: {
        flex: 1,
        borderRadius: 100,
        alignItems: 'center',
        padding: 10,
    },
    backButtonText: {
        fontSize: 20
    },
    saveButtonText: {
        fontSize: 20
    },
    map: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        width: deviceWidth - 25,
        height: 350,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 25,
    },
    dropdown: {
        margin: 10,
        padding: 10
    }
})

export default CacheScreen

