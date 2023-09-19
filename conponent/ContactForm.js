import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import SelectDropdown from "react-native-select-dropdown";

const AlerteType = ["Voirie", "Canada", "Australia", "Ireland"];

export default function App() {
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
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectDropdown data={AlerteType} onSelect={onChange} value={value} defaultButtonText="Choississez une option" />
        )}
        name="AlertType"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}