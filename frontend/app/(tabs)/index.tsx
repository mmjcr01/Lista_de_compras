import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput, button } from 'react-native';
import {Link} from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@react-navigation/elements';


export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">login</ThemedText>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.text}>Email</ThemedText>
        <TextInput style={styles.input} placeholder='Digite o e-mail'></TextInput>
        <ThemedText style={styles.text} >Senha</ThemedText>
        <TextInput style={styles.input} placeholder='Digite a senha'></TextInput>
        <Button>Entrar</Button>
        <Link href="/cadastro" style={styles.link}>Não tem login? Clique aqui para cadastrar-se!</Link>

      </ThemedView>
        <ThemedView style={styles.Google}>
          <AntDesign name="google" size={24} color="#4285F4" />
          <ThemedText style={styles.textGoogle}>Google</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#F6FAFF',
  },
  link:{
    fontSize: 10,
    bottom: 6,
    left: 8,
  },
  Google:{
    gap: 10,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 30,
    borderRadius: 6,
    padding: 16,
    backgroundColor: '#F5F9FE',

  },
  textGoogle:{
    color: '#61677D',
    fontSize: 15,

  },
  input:{
    borderBlockEndColor:'#ffffff',
    borderRadius: 6,
    backgroundColor: '#805454',
    padding: 5,
  },
  text:{
    fontSize: 20,

  },
  
  titleContainer: {
   backgroundColor: '#237d8dff',
   marginBottom: 25,
   height: 500,
    width: 400,
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 2,
    borderRadius: 10,

  },
  stepContainer: {
    gap: 10,
    marginBottom: 8,
    padding: 30,
    borderRadius: 2,
    height: 300,
    width: 200, 

  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
