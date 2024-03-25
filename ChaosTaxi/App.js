import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider as RosterProvider } from "./src/context/RosterContext";
import { Provider as CityProvider} from "./src/context/CityContext"
import StartScreen from "./src/screens/StartScreen";
import GuildScreen from "./src/screens/GuildScreen";
import LoreScreen from "./src/screens/LoreScreen";
import RosterScreen from "./src/screens/RosterScreen";
import DriverActionScreen from "./src/screens/DriverActionScreen";
import JobScreen from "./src/screens/JobScreen";
import CompleteJobScreen from "./src/screens/CompleteJobScreen";

const navigator = createStackNavigator({
  Start: StartScreen,
  Guildhall: GuildScreen,
  Lore: LoreScreen,
  Drivers: RosterScreen,
  DriverAction: DriverActionScreen,
  Jobs: JobScreen,
  Adventure: CompleteJobScreen,
},
  {
    initialRouteName: "Start",
    defaultNavigationOptions:
    {
      title: "Chaosburg Taxi Guild"
    }
  });

const App = createAppContainer(navigator);

export default () => {
  return <RosterProvider>
            <CityProvider>
              <App />
            </CityProvider>  
         </RosterProvider>
}
