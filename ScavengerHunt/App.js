import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import MapScreen from "./src/screens/MapScreen";
import WinScreen from "./src/screens/WinScreen";
import SpecificHuntScreen from "./src/screens/SpecificHuntScreen";
import UnfoundGeoPointScreen from "./src/screens/UnfoundGeoPoint";
import { Provider as HuntProvider} from "./src/context/HuntContext";
import MainMenuScreen from "./src/screens/MainMenuScreen"
import JoinedHuntListScreen from "./src/screens/JoinedHuntListScreen";
import CreatedHuntListScreen from "./src/screens/CreatedHuntListScreen";
import {Button} from "react-native";
import CacheScreen from "./src/screens/CacheScreen";
// TODO: ScavengerHuntEditor screen, do we need it?

const navigator = createStackNavigator(
    {
        MainMenu: MainMenuScreen,
        JoinedList: JoinedHuntListScreen,
        CreatedList: CreatedHuntListScreen,
        Home: MainMenuScreen,
        OldHome: HomeScreen,
        ShowMap: MapScreen,
        ShowWinScreen: WinScreen,
        SpecificHunt: SpecificHuntScreen,
        UnfoundGeoPoint: UnfoundGeoPointScreen,
        Cache: CacheScreen,
        ShowCreatedHunt: SpecificHuntScreen
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            //title: "File Not Found",
            title: null, //hides header title
            // headerLeft: () => null, //hides built in back navigation (arrow in upper left)
            // headerStyle: {
            //     height: '5%', //adjusts how much space header takes up on screen
            // },
        },
        //headerMode: 'none,' //disables header completely
    }
);

const App = createAppContainer(navigator);

export default () => {
    return <HuntProvider>
        <App />
    </HuntProvider>
}
