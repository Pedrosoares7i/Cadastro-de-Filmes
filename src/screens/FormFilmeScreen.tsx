import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { atualizarFilme, criarFilme } from "../services/api";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "FormFilme">;
  route: RouteProp<RootStackParamList, "FormFilme">;
};

const GENEROS = [
  "Ação",
  "Aventura",
  "Animação",
  "Comédia",
  "Drama",
  "Fantasia",
  "Ficção Científica",
  "Romance",
  "Suspense",
  "Terror",
];

export default function FormFilmeScreen({ navigation, route }: Props) {
  const filmeExistente = route.params?.filme;
  const isEdicao = !!filmeExistente;

  const [titulo, setTitulo] = useState(filmeExistente?.titulo ?? "");
  const [genero, setGenero] = useState(filmeExistente?.genero ?? "");
  const [ano, setAno] = useState(filmeExistente?.ano ?? "");
  const [salvando, setSalvando] = useState(false);

  const validar = (): boolean => {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Informe o título do filme.");
      return false;
    }
    if (!genero) {
      Alert.alert("Atenção", "Selecione o gênero do filme.");
      return false;
    }
    if (!ano.trim() || !/^\d{4}$/.test(ano.trim())) {
      Alert.alert("Atenção", "Informe um ano válido (4 dígitos).");
      return false;
    }
    return true;
  };

  const salvar = async () => {
    if (!validar()) return;
    try {
      setSalvando(true);
      const dados = { titulo: titulo.trim(), genero, ano: ano.trim() };
      if (isEdicao) {
        await atualizarFilme(filmeExistente!.id, dados);
      } else {
        await criarFilme(dados);
      }
      navigation.goBack();
    } catch {
      Alert.alert("Erro", "Não foi possível salvar o filme.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.tituloTela}>
          {isEdicao ? "✏️ Editar Filme" : "🎬 Novo Filme"}
        </Text>

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Interestelar"
          placeholderTextColor="#6a6a85"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Gênero</Text>
        <View style={styles.generosContainer}>
          {GENEROS.map((g) => (
            <TouchableOpacity
              key={g}
              style={[
                styles.chip,
                genero === g && styles.chipSelecionado,
              ]}
              onPress={() => setGenero(g)}
            >
              <Text
                style={[
                  styles.textoChip,
                  genero === g && styles.textoChipSelecionado,
                ]}
              >
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Ano de lançamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 2014"
          placeholderTextColor="#6a6a85"
          value={ano}
          onChangeText={(t) => setAno(t.replace(/[^0-9]/g, "").slice(0, 4))}
          keyboardType="number-pad"
          maxLength={4}
        />

        <TouchableOpacity
          style={[styles.botaoSalvar, salvando && styles.botaoDesabilitado]}
          onPress={salvar}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.textoBotaoSalvar}>
              {isEdicao ? "Salvar Alterações" : "Cadastrar Filme"}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCancelar}
          onPress={() => navigation.goBack()}
          disabled={salvando}
        >
          <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  scroll: {
    padding: 20,
  },
  tituloTela: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#a0a0b8",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#16213e",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "#0f3460",
  },
  generosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "#16213e",
    borderWidth: 1,
    borderColor: "#0f3460",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 6,
  },
  chipSelecionado: {
    backgroundColor: "#e94560",
    borderColor: "#e94560",
  },
  textoChip: {
    color: "#a0a0b8",
    fontSize: 14,
  },
  textoChipSelecionado: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  botaoSalvar: {
    backgroundColor: "#e94560",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 28,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  textoBotaoSalvar: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoCancelar: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#0f3460",
  },
  textoBotaoCancelar: {
    color: "#a0a0b8",
    fontSize: 16,
  },
});
