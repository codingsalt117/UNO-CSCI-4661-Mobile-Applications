import MapView, {Circle, Marker, Polyline} from 'react-native-maps';
import {StyleSheet, View, Text, ScrollView, Button} from "react-native";
import {useEffect, useState} from "react";
import ScoreBox from "../components/ScoreBox";
import Modal from "react-native-modal";
import * as Location from 'expo-location';

const WinScreen = () => {


    const [isModalVisible, setModalVisible] = useState(false);
    const [initViewLoaded, setInitViewLoaded] = useState(false)

    let minLat = 200, minLon = 200, maxLat = -200, maxLon = -200;
    let lonBuffer = 0.01, latBuffer = 0.01
    const [stateRegion, setRegion] = useState({})
    const [userPath, setUserPath] = useState([])

    const [renderPath, setRenderPath] = useState(false)

    let [renderUserCircles, setRenderUserCircles] = useState(false)
    let [userCircles, setUserCircles] = useState([])

    const cacheBounds = () => [
        {
            latitude: 30.029705841023993,
            longitude: -90.06640258820413,
        },
        {
            latitude: 30.02750663195721,
            longitude: -90.06695221157736
        },
        {
            latitude: 30.029111646588,
            longitude: -90.06456292751855
        }
    ]

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    let [markers, setMarkers] = useState([
        {
            key: "1",
            description: 'I picked this one because it had a cool name',
            title: 'Milneburg Hall',
            latLng: {
                latitude: 30.029705841023993,
                longitude: -90.06640258820413,
            }
        },
        {
            key: "2",
            description: 'This is where the books live, gitchu one!',
            title: 'Earl K. Long Library',
            latLng: {
                latitude: 30.02750663195721,
                longitude: -90.06695221157736
            }
        },
        {
            key: "3",
            description: 'Capitalist version of library',
            title: 'UNO Bookstore',
            latLng: {
                latitude: 30.029111646588,
                longitude: -90.06456292751855
            }
        }
    ])




    const calcBoundingBox = () => {
        cacheBounds().forEach((point) => {
            if (minLat > point.latitude) minLat = point.latitude;
            if (minLon > point.longitude) minLon = point.longitude;
            if (maxLat < point.latitude) maxLat = point.latitude;
            if (maxLon < point.longitude) maxLon = point.longitude;
        })

        console.log("Hunt Bounds: ", minLat, minLon, maxLat, maxLon)
        return { minLat, minLon, maxLat, maxLon }
    }


    const calcBuffer = () => {
        latBuffer = (maxLat - minLat) * 3
        lonBuffer = (maxLon - minLon) * 3

        console.log(latBuffer)
        console.log(lonBuffer)
    }

    if (!initViewLoaded){
        calcBoundingBox()
        calcBuffer()
        setRegion({
            latitude: maxLat,
            longitude: minLon,
            latitudeDelta: latBuffer,
            longitudeDelta: lonBuffer,
        })

        setInitViewLoaded(true)
    }

    const onRegionChange = (region) => {
        console.log("on region change")
        setRegion({ region });
    }

    const caches = []

    for (let i = 0; i < 40; i++){
        caches.push({
            name: 'cache' + i,
            key: i
        })
    }

    let resetView = () => {
        setInitViewLoaded(false)
    }

    let zoomToCurrentLocation = async () =>
    {
        // let test = await Location.requestBackgroundPermissionsAsync();
        let location = await Location.getCurrentPositionAsync({});
        let userLat = location.coords.latitude
        let userLon = location.coords.longitude

        console.log("User location:", location)

        setMarkers([...markers,         {
            key: markers.length + 1,
            description: 'curr user location',
            title: 'User Location',
            latLng: {
                latitude: userLat,
                longitude: userLon,
            }
        }])
    }



    let showUserLocationAndCacheArea = async () => {
        setRenderPath(true)
    }

    let interpolate = (a, b, frac) =>  // points A and B, frac between 0 and 1
    {
        var nx = a.longitude+(b.longitude-a.longitude)*frac;
        var ny = a.latitude+(b.latitude-a.latitude)*frac;
        return { longitude:nx,  latitude:ny };
    }

    useEffect(() => {
        console.log(renderPath)

        if (renderPath){
            async function renderUserPath() {
                let points = cacheBounds()

                let interpolatedPoints = []
                for (let i = 0; i < points.length - 1; i++){

                    if (userPath.length === points.length - 1){
                        setRenderPath(false)
                        break;
                    }

                    let p1 = points[i]
                    let p2 = points[i + 1]
                    for (let j = 0.1; j < 1; j += 0.1) {

                        let interPoint = interpolate(p1, p2, j)
                        let interMapPoint =  {
                            key: Math.random() * 1000000,
                            center: {
                                latitude: interPoint.latitude,
                                longitude: interPoint.longitude
                            },
                            radius: 10,
                            fillColor: 'rgba(255, 0, 0, 0.5)',
                            strokeColor: 'rgba(0,0,0,0.5)',
                            zIndex: 2,
                            strokeWidth: 2
                        }

                        interpolatedPoints = [...interpolatedPoints, interMapPoint]
                        setUserCircles(interpolatedPoints)
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                }
            }

            renderUserPath()
        }

    }, [userPath, renderPath]);

    let userPathView

    if (userPath != null && userPath.length > 0){
        console.log("Updating with ", userPath.length)
        userPathView = userPath.map((polyline) => (
            <Polyline
                key={polyline.key}
                coordinates={polyline.coordinates}
                strokeColor={polyline.strokeColor}
                strokeColors={polyline.strokeColors}
                strokeWidth={polyline.strokeWidth}
            />
        ))
    } else {
        userPathView = <View></View>
    }

    let userCircleView
    if (userCircles.length > 0){
        userCircleView = userCircles.map((cir) => (
            <Circle
                key={cir.key}
                center={cir.center}
                radius={cir.radius}
                fillColor={cir.fillColor}
                strokeColor={cir.strokeColor}
                zIndex={cir.zIndex}
                strokeWidth={cir.strokeWidth}
            />
        ))
    } else {
        userCircleView = <View></View>
    }

    return <View>
        <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
                <MapView
                    style={styles.map}
                    region={stateRegion}
                    onRegionChange={onRegionChange}
                >
                    {/*add all markers to the map*/}
                    { markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.latLng}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}

                    {userPathView}
                    {userCircleView}
                </MapView>
                <View>
                    <View>
                        <Text>Caches</Text>
                    </View>
                    <ScrollView style={styles.caches}>
                        {caches.map((cache, i) => (

                          <Text key={i}>{cache.name}</Text>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <ScoreBox></ScoreBox>

            <Button title="Show modal" onPress={toggleModal} />

            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1 }}>
                    <Button title="Hide modal" onPress={toggleModal} />
                    <Text>Hello from modal!</Text>
                </View>
            </Modal>
        </View>

        <Button title={"Reset View"} onPress={resetView}></Button>
        <Button title={"Zoom to Location"} onPress={zoomToCurrentLocation}></Button>
        <Button title={"Show User Path"} onPress={showUserLocationAndCacheArea}></Button>
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
        width: 300,
        height: 300,
    },
    caches: {
        height: 300,
    },
    scorebox: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    scores: {
        alignItems: 'center',
        flexDirection: 'column',
        flex: 3
    }
});

export default WinScreen
