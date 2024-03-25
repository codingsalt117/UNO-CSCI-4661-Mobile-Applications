import React, {useContext, useState} from 'react';
import {Text, StyleSheet, View, SafeAreaView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView} from "react-native";
import { Context as HuntContext} from '../context/HuntContext';
import uuid from 'react-native-uuid';

import { AntDesign } from '@expo/vector-icons';

import HuntList from "../components/HuntList";
import BackButton from "../components/BackButton";

const CreatedHuntListScreen = ({navigation}) => {

    const {state: huntState, addHunt} = useContext(HuntContext);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [backgroundOpacity, setBackgroundOpacity] = useState(1);
    const [huntNameText, setHuntChangeText] = useState('');
    const [modalBackground, setModalBackground] = useState('none');


    let hunts = huntState.hunts
    // const huntsCreatedByUser = hunts.filter((item) => {return item.createdByUser});

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
        setBackgroundOpacity(isModalVisible ? 1 : 0.5);
    };

    const handleCreateHunt = () => {
        let newHunt = {
            id: uuid.v4(),
            hasWon: false,
            createdByUser: true,
            huntName: huntNameText,
            //isEditing: true, //propably assume true? when hunt is created, user is navigated to new hunt edit screen automatically
            //huntDescription:
            locations: [],
            locationsCount: 0,
            huntID: 1,
        };

        addHunt(newHunt);

        navigation.navigate("editScreen", {id: newHunt.id});
    }

    return (
        <SafeAreaView style={[styles.screenContainer, {opacity: backgroundOpacity}]}>

            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Hunt Workshop</Text>
            </View>

            <View style={styles.counterContainer}>
                <Text style={styles.listHeaderText}>Created Hunts:</Text>
                <View style={styles.counterBox}>
                    <Text style={styles.counterText}>{hunts.length}</Text>
                </View>
            </View>

            <View style={styles.huntListContainer}>
                <View style={{flex:.025}}/>
                <View style={{flex:.95}}>
                    <HuntList listType="UserCreatedList" nav="editHuntScreen"/>
                </View>
                <View style={{flex:.025}}/>
            </View>

            <View style={styles.navContainer}>
                <View style={styles.backButtonContainer}>
                    <BackButton />
                </View>

                <View style={{flex:.05}}/>

                <View style={styles.createButtonContainer}>
                    <TouchableOpacity style={styles.createButton} onPress={() => {toggleModal()}}>
                        <Text style={styles.createText}>Create Hunt</Text>
                        <AntDesign name="pluscircle" size={30} color="#355E3B" style={{marginLeft: '2.5%'}}/>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {setModalBackground('transparent')}}
            >
                <KeyboardAvoidingView behavior="height" style={[styles.modalContainer, {backgroundColor: modalBackground}]}>
                    <View style={styles.modalComponents}>

                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitleText}>Hunt Creation</Text>
                        </View>

                        <View style={styles.modalInputContainer}>
                            <Text style={styles.modalInputHeader}>Enter Hunt Name:</Text>
                            <TextInput
                                style={styles.modalTextInput}
                                onChangeText={setHuntChangeText}
                                value={huntNameText}
                                maxLength={25}
                                autoCapitalize='none'
                                autoCorrect={false}
                                selectionColor='black'
                                onFocus={() => {setModalBackground('#C1E1C1')}}
                                onBlur={() => {setModalBackground('transparent')}}
                                onEndEditing={() => {setModalBackground('transparent')}}
                            />
                            <Text style={[styles.modalInputHeader, {fontSize: 14}]}>Max Length ({huntNameText.length}/25)</Text>
                        </View>

                        {huntNameText.length > 0
                            ?
                            <View style={styles.modalCloseContainer}>
                                <View style={{flex: .5}}>
                                    <TouchableOpacity style={styles.modalCloseButton} onPress={() => {toggleModal(), setModalBackground('transparent')}}>
                                        <Text style={styles.modalCloseText}>Close</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{flex: .5}}>
                                    <TouchableOpacity style={styles.modalCloseButton} onPress={() => {/*handleCreateHunt(),*/ toggleModal(), setModalBackground('transparent')}}>
                                        <Text style={styles.modalCloseText}>Create</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={styles.modalCloseContainer}>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={() => {toggleModal(), setModalBackground('transparent')}}>
                                    <Text style={styles.modalCloseText}>Close</Text>
                                </TouchableOpacity>
                            </View>

                        }

                    </View>
                </KeyboardAvoidingView>
            </Modal>

        </SafeAreaView>
    );
};

//Percentages for screen scaling on padding & margin
const styles = StyleSheet.create({
    screenContainer: {
       /*  borderWidth: 3,
        borderColor: 'green', */
        flex: 1, //Screen container takes up 100% of device screen
        padding: '3%',
        backgroundColor: '#355E3B',
    },
    titleContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 25,
    },
    counterContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .075,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    huntListContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .7,
        backgroundColor: '#C1E1C1',
        borderRadius: 15,
    },
    navContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .125,
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'row',
    },
    createButtonContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .475,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2.5%'
    },
    backButtonContainer: {
        /* borderWidth: 2,
        borderColor: 'red', */
        flex: .475,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2.5%'
    },
    createButton: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#C1E1C1',
        borderRadius: 100,
    },
    titleText: {
        fontSize: 48,
        color: '#C1E1C1',
        fontWeight: 'bold',
        borderBottomWidth: 3,
        borderColor: "#C1E1C1"
    },
    counterBox: {
        width: 40,
        height: 30,
        backgroundColor: '#C1E1C1',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listHeaderText: {
        fontSize: 20,
        color: '#C1E1C1',
        marginRight: '2.5%',
    },
    createText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#355E3B',
    },
    counterText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#355E3B',
    },
    //modal
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'none',
    },
    modalComponents: {
        //marginTop: '25%',
        width: '85%',
        height: '50%',
        backgroundColor: '#355E3B',
        borderRadius: 25,
    },
    modalTitleContainer: {
        flex: .25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalInputContainer: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTextInput: {
        backgroundColor: '#C1E1C1',
        width: '75%',
        height: '25%',
        fontSize: 24
    },
    modalCloseContainer: {
        flex: .25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    modalCloseButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C1E1C1',
        borderRadius: 25,
        //width: '75%',
        height: '50%',
        marginHorizontal: '10%',
        paddingHorizontal: '5%',
    },
    modalCloseText: {
        fontSize: 24,
        color: '#355E3B',
    },
    modalTitleText: {
        fontSize: 36,
        color: '#C1E1C1',
        //marginTop: '5%'

    },
    modalInputHeader: {
        fontSize: 24,
        color: '#C1E1C1',
    }

});

export default CreatedHuntListScreen;
