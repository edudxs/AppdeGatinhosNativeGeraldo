import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

const API_URL = "https://api.thecatapi.com/v1/images/search";

export default function App() {
  const [cat, setCat] = useState<CatImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadCat() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      const data: CatImage[] = await res.json();

      if (data && data.length > 0) {
        setCat(data[0]);
      } else {
        setError("Não retornou nenhuma imagem 😿");
      }
    } catch {
      setError("Não foi possível carregar a foto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.appTag}>Desafio React Native</Text>
          <Text style={styles.title}>Gatinhos Aleatórios 🐱</Text>
          <Text style={styles.subtitle}>
            Toque no botão abaixo para ver uma nova foto fofinha.
          </Text>
        </View>

        {/* Conteúdo principal */}
        <View style={styles.content}>
          {loading && (
            <View style={styles.center}>
              <ActivityIndicator size="large" />
              <Text style={styles.muted}>Buscando uma fofura...</Text>
            </View>
          )}

          {!loading && error && (
            <Text style={[styles.muted, styles.error]}>{error}</Text>
          )}

          {!loading && !error && !cat && (
            <Text style={styles.muted}>
              Nenhuma foto ainda. Toque em{" "}
              <Text style={styles.bold}>“Mostrar gatinho”</Text>.
            </Text>
          )}

          {!loading && cat && (
            <View style={styles.imageCard}>
              <Image
                source={{ uri: cat.url }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.imageCaption}>ID: {cat.id}</Text>
            </View>
          )}
        </View>

        {/* Botão fixo embaixo */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={loadCat}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {loading ? "Carregando..." : "✨ Mostrar gatinho"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F3F4FB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // Cabeçalho
  header: {
    marginBottom: 12,
  },
  appTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#E3E7FF",
    color: "#4B5BD4",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
  },

  // Conteúdo central
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  muted: {
    marginTop: 8,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 24,
    fontSize: 14,
  },
  bold: {
    fontWeight: "700",
    color: "#4B5BD4",
  },

  imageCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 10,
    borderColor: "#E5E7EB",
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 320,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
  },
  imageCaption: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    color: "#9CA3AF",
  },

  // Rodapé com botão
  footer: {
    paddingBottom: 20,
  },
  button: {
    backgroundColor: "#4B5BD4",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  error: {
    color: "#EF4444",
  },
});

