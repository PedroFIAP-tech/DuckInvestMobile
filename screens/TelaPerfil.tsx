import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { COLORS } from '../styles/colors';

import GlobalHeader from '../components/GlobalHeader';
import MascotePlaceholder from '../assets/mascote_duckbill.png';

const profileData = {
  rm: '#559250',
  name: 'Donald McDuck',
  level: 'Poupador iniciante',
};

export default function TelaPerfil() {
  const [userAvatarUri, setUserAvatarUri] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
  });

  const handleAvatarUpload = () => {
    console.log('Abrindo galeria para o usuário escolher a foto...');
  };

  const handleBannerUpload = () => {
    console.log('Abrindo galeria para o usuário escolher a foto de CAPA...');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    // 1. O fundo geral da tela volta a ser o azul escuro padrão
    <SafeAreaView style={styles.safeArea}>
      <GlobalHeader notificationCount={2} />
      
      {/* Usamos ScrollView para caso o conteúdo cresça no futuro */}
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* 2. Esta é a área da CAPA cinza que o usuário poderá editar */}
        <View style={styles.bannerContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleBannerUpload}>
            <MaterialCommunityIcons name="pencil" size={30} color={COLORS.HIGHLIGHT_GOLD} />
          </TouchableOpacity>
        </View>

        {/* Container para o conteúdo do perfil (avatar e textos) */}
        <View style={styles.profileContent}>
          {/* 3. O avatar agora "flutua" sobre a área da capa */}
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
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_DARK, // Fundo padrão escuro
  },
  container: {
    alignItems: 'center',
  },
  bannerContainer: {
    width: '100%',
    height: 180, // Altura da área da capa
    backgroundColor: '#495057', // O cinza da área personalizável
    position: 'relative', // Necessário para posicionar o botão de editar dentro dela
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
    // Puxa o avatar para cima, fazendo ele sobrepor a capa
    marginTop: -70, 
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
    marginTop: 20, // Espaço entre o avatar e as infos
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
});