import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Filme } from "../types/Filme";
import { excluirFilme, listarFilmes } from "../services/api";
import { RootStackParamList } from "../navigation/types";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "FilmesList">;
};

const GENEROS: Record<string, string> = {
  "Ficção Científica": "🚀",
  Ação: "💥",
  Aventura: "🗺️",
  Comédia: "😂",
  Drama: "🎭",
  Romance: "❤️",
  Terror: "👻",
  Animação: "🎨",
  Suspense: "🔍",
  Fantasia: "🧙",
};

export default function FilmesListScreen({ navigation }: Props) {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarFilmes = useCallback(async () => {
    try {
      setCarregando(true);
      const dados = await listarFilmes();
      setFilmes(dados);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os filmes.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarFilmes();
    }, [carregarFilmes])
  );

  const confirmarExclusao = (filme: Filme) => {
    Alert.alert(
      "Excluir filme",
      `Deseja realmente excluir "${filme.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await excluirFilme(filme.id);
              setFilmes((prev) => prev.filter((f) => f.id !== filme.id));
            } catch {
              Alert.alert("Erro", "Não foi possível excluir o filme.");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Filme }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.titulo}>
          {GENEROS[item.genero] ?? "🎬"} {item.titulo}
        </Text>
        <Text style={styles.detalhe}>Gênero: {item.genero}</Text>
        <Text style={styles.detalhe}>Ano: {item.ano}</Text>
      </View>
      <View style={styles.acoes}>
        <TouchableOpacity
          style={[styles.botao, styles.botaoEditar]}
          onPress={() => navigation.navigate("FormFilme", { filme: item })}
        >
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botao, styles.botaoExcluir]}
          onPress={() => confirmarExclusao(item)}
        >
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#e94560" />
        <Text style={styles.textoCarregando}>Carregando filmes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloTela}>🎬 Meus Filmes</Text>
      {filmes.length === 0 ? (
        <View style={styles.centro}>
          <Text style={styles.textoVazio}>
            Nenhum filme cadastrado.
            {"\n"}Toque em "+" para adicionar!
          </Text>
        </View>
      ) : (
        <FlatList
          data={filmes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
        />
      )}
      <TouchableOpacity
        style={styles.botaoFlutuante}
        onPress={() => navigation.navigate("FormFilme")}
      >
        <Text style={styles.textoBotaoFlutuante}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    paddingTop: 16,
  },
  tituloTela: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  card: {
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardInfo: {
    flex: 1,
    marginRight: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  detalhe: {
    fontSize: 14,
    color: "#a0a0b8",
  },
  acoes: {
    gap: 8,
  },
  botao: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 90,
    alignItems: "center",
  },
  botaoEditar: {
    backgroundColor: "#0f3460",
  },
  botaoExcluir: {
    backgroundColor: "#e94560",
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 13,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textoCarregando: {
    color: "#a0a0b8",
    marginTop: 12,
  },
  textoVazio: {
    color: "#a0a0b8",
    fontSize: 16,
    textAlign: "center",
  },
  botaoFlutuante: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e94560",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  textoBotaoFlutuante: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: -2,
  },
});
