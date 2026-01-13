import { Image } from "expo-image";
import { Platform, StyleSheet, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <LinearGradient colors={["#0B1C2D", "#0A0F2C"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/edited-image-1768330422738.svg")}
          />
          <ThemedText style={styles.titulo} type="title">
            LISTA DE COMPRAS
          </ThemedText>
          <ThemedText style={styles.titulo}>Login</ThemedText>
        </View>
        <View style={styles.stepContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite o e-mail"
            placeholderTextColor={"rgba(255,255,255,0.6)"}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Digite a senha"
            placeholderTextColor={"rgba(255,255,255,0.6)"}
          ></TextInput>
          <LinearGradient colors={["#2563EB", "#1E40AF"]} style={styles.button}>
            <ThemedText style={styles.buttonText}>Entrar</ThemedText>
          </LinearGradient>
          <Link href="/cadastro" asChild>
            <ThemedText style={styles.link}>
              Não tem login? Clique aqui para cadastrar-se!
            </ThemedText>
          </Link>
        </View>
        <View style={styles.Google}>
          <Pressable style={styles.googleButton}>
            <AntDesign name="google" size={24} color="#4285F4" />
            <ThemedText style={styles.textGoogle}>Google</ThemedText>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20,
    shadowColor: "#FF0000",
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  titulo: {
    bottom: -47,
    padding: 3,
    fontSize: 24,
    fontWeight: "600",

    textDecorationColor: "none",
    color: "#ffffffff",
  },

  link: {
    fontSize: 10,
    bottom: 6,
    left: 8,
    
    color: '#ffff'
  },
  Google: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    minHeight: 48,
    minWidth: 120,
    gap: 8,
  },
  textGoogle: {
    color: "#61677D",
    fontSize: 15,
  },
  input: {
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
    fontSize: 16,
  },
  text: {
    fontSize: 20,
  },

  titleContainer: {
    height: "50%",
    width: 400,
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 2,
    borderRadius: 10,
  },
  stepContainer: {
    gap: 10,
    paddingInline: 20,
    borderRadius: 2,
    height: 215,
    width: 360,
  },
  button: {
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
