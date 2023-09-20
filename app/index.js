import { Text, View, Image, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const HomeImage = require('../assets/LicoDab.png');
const shinyImage = require('../assets/Shiny.gif');

export default function Page() {
  return (
    <View style={styles.container}>
        <LinearGradient
            start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
            colors={['#e7aaf2', '#c9bae6', '#aeaaf2' ]}
            style={styles.linearGradient}
        >
            <Text style={styles.titre}>Simplon Ville</Text>
            <View style={styles.imageContainer}>
                <Image source={HomeImage} style={styles.image}/>
            </View>
                <View style={styles.buttonContainer}>
                <Link href="/home" asChild>
                        <Pressable style={styles.primaryButton}>
                                <Text style={styles.buttonLabel}>Entrer</Text>
                        </Pressable>
                </Link>
            </View>
        </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1,
      paddingTop: 58,
    },
    image: {
      width: 320,
      height: 440,
    },
    titre:{
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20,
        color: '#fff',
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: "100%",
        width: "100%",
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
        backgroundColor: "#ffffff30",
      },
      buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        marginBottom: 60,
    },
    buttonLabel: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold",
    },
  });