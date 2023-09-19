import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import {useState} from 'react';
import {Marker} from 'react-native-maps';

import React from 'react';
import MapView from 'react-native-maps';
import SelectDropdown from "react-native-select-dropdown";


const AlerteType = ["Voirie", "stationnement", "travaux"];

export default function ContactForm() {
    const[mapRegion, setMapRegion] = useState({
        latitude: 43.475576,
        longitude: 0.912082,
        latitudeDelta: 0.0200,
        longitudeDelta: 0.0200,
    })
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
        },
    });
   
    const onSubmit = (data) => {
        console.log(data);
    };
    
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
            {errors.firstName && <Text>This is required.</Text>}

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

            <Controller
                control={control}
                rules={{
                maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <MapView 
                        data={mapRegion} onDragEnd={onChange} value={value}
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
            )}
            name="map"
        />

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: '60%',
    },
  });