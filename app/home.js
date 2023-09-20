import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import ContactForm from './conponent/ContactForm';


export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
          start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
          colors={['#e7aaf2', '#c9bae6', '#aeaaf2' ]}
          style={styles.linearGradient}
      >
      <ContactForm/>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginBottom: 0,
  }
});

