import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe suas telas
import OnboardingScreen from '../screens/TelaOnboarding';
import DashboardScreen from '../screens/Dashboard'; 
import PerfilTeste from '../screens/PerfilTeste';

// ----------------------------------------------------------------------
// 1. Definição dos Tipos de Rota
// ----------------------------------------------------------------------
type RootStackParamList = {
  TelaOnboarding: undefined; 
  TelaLogin: undefined;
  TelaCadastro: undefined;
  Home: undefined; // ROTA DO DASHBOARD
  PerfilTeste: undefined; // ROTA DO PERFIL
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
        
        {/* ROTA DE ONBOARDING/LOGIN */}
        <Stack.Screen name="TelaOnboarding" component={OnboardingScreen} />

        {/* ROTA HOME (DASHBOARD) - Usa 'children' para injetar a navegação */}
        <Stack.Screen 
          name="Home" 
          children={({ navigation }) => (
            <DashboardScreen 
              // A função onNavigateToProfile agora está ligada à rota 'PerfilTeste'
              onNavigateToProfile={() => navigation.navigate('PerfilTeste')} 
            />
          )}
        />
        
        {/* ROTA DA PÁGINA DE TESTE/PERFIL */}
        <Stack.Screen name="PerfilTeste" component={PerfilTeste} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavegacaoApp;