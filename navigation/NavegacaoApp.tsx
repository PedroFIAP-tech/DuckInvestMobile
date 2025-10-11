import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Importe as telas de Login e Cadastro que estavam faltando
import OnboardingScreen from '../screens/TelaOnboarding';
import TelaLogin from '../screens/TelaLogin';
import TelaCadastro from '../screens/TelaCadastro';
import DashboardScreen from '../screens/Dashboard';
import TelaPerfil from '../screens/TelaPerfil';

// 2. Adicione as novas rotas à lista de tipos

type RootStackParamList = {
  TelaOnboarding: undefined; // Rota adicionada
  TelaLogin: undefined;      // Rota adicionada
  TelaCadastro: undefined;   // Rota adicionada
  Home: undefined; // Rota adicionada
  PerfilTeste: undefined; // Rota adicionada
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavegacaoApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TelaOnboarding"
        screenOptions={{
          headerShown: false
        }}>

        {/* Rotas de Autenticação */}
        <Stack.Screen name="TelaOnboarding" component={OnboardingScreen} />
        {/* 3. Registre as telas no navegador */}
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} />

        {/* Rotas Principais do App */}
        <Stack.Screen
          name="Home"
          children={({ navigation }) => (
            <DashboardScreen
              onNavigateToProfile={() => navigation.navigate('PerfilTeste')}
            />
          )}
        />
        <Stack.Screen name="PerfilTeste" component={TelaPerfil} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavegacaoApp;