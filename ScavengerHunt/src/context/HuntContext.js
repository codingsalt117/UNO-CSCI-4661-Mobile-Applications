import createDataContext from "./createDataContext";
import {getTestHunts} from "./SampleHunts";

//simulate fake hunts and locations
const sampleHunts = getTestHunts()
//console.log(sampleHunts)
const initialState = () => {
    //fake hunt - not accurate to final version of create hunt form
    let hunts = getTestHunts()

    return {
        editing: false,
        hunts
    }
};

//hunt reducer
const huntReducer = (state, action) => {
    switch(action.type){
        case "add_hunt":
            return [...state, {...action.payload}];
        case "remove_hunt":
            return state.filter((hunt) => {
                return hunt.huntID !== action.payload;
            });
        case "update_hunt":
            //iterate through hunt objects
            return state.hunts.map((hunt) =>
                //if true
                hunt.huntID === action.payload.huntID
                /*  Overwrite all hunt data received from form resubmission
                    This saves us from having to create a reducer function for every single variable.

                    Whenever a user wants to edit any information pertaining specifically to the hunt, like the name or description
                    -> call the hunt creation form again, prefill with already stored values from context
                    -> instead of addHunt, updateHunt
                */
                ? {...hunt, ...action.payload.data, locations: hunt.locations, locationsCount: hunt.locationsCount}
                : hunt
            );
        case "add_location":

            console.log("hunt reducer, add location:")
            console.log(action.payload)

            state.hunts.map((hunt) => {
                if (hunt.id === action.payload.id) {
                    hunt.locations.push(action.payload.location)
                }
            })

            return {...state}

        case "remove_location":
            //iterate through hunt objects
            return state.hunts.map((hunt) =>
                //if true
                hunt.huntID === action.payload.huntID
                //Return a copy of original hunt object, but with targeted location removed from locations array
                ? {...hunt, locations: hunt.locations.filter(
                    (location) => location.locationID !== action.payload.locationID
                    ),
                    locationsCount: hunt.locationsCount - 1
                }
                : hunt
            );
        case "update_location":
            //iterate through hunt objects
            return state.hunts.map((hunt) =>
                //if true
                hunt.huntID === action.payload.huntID
                /*  Return a copy of the original hunt object, but with an updated location array
                    Same thing goes for here as with update_hunt.

                    Whenever a user wants to edit any information pertaining specifically to the location, like the coordinates, difficulty, etc
                    -> call the location creation form again, prefill with already stored values from context
                    -> instead of addLocation, updateLocation
                */
                ? {...hunt, locations: hunt.locations.map(
                    (location) => location.locationID === action.payload.locationID
                    ? {...location, ...action.payload.data}
                    : location
                    ),
                }
                : hunt
            );
        case "toggle_edit":
            return { ...state, editing: !state.editing }
        default:
            return state;
    }
}

/* HUNT UPDATE FUNCTIONS */

//add hunt function
const addHunt = (dispatch) => {
    /* Hunt Creation Screen passes hunt input info to context, like a filled out form

        -In Hunt Creation Screen
        const { addHunt } = useContext(HuntContext);
        const [huntName, setHuntName] = useState(""); -Can also be used with text input
        ....state variable for each
        ....
        const newHunt = {
            huntName,
            huntDescription,
            ....
            ....
        };
        -After all variables set (avoiding null info)
        addHunt(newHunt);
    */
    return (hunt) => {
        dispatch({type: "add_hunt", payload: hunt});
    };
};

//remove hunt function
const removeHunt = (dispatch) => {
    return (huntID) => {
        dispatch({type: "remove_hunt", payload: huntID});
    }
}

//update hunt function
const updateHunt = (dispatch) => {
    return (huntID, data) => {
        dispatch({type: "update_hunt", payload: {huntID, data}});
    }
}


/* HUNT LOCATIONS */

const addLocation = (dispatch) => {

    console.log("in add location")
    return (huntID, location) => {
        console.log("Adding " + location.title + " to hunt " + huntID)
        dispatch({type: "add_location", payload: {id: huntID, location}});
    };
};

const removeLocation = (dispatch) => {
    return (huntID, locationID) => {
        dispatch({type: "remove_location", payload: {huntID, locationID}});
    };
};

const updateLocation = (dispatch) => {
    return (huntID, locationID, data) => {
        dispatch({type: "update_location", payload: {huntID, locationID, data}});
    };
};

const toggleEdit = (dispatch) => {
    return () => {
        console.log("toggling edit!")
        dispatch({type: "toggle_edit"});
    };
};

export const {Context, Provider} = createDataContext(
    huntReducer,
    {
        addHunt, removeHunt, updateHunt,
        addLocation, removeLocation, updateLocation, toggleEdit
    },
    initialState()
);
