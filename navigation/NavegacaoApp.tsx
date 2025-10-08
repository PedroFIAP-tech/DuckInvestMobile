import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe suas telas
import OnboardingScreen from '../screens/TelaOnboarding';  // Seu componente atual
import DashboardScreen from '../screens/Dashboard'; // Sua tela do Donald

// ----------------------------------------------------------------------
// 1. ATUALIZAÇÃO DOS TIPOS DE ROTA
// ----------------------------------------------------------------------
type RootStackParamList = {
  TelaOnboarding: undefined; // Antiga rota principal (agora será substituída por OnboardingScreen)
  TelaLogin: undefined;
  TelaCadastro: undefined;
  Home: undefined; // <--- ROTA DO DASHBOARD
};

// Se você estiver usando um único componente OnboardingScreen para gerenciar
// todas as sub-telas (Onboarding, Login, Cadastro), o NavegacaoApp deve parecer assim:
const Stack = createNativeStackNavigator<RootStackParamList>();

const NavegacaoApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TelaOnboarding" // Inicia na sua tela de Onboarding/Login
        screenOptions={{
          headerShown: false // Esconde o cabeçalho padrão
        }}
      >
        {/* Usamos o OnboardingScreen para a rota TelaOnboarding, 
            e ele fará o "replace" para 'Home' quando o login for feito. */}
        <Stack.Screen name="TelaOnboarding" component={OnboardingScreen} />

        {/* ROTA PRINCIPAL: O Dashboard do Donald */}
        <Stack.Screen name="Home" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavegacaoApp;