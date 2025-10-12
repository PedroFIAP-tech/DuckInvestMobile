import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';

type RootStackParamList = {
  TelaOnboarding: undefined;
  TelaLogin: undefined;
  TelaCadastro: undefined;
  Home: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;

const TelaLogin: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const [fontsLoaded] = useFonts({ Poppins_700Bold, Poppins_500Medium });
  if (!fontsLoaded) return null;

  const handleLogin = async () => {
    let isValid = true;
    setEmailError('');
    setSenhaError('');

    if (!email.trim()) {
      setEmailError('O e-mail é obrigatório.');
      isValid = false;
    }
    if (!senha) {
      setSenhaError('A senha é obrigatória.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    
    try {
      console.log('Login validado (simulação). Salvando no AsyncStorage...');
      await AsyncStorage.setItem('userToken', 'login-bem-sucedido');
      navigation.replace('Home');
    } catch (e) {
      console.error('Erro ao salvar no AsyncStorage', e);
      Alert.alert('Erro', 'Ocorreu um problema ao tentar fazer login.');
    }
  };

  return (
    <SafeAreaView style={estilos.safeArea}>
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Que bom te ver!</Text>
        <Text style={estilos.subtitulo}>Acesse sua conta para continuar.</Text>

        <TextInput
          style={estilos.entrada}
          placeholder="Seu e-mail"
          // AQUI ESTÁ A CORREÇÃO: Adicionando a cor do placeholder de volta
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={estilos.errorText}>{emailError}</Text> : null}

        <TextInput
          style={estilos.entrada}
          placeholder="Sua senha"
          // AQUI ESTÁ A CORREÇÃO: Adicionando a cor do placeholder de volta
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        {senhaError ? <Text style={estilos.errorText}>{senhaError}</Text> : null}

        <TouchableOpacity
          style={estilos.botaoPrincipal}
          onPress={handleLogin}
        >
          <Text style={estilos.textoBotaoPrincipal}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TelaCadastro')}>
          <Text style={estilos.link}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Os estilos continuam os mesmos
const estilos = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0A192F' },
  conteudo: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  titulo: { fontFamily: 'Poppins_700Bold', color: '#F0F2F5', fontSize: 28, textAlign: 'center', marginBottom: 10 },
  subtitulo: { fontFamily: 'Poppins_500Medium', color: '#A9A9A9', fontSize: 16, textAlign: 'center', marginBottom: 40 },
  entrada: { backgroundColor: '#1E2A3A', color: '#F0F2F5', fontFamily: 'Poppins_500Medium', borderRadius: 10, padding: 15, fontSize: 16, marginTop: 15 },
  botaoPrincipal: { backgroundColor: '#1ABC9C', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginTop: 30 },
  textoBotaoPrincipal: { fontFamily: 'Poppins_700Bold', color: '#0A192F', fontSize: 16 },
  link: { fontFamily: 'Poppins_500Medium', color: '#1ABC9C', fontSize: 14, textAlign: 'center', marginTop: 20 },
  errorText: {
    fontFamily: 'Poppins_500Medium',
    color: COLORS.ATTENTION_RED,
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 5,
  },
});

export default TelaLogin;