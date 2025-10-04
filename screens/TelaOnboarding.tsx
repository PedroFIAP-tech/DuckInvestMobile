import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';

const OnboardingScreen: React.FC = () => {
  // Estado para controlar a tela atual
  const [telaAtual, setTelaAtual] = useState<'Onboarding' | 'Cadastro' | 'Login'>('Onboarding');
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }
  
  // Função para lidar com o cadastro
  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }
    Alert.alert('Sucesso!', `Conta para ${nome} criada. Agora faça o login.`);
    setTelaAtual('Login'); // Redireciona para o login após o cadastro
  };

  // ---- RENDERIZAÇÃO DAS TELAS ----

  
  const renderOnboarding = () => (
    <View style={styles.container}>
      <Image
        source={require('../assets/DuckBillLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.slogan}>
        Seu dinheiro, suas regras.{"\n"}
        De um jeito divertido.
      </Text>
      <View style={styles.actionsContainer}>
        
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => setTelaAtual('Cadastro')}>
          <Text style={styles.buttonTextPrimary}>Criar Conta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => setTelaAtual('Login')}>
          <Text style={styles.buttonTextSecondary}>Já tenho conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Tela de Cadastro
  const renderCadastro = () => (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => setTelaAtual('Onboarding')}>
        <Text style={styles.textoLink}>‹ Voltar</Text>
      </TouchableOpacity>
      <Image
        source={require('../assets/DuckBillLogo.png')}
        style={styles.logoForm}
      />
      <Text style={styles.tituloForm}>Crie sua conta</Text>
      <TextInput
        style={styles.entrada}
        placeholder="Nome Completo"
        placeholderTextColor="#A9A9A9"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.entrada}
        placeholder="Seu melhor e-mail"
        placeholderTextColor="#A9A9A9"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.entrada}
        placeholder="Crie uma senha forte"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.buttonPrimary} onPress={handleCadastro}>
        <Text style={styles.buttonTextPrimary}>Confirmar Cadastro</Text>
      </TouchableOpacity>
    </View>
  );

  // Tela de Login
  const renderLogin = () => (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => setTelaAtual('Onboarding')}>
        <Text style={styles.textoLink}>‹ Voltar</Text>
      </TouchableOpacity>
      <Image
        source={require('../assets/DuckBillLogo.png')}
        style={styles.logoForm}
      />
      <Text style={styles.tituloForm}>Que bom te ver!</Text>
      <TextInput
        style={styles.entrada}
        placeholder="Seu e-mail"
        placeholderTextColor="#A9A9A9"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.entrada}
        placeholder="Sua senha"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.buttonPrimary} onPress={() => Alert.alert('Login', 'Funcionalidade de login a ser implementada!')}>
        <Text style={styles.buttonTextPrimary}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {telaAtual === 'Onboarding' && renderOnboarding()}
      {telaAtual === 'Cadastro' && renderCadastro()}
      {telaAtual === 'Login' && renderLogin()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0A192F' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  // Estilos da tela de Onboarding
  logo: { width: 130, height: 130, resizeMode: 'contain', marginBottom: 40 },
  slogan: { fontFamily: 'Poppins_700Bold', color: '#F0F2F5', fontSize: 26, textAlign: 'center', marginBottom: 60 },
  actionsContainer: { width: '100%' },
  // Estilos dos formulários (Login/Cadastro)
  logoForm: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 30 },
  tituloForm: { fontFamily: 'Poppins_700Bold', color: '#F0F2F5', fontSize: 28, textAlign: 'center', marginBottom: 30 },
  entrada: {
    width: '100%',
    backgroundColor: '#1E2A3A',
    color: '#F0F2F5',
    fontFamily: 'Poppins_500Medium',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  botaoVoltar: { position: 'absolute', top: 20, left: 20 },
  textoLink: { fontFamily: 'Poppins_500Medium', color: '#1ABC9C', fontSize: 16 },
  // Estilos de botões (reutilizados)
  buttonPrimary: { width: '100%', backgroundColor: '#1ABC9C', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginBottom: 15, marginTop: 10 },
  buttonTextPrimary: { fontFamily: 'Poppins_700Bold', color: '#0A192F', fontSize: 16 },
  buttonSecondary: { width: '100%', backgroundColor: 'transparent', paddingVertical: 14, borderRadius: 10, alignItems: 'center', borderWidth: 2, borderColor: '#F0F2F5' },
  buttonTextSecondary: { fontFamily: 'Poppins_700Bold', color: '#F0F2F5', fontSize: 16 },
});

export default OnboardingScreen;