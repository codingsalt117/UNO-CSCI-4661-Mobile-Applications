import React, { useReducer, useState } from "react";
import createDataContext from "./createDataContext";

let driverIdIndex = 0;

const generateDriver = () => {
    let driver = {};
    
    
    let firstNameList = ["Blade", "Crash", "Diesel", "Nitro", "Rusty", "Spike", "Tank", "Amber", "Ember", 
                         "Dagger", "Glitch", "Ivy", "Jinx", "Midnight", "Nova", "Raven", "Whisper", "Valkrie"];

    let lastNameList = ["Rider", "Shadow", "Storm", "Fury", "Storm", "Gear", "Blaze", "Fog", "Mist", "Phoenix", 
                        "Sparkles", "Midnight", "Wild", "Bolt", "Dud", "Sweettooth", "Sausages", "Ace"];

    driver.id = driverIdIndex++;

    driver.name = firstNameList[Math.floor(Math.random() * 18)] + " " + 
        lastNameList[Math.floor(Math.random() * 18)]
    
    driver.money = 25;
    driver.maxStanima = Math.floor(Math.random() * 5) + 1;
    driver.stanima = driver.maxStanima;
    driver.maxHP = Math.floor(Math.random() * 9) + 3;
    driver.skill = Math.floor(Math.random() * 2) + 1;
    driver.health = driver.maxHP;

    return driver;
}

const generateRoster = () => {
    const driversList = [];

    for(let i=0; i < 5; i++){
        const temp = generateDriver();
        //console.log(temp);
        driversList.push(temp);
    }
    //console.log(driversList);
    return driversList;
}

const rosterReducer = (state, action) => {
    switch(action.type){
        case 'restore_Stanima':
            return state.map(driver => {
                if(driver.id === action.payload){
                    if(driver.money >= 25){
                       return {...driver, stanima: driver.maxStanima, money: driver.money-25}; 
                    }
                    else{
                        return driver;
                    }
                    
                }
                else{
                    return driver;
                }
            });
        case 'restore_Health':
            return state.map(driver => {
                if(driver.id === action.payload){
                    if(driver.money >= 25){
                        return {...driver, health: driver.maxHP, money: driver.money - 25};
                    }
                    else{
                        return driver;
                    }    
                }
                else{
                    return driver;
                }
            });
        case 'upgrade_maxHealth':
            return state.map(driver => {
                if(driver.id === action.payload){
                    if(driver.money >= 75){
                        return {...driver, maxHP: driver.maxHP + 1, money: driver.money - 75};
                    }
                    else{
                        return driver;
                    }    
                }
                else{
                    return driver;
                }
            });
        case 'upgrade_maxStanima':
            return state.map(driver => {
                if(driver.id === action.payload){
                    if(driver.money >= 75){
                        return {...driver, maxStanima: driver.maxStanima + 1, money: driver.money - 75};
                    }
                    else{
                        return driver;
                    }    
                }
                else{
                    return driver;
                }
            });
        case 'reduce_Health':
            //console.log("ID: "+action.payload.id + "Danger rating: "+ action.payload.danger); 
            return state.map(driver => {
                if(driver.id === action.payload.id){
                    return {...driver, health: (driver.health - Math.floor(action.payload.danger / driver.skill))};
                }
                else{
                    return driver;
                }
            });
        case 'reduce_Stamina':
            return state.map(driver => {
                if(driver.id === action.payload){
                   return {...driver, stanima: driver.stanima - 1};   
                }
                else{
                    return driver;
                }
            });
        case 'add_Money':
            return state.map(driver => {
                if(driver.id === action.payload.id){
                    return {...driver, money: driver.money + action.payload.reward};       
                }
                else{
                    return driver;
                }
            });
        default:
            return state;
    }
}

const restore_Health = (dispatch) => {
    return (id) => { 
        //console.log("Restoring health for driver with ID: " + id);
        dispatch({type: 'restore_Health', payload: id})
    }
};
const restore_Stanima = (dispatch) => {
    return (id) => {
        dispatch({type: 'restore_Stanima', payload: id})
    }    
};
const upgrade_maxStanima = (dispatch) => {
    return (id) => {
        dispatch({type: 'upgrade_maxStanima', payload: id})
    }    
};
const upgrade_maxHealth = (dispatch) => {
    return (id) => {
        dispatch({type: 'upgrade_maxHealth', payload: id})
    }    
};
const reduce_Health = (dispatch) => {
    return (id, danger) => {
        dispatch({type: 'reduce_Health', payload: {id: id, danger: danger}})
    }    
};
const reduce_Stamina = (dispatch) => {
    return (id) => {
        dispatch({type: 'reduce_Stamina', payload: id})
    }    
};
const add_Money = (dispatch) => {
    return (id, reward) => {
        dispatch({type: 'add_Money', payload: {id: id, reward: reward}})
    }    
};

export const {Context, Provider} = createDataContext(rosterReducer, 
        {restore_Health, restore_Stanima, upgrade_maxHealth, upgrade_maxStanima, reduce_Health, reduce_Stamina, add_Money}, generateRoster());