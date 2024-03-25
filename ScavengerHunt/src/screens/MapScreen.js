import MapView, {Circle, Marker, Polyline} from 'react-native-maps';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from "react-native";
import {useContext, useState} from "react";
import {Context as HuntContext} from "../context/HuntContext";

const deviceHeight =Dimensions.get("window").height
const deviceWidth =Dimensions.get("window").width
console.log(deviceWidth)

const MapScreen = (props) => {
    //robin changes to make work, error was hunt.locations undefinded
    const {state} = useContext(HuntContext);
    const huntID  = props.navigation.getParam("huntID");
    const hunts = state.hunts
    const hunt = hunts.find((current) => {
        return current.id === huntID;
    });
    //end of changes

    //const {state: huntState} = useContext(HuntContext)
    //const hunt = huntState[3]

    let [removeState, setRemoveState] = useState(false)
    let [markers, setMarkers] = useState(hunt.locations)


    const [stateRegion, setRegion] = useState({
        latitude: 30.02802333000551,
        longitude: -90.06781479343772,
        latitudeDelta: 0.007394771328048222,
        longitudeDelta: 0.008541159331798553,
    })

    const onRegionChange = (region) => {
        setRegion({ region });
    }

    const addPin = (e) => {
        let longPressLat = e.coordinate.latitude
        let longPressLon = e.coordinate.longitude
        console.log("adding pin at ", longPressLat, longPressLon)

        setMarkers([...markers, {
            description: 'Long pressed marker',
            title: 'test',
            latLng: {
                latitude: longPressLat,
                longitude: longPressLon
            }
        }])
    }

    const removePin = (idx) => {
        markers.splice(idx, 1)
        setMarkers(markers)
    }

    let removeBanner
    let mapBorderStle
    if (removeState){
        removeBanner = <Text>Removing Locations...</Text>
        mapBorderStle = styles.remove
    } else {
        removeBanner = <Text>Adding Locations...</Text>
        mapBorderStle = styles.add
    }

    return <View>
        <View style={ mapBorderStle }>
            {removeBanner}
            <MapView
                style={styles.map}
                region={stateRegion}
                onRegionChange={onRegionChange}
                onLongPress={(e) => {
                    if (!removeState) {
                        addPin(e.nativeEvent)
                    }
                }}
            >
                {/*add all markers to the map*/}
                { markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.latLng}
                        title={marker.title}
                        description={marker.description}
                        onPress={() => {
                            if (removeState){
                                removePin(index)
                            }
                        }}
                        draggable={true}
                    ></Marker>
                ))}
            </MapView>
        </View>
        <Text>Click pin to see details!</Text>
        <TouchableOpacity onPress={() => setRemoveState(!removeState)}>
            <Text>Remove Locations</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    scrollview: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    map: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        width: deviceWidth - 25,
        height: 500,
        borderWidth: 2,
        borderColor: "black"
    },
    remove: {
        borderColor: "red",
        borderWidth: 4
    },
    add: {
        borderColor: "green",
        borderWidth: 2,
    }
});

export default MapScreen
