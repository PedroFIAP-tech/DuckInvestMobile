import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native'; // Para a tela de loading
// Importe suas telas
import OnboardingScreen from '../screens/TelaOnboarding';
import TelaLogin from '../screens/TelaLogin';
import TelaCadastro from '../screens/TelaCadastro';
import DashboardScreen from '../screens/Dashboard';
import PerfilTeste from '../screens/PerfilTeste';
import { COLORS } from '../styles/colors';
import CotacaoScreen from '../screens/CotacaoScreen';

type RootStackParamList = {
  TelaOnboarding: undefined;
  TelaLogin: undefined;
  TelaCadastro: undefined;
  Home: undefined;
  PerfilTeste: undefined;
  Cotacao: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavegacaoApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<'TelaOnboarding' | 'Home'>('TelaOnboarding');

  useEffect(() => {
    // Função que verifica o token no AsyncStorage
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // Se encontrou o token, a tela inicial será a Home
          setInitialRoute('Home');
        } else {
          // Senão, será a de Onboarding
          setInitialRoute('TelaOnboarding');
        }
      } catch (e) {
        console.error('Erro ao ler do AsyncStorage', e);
      } finally {
        setIsLoading(false); // Termina o carregamento
      }
    };

    checkLoginStatus();
  }, []);

  // Enquanto verifica, mostramos uma tela de carregamento
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: COLORS.PRIMARY_DARK }}>
        <ActivityIndicator size="large" color={COLORS.ACTION_GREEN} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false
        }}>

        {/* Telas de Autenticação */}
        <Stack.Screen name="TelaOnboarding" component={OnboardingScreen} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
        <Stack.Screen name="Cotacao" component={CotacaoScreen} />

        {/* Telas Principais do App */}
        <Stack.Screen
          name="Home"
          children={({ navigation }) => (
            <DashboardScreen
              navigation={navigation}
              onNavigateToProfile={() => navigation.navigate('PerfilTeste')}
            />
          )}
        />
        <Stack.Screen name="PerfilTeste" component={PerfilTeste} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavegacaoApp;