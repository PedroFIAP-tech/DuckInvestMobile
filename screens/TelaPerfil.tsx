import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../styles/colors';
import GlobalHeader from '../components/GlobalHeader';
import MascotePlaceholder from '../assets/duckbill.png';

const profileData = {
  rm: '#559250',
  name: 'Donald McDuck',
  level: 'Poupador iniciante',
};

export default function TelaPerfil() {
  const [userAvatarUri, setUserAvatarUri] = React.useState<string | null>(null);
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
  });

  const handleAvatarUpload = () => {
    console.log('Abrindo galeria para o usuário escolher a foto de perfil...');
  };

  const handleBannerUpload = () => {
    console.log('Abrindo galeria para o usuário escolher a foto de CAPA...');
  };

  // Função para fazer o logout
  const handleLogout = async () => {
    try {
      // Remove o token do armazenamento local
      await AsyncStorage.removeItem('userToken');

      // Reseta a pilha de navegação e envia o usuário para a tela inicial de autenticação
      (navigation as any).reset({
        index: 0,
        routes: [{ name: 'TelaOnboarding' }],
      });
    } catch (e) {
      console.error('Erro ao fazer logout', e);
      Alert.alert("Erro", "Não foi possível sair da conta. Tente novamente.");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <GlobalHeader notificationCount={2} />
      
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.bannerContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleBannerUpload}>
            <MaterialCommunityIcons name="pencil" size={30} color={COLORS.HIGHLIGHT_GOLD} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContent}>
          <View style={styles.avatarWrapper}>
            {userAvatarUri ? (
              <Image source={{ uri: userAvatarUri }} style={styles.userAvatarImage} />
            ) : (
              <Image source={MascotePlaceholder} style={styles.userAvatarImage} resizeMode="contain" />
            )}
            <TouchableOpacity style={styles.avatarEditOverlay} onPress={handleAvatarUpload}>
              <MaterialCommunityIcons name="pencil" size={20} color={COLORS.PRIMARY_DARK} />
            </TouchableOpacity>
          </View>

          <View style={styles.userInfoContainer}>
            <Text style={styles.userIdText}>
              id {profileData.rm}
            </Text>

            <View style={styles.nameLevelWrapper}>
              <Text style={styles.userNameText}>
                {profileData.name}
              </Text>
              <Text style={styles.userLevelText}>
                {profileData.level}
              </Text>
            </View>
          </View>

          {/* BOTÃO DE SAIR DA CONTA */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_DARK,
  },
  container: {
    alignItems: 'center',
  },
  bannerContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#495057',
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 10,
  },
  profileContent: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.ACTION_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
<<<<<<< HEAD:screens/PerfilTeste.tsx
    borderWidth: 4,
    borderColor: COLORS.HIGHLIGHT_GOLD,
    marginTop: -70,
=======
    // Puxa o avatar para cima, fazendo ele sobrepor a capa
    marginTop: -70, 
>>>>>>> c8286113d2ad59d8a4ff0842c5645b163d6d75f4:screens/TelaPerfil.tsx
  },
  userAvatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarEditOverlay: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.HIGHLIGHT_GOLD,
    borderRadius: 15,
    padding: 5,
  },
  userInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  userIdText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: COLORS.SUPPORT_WHITE,
    opacity: 0.8,
  },
  nameLevelWrapper: {
    alignItems: 'flex-end',
  },
  userNameText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: COLORS.ACTION_GREEN,
  },
  userLevelText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    color: COLORS.HIGHLIGHT_GOLD,
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 50, // Espaço entre as infos e o botão
    backgroundColor: COLORS.ATTENTION_RED,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center', // Garante que o botão fique centralizado
  },
  logoutButtonText: {
      fontFamily: 'Poppins_700Bold',
      color: COLORS.SUPPORT_WHITE,
      fontSize: 16,
  }
});