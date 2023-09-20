import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {useState, useEffect} from 'react';
import {Marker} from 'react-native-maps';

import * as Location from 'expo-location';
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
        <View>
            <Controller
                control={control}
                rules={{
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <SelectDropdown data={AlerteType} onSelect={onChange} value={value} defaultButtonText="Choississez une option" />
                )}
                name="AlertType"
                />
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder="Prenom"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
                )}
                name="Prenom"
            />
            {errors.AlerteType && <Text>This is required.</Text>}

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
                />
                )}
                name="Nom"
            />
            {errors.Nom && <Text>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder="Despription"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline={true}
                    numberOfLines={5}
                    />
                )}
                name="Description"
            />
            {errors.Description && <Text>This is required.</Text>}
          
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

            <Button title="Submit" onPress={handleSubmit(onSubmit)}/>
            
            <View>
                <Text>{pinedAdresse}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '60%',
    },
});