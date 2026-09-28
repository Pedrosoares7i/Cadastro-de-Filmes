import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FilmesListScreen from "./src/screens/FilmesListScreen";
import FormFilmeScreen from "./src/screens/FormFilmeScreen";
import { RootStackParamList } from "./src/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#1a1a2e" },
            headerTintColor: "#ffffff",
            headerTitleStyle: { fontWeight: "bold" },
            contentStyle: { backgroundColor: "#1a1a2e" },
          }}
        >
          <Stack.Screen
            name="FilmesList"
            component={FilmesListScreen}
            options={{ title: "Cadastro de Filmes" }}
          />
          <Stack.Screen
            name="FormFilme"
            component={FormFilmeScreen}
            options={({ route }) => ({
              title: route.params?.filme ? "Editar Filme" : "Novo Filme",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
