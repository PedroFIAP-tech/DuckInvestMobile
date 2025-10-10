import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Tipos de rota (sem alterações aqui, mas é bom manter)
type RootStackParamList = {
  TelaOnboarding: undefined;
  TelaLogin: undefined;
  TelaCadastro: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList, 'TelaOnboarding'>;

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  // A tela agora é bem mais simples, apenas renderiza a apresentação
  // e os botões de navegação.
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../assets/DuckBillLogo.png')}
          style={styles.logo}
        />
        <Text style={styles.slogan}>
          Sua Primeira{"\n"}
          Moedinha
        </Text>
        <View style={styles.actionsContainer}>
          {/* Botão "Criar Conta" agora navega para a tela de Cadastro */}
          <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('TelaCadastro')}>
            <Text style={styles.buttonTextPrimary}>Criar Conta</Text>
          </TouchableOpacity>

          {/* Botão "Já tenho conta" agora navega para a tela de Login */}
          <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('TelaLogin')}>
            <Text style={styles.buttonTextSecondary}>Já tenho conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Os estilos permanecem praticamente os mesmos, removendo apenas o que não é mais usado.
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0A192F' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  logo: { width: 130, height: 130, resizeMode: 'contain', marginBottom: 40 },
  slogan: { fontFamily: 'Poppins_700Bold', color: '#F0F2F5', fontSize: 26, textAlign: 'center', marginBottom: 60 },
  actionsContainer: { width: '100%' },
  buttonPrimary: { width: '100%', backgroundColor: '#1ABC9C', paddingVertical: 16, borderRadius: 10, alignItems: 'center', marginBottom: 15, marginTop: 10 },
  buttonTextPrimary: { fontFamily: 'Poppins_700Bold', color: '#0A192F', fontSize: 16 },
  buttonSecondary: { width: '100%', backgroundColor: 'transparent', paddingVertical: 14, borderRadius: 10, alignItems: 'center', borderWidth: 2, borderColor: '#F0F2F5' },
  buttonTextSecondary: { fontFamily: 'Poppins_700Bold', color: '#F0F2F5', fontSize: 16 },
});

export default OnboardingScreen;