import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';
import MascoteDuckBill from '../assets/LogoDuck.png';

type GlobalHeaderProps = {
  notificationCount: number;
};

const GlobalHeader = ({ notificationCount }: GlobalHeaderProps) => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    // 1. Verificamos se é possível voltar na pilha de navegação.
    //  Prever voltar para pagina dashboard
    
    if (navigation.canGoBack()) {
      // 2. USAMOS O COMANDO CORRETO: popToTop()
      //    Ele volta para a primeira tela da pilha, em vez de criar uma nova.
      (navigation as any).popToTop();
    }
  };

  return (
    <View style={styles.globalHeaderContainer}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={navigateToHome}
        activeOpacity={0.7}
      >
        <View style={styles.globalHeaderIconPlaceholder}>
          <Image
            source={MascoteDuckBill}
            style={styles.mascoteProfileIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.globalHeaderText}>DuckBill</Text>
      </TouchableOpacity>

      <View style={styles.globalHeaderNotificationBell}>
        <MaterialIcons name="notifications" size={26} color={COLORS.HIGHLIGHT_GOLD} />
        {notificationCount > 0 && (
          <View style={styles.globalHeaderNotificationCount}>
            <Text style={styles.globalHeaderCountText}>{notificationCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

// Estilos continuam os mesmos
const styles = StyleSheet.create({
  globalHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.PRIMARY_DARK,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BACKGROUND,
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  globalHeaderIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  globalHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.SUPPORT_WHITE,
    marginLeft: 10,
  },
  globalHeaderNotificationBell: {
    position: 'relative',
  },
  globalHeaderNotificationCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.ATTENTION_RED,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  globalHeaderCountText: {
    color: COLORS.SUPPORT_WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  mascoteProfileIcon: {
    width: 60,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default GlobalHeader;