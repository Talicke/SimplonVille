import { Text, View, TextInput, Button, StyleSheet, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native";
import {useState, useEffect} from 'react';
import {Marker} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location'
import emailjs from '@emailjs/browser';


import axios from 'axios';

import React from 'react';
import MapView from 'react-native-maps';
import SelectDropdown from "react-native-select-dropdown";


const AlerteType = ["Voirie", "stationnement", "travaux"];

const baseUrl = 'https://api.geoapify.com/v1/geocode/reverse';
const ApiKeyGeoApiFy = "27899a6a835243f6bcff91ddf2e1dd47";
const locNotFound = require('../../assets/LocNotFound.gif');
    


export default function ContactForm() {
    const[mapRegion, setMapRegion] = useState({
        latitude:48.855579517566845, 
        longitude: 2.328495571923907,
        latitudeDelta: 0.0200,
        longitudeDelta: 0.0200,
    });
    const[pinnedLoc, setPinnedLoc] = useState({
        latitude:48.855579517566845, 
        longitude: 2.328495571923907,
        latitudeDelta: 0.0200,
        longitudeDelta: 0.0200,
    })

    
    
    const[pinedAdresse, setPinedAdresse] = useState(null);
    
    const [locFind, setLocFind] = useState(false); 
    
    const sendEmail = (data) => {
    
        emailjs.send('service_2v0laq8', 'template_i5mh4il', 
        {
            from_name : data.email,
            to_name : "WebAppli Licornoville",
            description_event: data.Description,
            adresse_event: pinedAdresse,
            nom: data.nom,
            prenom: data.prenom

        }
        , '8Yo7fTo5ZtEA_w19F')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
    
    const getLoc = async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        let location = (await Location.getCurrentPositionAsync({}));

        setMapRegion({
            latitude:location.coords.latitude, 
            longitude:location.coords.longitude,
            latitudeDelta: 0.0200,
            longitudeDelta: 0.0200,
        });
        setPinnedLoc({
            latitude:location.coords.latitude, 
            longitude:location.coords.longitude,
            latitudeDelta: 0.0200,
            longitudeDelta: 0.0200,
            });
        if(locFind == false){
            setLocFind(true);
        }
      };


    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
    });
    
    const getAdress = () => {
        axios.get(`${baseUrl}?lat=${pinnedLoc.latitude}&lon=${pinnedLoc.longitude}&format=json&apiKey=${ApiKeyGeoApiFy}`)
        .then(function (response) {
            setPinedAdresse(response.data.results[0].formatted);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const onSubmit = (data) => {
        console.log(data)
        sendEmail(data);
    }
    
    useEffect(() => {
        getLoc()
        if(locFind){
            getAdress();
        }
    },[locFind]) 
    
    return (
        <ScrollView>
            <View style={styles.formContainer}>
                <Text style={styles.titre}>Signalez !</Text>
            
                
                <View>
                    <Text>Votre prenom :</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Jean"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style = {styles.input}
                            />
                            )}
                            name="prenom"
                        />
                        {errors.AlerteType && <Text>This is required.</Text>}
                </View>
                
                <View>
                    <Text>Votre Nom : </Text>
                    <Controller
                        
                        control={control}
                        rules={{
                        maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Nom"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style = {styles.input}
                        />
                        )}
                        name="nom"
                    />
                    {errors.Nom && <Text>This is required.</Text>}
                </View>

                <View>
                    <Text>Votre E-mail : </Text>
                    <Controller
                        
                        control={control}
                        rules={{
                        maxLength: 100,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="mail@email.com"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style = {styles.input}
                        />
                        )}
                        name="email"
                />
                {errors.Nom && <Text>This is required.</Text>}
            </View>

            <View  style={styles.dropDown}>
                <Controller
                    control={control}
                    rules={{
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <SelectDropdown 
                        data={AlerteType}
                        onSelect={onChange} 
                        value={value}
                        defaultButtonText="Services"
                        dropdownStyle = {styles.dropDown}
                        buttonStyle = {styles.dropDownButtonStyle}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                        }}
                        />
                    )}
                    name="AlertType"
                />
            </View>

            <View>
                <Text>Description :</Text>
                <Controller
                    control={control}
                    rules={{
                    maxLength: 100,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="J'ai vu une licorne traversée la route et percuter un éléphant rose"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        multiline={true}
                        numberOfLines={10}
                        style = {[styles.input, {height: 80}]}
                        />
                    )}
                    name="Description"
                />
                {errors.Description && <Text>This is required.</Text>}
            </View>
            {locFind ? (
            <View>
                <View style={styles.containerPinedAdresse}>
                    <Text style={styles.pinedAdresseText}>{pinedAdresse}</Text>
                </View>
                <MapView 
                style={styles.map}
                initialRegion={mapRegion}>
                    <Marker 
                        draggable 
                        coordinate={pinnedLoc} 
                        title={"marker"}
                        onDragEnd={(e) => {setPinnedLoc(e.nativeEvent.coordinate)
                            getAdress();
                        }}
                    />
                </MapView>
            </View>
            ) : 
            (<View style={styles.containerPinedAdresse}>
                <Image source={locNotFound}/>
            </View>)}
            <Button title="Envoyer" style={styles.primaryButton} onPress={handleSubmit(onSubmit)}/>
            
            
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        paddingRight: 50,
        paddingLeft:50,
        paddingTop: 5
    }, 
    map: {
        width: 300,
        height: 300,
        marginBottom: 10,
    },
    titre: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    dropDownButtonStyle: {
        backgroundColor: "#ffffff80",
        borderRadius: 10,
        height: 30,
        width: "60%",
        borderWidth: 1,
        borderColor: "purple",
    },
    input:{
        backgroundColor: "#ffffff80",
        borderRadius: 10,
        height: 30,
        marginTop: 5,
        marginBottom: 10,
        padding: 4,
        borderWidth: 1,
        borderColor: "purple",
    },
    submitButton:{
        marginTop: 10,
    },
    primaryButton:{
        borderRadius: 30,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: "purple",
        backgroundColor: "#ffffff60",
    },
    containerPinedAdresse :{
        backgroundColor: "#ffffff80",
        marginBottom: 10
    },
    pinedAdresseText:{
        fontSize: 16,
       
    }
    
});