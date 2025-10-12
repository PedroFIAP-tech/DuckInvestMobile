import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '../styles/colors'; // Importando suas cores para os erros

type RootStackParamList = {
  TelaOnboarding: undefined;
  TelaLogin: undefined;
  TelaCadastro: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, 'TelaCadastro'>;

const TelaCadastro: React.FC<Props> = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // 1. Estados para guardar as mensagens de erro de cada campo
  const [nomeError, setNomeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const [fontsLoaded] = useFonts({ Poppins_700Bold, Poppins_500Medium });
  if (!fontsLoaded) return null;

  const handleCadastro = () => {
    // 2. Limpa os erros antigos e define uma flag de validade
    let isValid = true;
    setNomeError('');
    setEmailError('');
    setSenhaError('');

    // 3. Validação dos campos
    if (!nome.trim()) {
      setNomeError('O nome completo é obrigatório.');
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError('O e-mail é obrigatório.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) { // Regex simples para validar o formato do email
      setEmailError('Por favor, insira um e-mail válido.');
      isValid = false;
    }
    if (!senha) {
      setSenhaError('A senha é obrigatória.');
      isValid = false;
    } else if (senha.length < 6) {
      setSenhaError('A senha deve ter no mínimo 6 caracteres.');
      isValid = false;
    }

    // 4. Se não for válido, a função para aqui.
    if (!isValid) {
      return;
    }

    // Se todas as validações passaram, continua o fluxo normal
    Alert.alert('Sucesso!', 'Conta criada. Agora faça o login.');
    navigation.navigate('TelaLogin');
  };

  return (
    <SafeAreaView style={estilos.safeArea}>
      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>Crie sua conta</Text>
        <Text style={estilos.subtitulo}>Comece a organizar sua vida financeira.</Text>

        <TextInput
          style={estilos.entrada}
          placeholder="Nome Completo"
          placeholderTextColor="#A9A9A9"
          value={nome}
          onChangeText={setNome}
        />
        {/* 5. Mostra a mensagem de erro se ela existir */}
        {nomeError ? <Text style={estilos.errorText}>{nomeError}</Text> : null}

        <TextInput
          style={estilos.entrada}
          placeholder="Seu melhor e-mail"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={estilos.errorText}>{emailError}</Text> : null}

        <TextInput
          style={estilos.entrada}
          placeholder="Crie uma senha forte (mín. 6 caracteres)"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        {senhaError ? <Text style={estilos.errorText}>{senhaError}</Text> : null}

        <TouchableOpacity style={estilos.botaoPrincipal} onPress={handleCadastro}>
          <Text style={estilos.textoBotaoPrincipal}>Criar Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TelaLogin')}>
          <Text style={estilos.link}>Já tem uma conta? Faça login</Text>
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
  entrada: { backgroundColor: '#1E2A3A', color: '#F0F2F5', fontFamily: 'Poppins_500Medium', borderRadius: 10, padding: 15, fontSize: 16, marginTop: 15 },
  botaoPrincipal: { backgroundColor: '#1ABC9C', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginTop: 30 },
  textoBotaoPrincipal: { fontFamily: 'Poppins_700Bold', color: '#0A192F', fontSize: 16 },
  link: { fontFamily: 'Poppins_500Medium', color: '#1ABC9C', fontSize: 14, textAlign: 'center', marginTop: 20 },
  // 6. Estilo para o texto de erro
  errorText: {
    fontFamily: 'Poppins_500Medium',
    color: COLORS.ATTENTION_RED,
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 5,
  },
});

export default TelaCadastro;