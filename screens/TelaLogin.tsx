import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  TelaOnboarding: undefined;
  TelaLogin: undefined;
  TelaCadastro: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;

const TelaLogin: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [fontsLoaded] = useFonts({ Poppins_700Bold, Poppins_500Medium });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={estilos.safeArea}>
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Que bom te ver!</Text>
        <Text style={estilos.subtitulo}>Acesse sua conta para continuar.</Text>

        <TextInput
          style={estilos.entrada}
          placeholder="Seu e-mail"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={estilos.entrada}
          placeholder="Sua senha"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={estilos.botaoPrincipal} onPress={() => console.log('Login...')} >
          <Text style={estilos.textoBotaoPrincipal}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TelaCadastro')}>
          <Text style={estilos.link}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0A192F' },
  conteudo: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  titulo: { fontFamily: 'Poppins_700Bold', color: '#F0F2F5', fontSize: 28, textAlign: 'center', marginBottom: 10 },
  subtitulo: { fontFamily: 'Poppins_500Medium', color: '#A9A9A9', fontSize: 16, textAlign: 'center', marginBottom: 40 },
  entrada: {
    backgroundColor: '#1E2A3A',
    color: '#F0F2F5',
    fontFamily: 'Poppins_500Medium',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  botaoPrincipal: { backgroundColor: '#1ABC9C', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  textoBotaoPrincipal: { fontFamily: 'Poppins_700Bold', color: '#0A192F', fontSize: 16 },
  link: { fontFamily: 'Poppins_500Medium', color: '#1ABC9C', fontSize: 14, textAlign: 'center', marginTop: 20 },
});

export default TelaLogin;