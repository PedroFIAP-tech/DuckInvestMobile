import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaOnboarding from '../screens/TelaOnboarding';
import TelaLogin from '../screens/TelaLogin';
import TelaCadastro from '../screens/TelaCadastro';

type RootStackParamList = {
  TelaOnboarding: undefined;
  TelaLogin: undefined;
  TelaCadastro: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavegacaoApp: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="TelaOnboarding"
        screenOptions={{
          headerShown: false // Esconde o cabeçalho padrão em todas as telas
        }}
      >
        <Stack.Screen name="TelaOnboarding" component={TelaOnboarding} />
        <Stack.Screen name="TelaLogin" component={TelaLogin} />
        <Stack.Screen name="TelaCadastro" component={TelaCadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavegacaoApp;