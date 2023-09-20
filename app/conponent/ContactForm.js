import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {useState, useEffect} from 'react';
import {Marker} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

import React from 'react';
import MapView from 'react-native-maps';
import SelectDropdown from "react-native-select-dropdown";


const AlerteType = ["Voirie", "stationnement", "travaux"];

const baseUrl = 'https://api.geoapify.com/v1/geocode/reverse';
const ApiKeyGeoApiFy = "27899a6a835243f6bcff91ddf2e1dd47";

    


export default function ContactForm() {
    const[mapRegion, setMapRegion] = useState({
        latitude:43.469955405214364, 
        longitude: 0.9255059046242529,
        latitudeDelta: 0.0200,
        longitudeDelta: 0.0200,
    });

    const[pinedAdresse, setPinedAdresse] = useState(null);
    
    
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
    });
    
    const getAdress = () => {
        axios.get(`${baseUrl}?lat=${mapRegion.latitude}&lon=${mapRegion.longitude}&format=json&apiKey=${ApiKeyGeoApiFy}`)
        .then(function (response) {
            setPinedAdresse(response.data.results[0].formatted);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const onSubmit = () => {
        getAdress();
    }
    
    
    
    
    return (
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
                        name="Prenom"
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
                    name="Nom"
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
                        placeholder="J'ai vu une licorne traversée la route et percuter une éléphant rose"
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
            
            <View>
                <MapView 
                style={styles.map}
                initialRegion={mapRegion}>
                    <Marker 
                        draggable 
                        coordinate={mapRegion} 
                        title="Marker"
                        onDragEnd={(e) => setMapRegion(e.nativeEvent.coordinate)}
                    />
                </MapView>
            </View>

            <Button title="Submit" style={styles.submitButton} onPress={handleSubmit(onSubmit)}/>
            
            <View>
                <Text>{pinedAdresse}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        padding: 50,
    }, 
    map: {
        width: '100%',
        height: '50%',
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
    }
});