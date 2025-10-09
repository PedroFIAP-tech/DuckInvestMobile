import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Animated } from 'react-native';
// Importação dos ícones vetoriais
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors'; // Importa as cores

import VisitaAoCofre from '../assets/visitaaocofre.png';
import MapaDaRiqueza from '../assets/mapadariqueza.png';
import CacaAoTesouro from '../assets/cacaaotesouro.png';
import MascoteDuckBill from '../assets/LogoDuck.png';
import DuckBillIcon from '../assets/duckbill.png';

// --- Dados Mock (Simulando o Usuário Donald) ---
const userData = {
  name: 'Donald',
  actualBalance: '1.000.250,50', 
  maskedBalance: '******', 
  favorites: [
    { name: 'Visita ao Cofre', image: VisitaAoCofre , color: COLORS.ACTION_GREEN },
    { name: 'Mapa da Riqueza', image: MapaDaRiqueza, color: COLORS.ACTION_GREEN },
    { name: 'Caça ao Tesouro', image: CacaAoTesouro, color: COLORS.ACTION_GREEN },
    // Adicionando mais itens para simular o conteúdo escondido
    { name: 'DuckBill', image: DuckBillIcon, color: COLORS.ACTION_GREEN }, 
  ],
  alerts: [
    { title: 'Pagar chip:', value: 'R$ 65,00', date: 'ontem', status: 'concluído', statusColor: COLORS.ATTENTION_RED },
    { title: 'Pagar assinatura:', value: 'R$ 19,90', date: 'próxima semana', status: 'concluído', statusColor: COLORS.ACTION_GREEN },
  ],
};

// --- Componentes Reutilizáveis ---
// Card de Ícone no Menu de Favoritos
type FavoriteItemProps = {
  item: { name: string; color: string; icon?: string; image?: any; };
};

const FavoriteItem: React.FC<FavoriteItemProps> = ({ item }) => (
  <TouchableOpacity style={styles.favoriteCard}>
    <View style={[styles.favoriteIconWrapper, { backgroundColor: item.color + '33' }]}>
      {item.image ? (
        <Image source={item.image} style={{ width: 30, height: 30 }} resizeMode="contain" />
      ) : (
        <MaterialCommunityIcons name={item.icon as any} size={30} color={item.color} />
      )}
    </View>
    <Text style={styles.favoriteText}>{item.name}</Text>
  </TouchableOpacity>
);

// Card de Alerta (Sino de Ouro)
type AlertCardProps = {
  title: string;
  value: string;
  date: string;
  status: string;
  statusColor: string;
};

const AlertCard: React.FC<AlertCardProps> = ({ title, value, date, status, statusColor }) => (
  <View style={styles.alertCard}>
    <Text style={styles.alertTitle}>{title}</Text>
    <View style={styles.alertRow}>
      <View>
        <Text style={[styles.alertDate, date === 'ontem' && { color: COLORS.ATTENTION_RED }]}>
          data prevista: 
          <Text style={{ fontWeight: 'bold' }}> {date}</Text>
        </Text>
      </View>
      <View style={styles.alertValueStatus}>
        <Text style={styles.alertValue}>{value}</Text>
        <TouchableOpacity style={[styles.alertStatusButton, { backgroundColor: statusColor }]}>
          <Text style={styles.alertStatusText}>{status}</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.alertDivider} />
  </View>
);

// ----------------------------------------------------------------------
// COMPONENTE: HEADER GLOBAL
// ----------------------------------------------------------------------
const GlobalHeader = () => (
    <View style={styles.globalHeaderContainer}>
        {/* Ícone de Perfil / Usuário SUBSTITUÍDO pelo Mascote DuckBill */}
        <View style={styles.globalHeaderIconPlaceholder}>
            {/* Componente <Image> para o Mascote na área do perfil */}
            <Image 
                source={MascoteDuckBill} 
                style={styles.mascoteProfileIcon} // NOVO estilo específico para a imagem do perfil
                resizeMode="contain" 
            />
        </View>
        <Text style={styles.globalHeaderText}>DuckBill</Text>
        <View style={styles.globalHeaderNotificationBell}>
            <MaterialIcons name="notifications" size={26} color={COLORS.HIGHLIGHT_GOLD} />
            <View style={styles.globalHeaderNotificationCount}>
                <Text style={styles.globalHeaderCountText}></Text>
            </View>
        </View>
    </View>
);// linha 83 é a linha da notificação do sino(implementar uma funcao pras notificações)

// Componente para o Avatar do Mascote com Imagem
const MascoteIcon = () => (
    <View style={styles.profileIconPlaceholder}>
        <Image
            source={require('../assets/mascote_duckbill.png')} 
            style={styles.mascoteImage}
            resizeMode="contain"
        />
    </View>
);


// --- Tela Principal ---
export default function Dashboard() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(false);

// Novo Valor Animado para a Rotação da setinha dos favoritos (Começa em 0) 
   const expandAnimation = useRef(new Animated.Value(0)).current; 

  const handleToggleBalance = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };
    
  const handleToggleFavorites = () => {
    const newState = !isFavoritesExpanded;
    setIsFavoritesExpanded(newState);
    
    // NOVO: Lógica da Animação
    Animated.timing(expandAnimation, {
        toValue: newState ? 1 : 0, // 1 para expandido (seta para cima), 0 para recolhido (seta para baixo)
        duration: 300, 
        useNativeDriver: true, 
    }).start();
  };

  // NOVO: Interpolação da Rotação (Traduz o 0 e 1 para graus de rotação)
  const arrowRotation = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  
  const displayBalance = isBalanceVisible 
    ? userData.actualBalance 
    : userData.maskedBalance;

  const toggleIcon = isBalanceVisible 
    ? 'eye-off-outline'
    : 'eye-outline';
    
  const favoriteItemsToShow = isFavoritesExpanded ? userData.favorites : userData.favorites.slice(0, 3);
  
  const expandIconName = isFavoritesExpanded 
    ? 'arrow-up-drop-circle-outline' 
    : 'arrow-down-drop-circle-outline';

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* HEADER GLOBAL */}
      <GlobalHeader /> 
      
      <ScrollView style={styles.container}>
        {/* --- SEÇÃO: SAUDAÇÃO E PERFIL ("Olá, Donald!") --- */}
        <View style={styles.header}>
          <MascoteIcon />
          <Text style={styles.greeting}>Olá, <Text style={styles.name}>{userData.name}!</Text></Text>
        </View>

        {/* --- CARD DE SALDO --- */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Atual:</Text>
          <Text style={styles.balanceValue}>R$ <Text>{displayBalance}</Text></Text>
          
          <TouchableOpacity 
            style={styles.toggleIconContainer}
            onPress={handleToggleBalance}
          >
            <MaterialCommunityIcons 
              name={toggleIcon as any} 
              size={30} 
              color={COLORS.SUPPORT_WHITE} 
              style={styles.cloudIcon} 
            />
          </TouchableOpacity>
        </View>

        {/* --- FAVORITOS (Com Toggle) --- */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Favoritos:</Text>
          
          <View style={styles.favoritesRow}>
            {favoriteItemsToShow.map((item, index) => (
              <FavoriteItem key={index} item={item} />
            ))}
          </View>
          
          {/* BOTÃO/INDICADOR DE EXPANDIR/RECOLHER */}
          {/* CÓDIGO NOVO (Com Rotação): */}
          {userData.favorites.length > 3 && (
              <TouchableOpacity 
                style={styles.scrollDownIndicator}
                onPress={handleToggleFavorites}
                activeOpacity={0.7}
              >
                {/* 4. Aplicando a Animação de Rotação */}
                <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
                  <MaterialCommunityIcons 
                    name={'chevron-down' as any} // Usamos 'chevron-down' como base e deixamos a rotação fazer o trabalho
                    size={28} // O tamanho sugerido de 28 pixels
                    color={COLORS.SUPPORT_WHITE} 
                    style={{opacity: 0.8}} 
                  />
                </Animated.View>
              </TouchableOpacity>
          )}

        </View>

        {/* --- Sino de Ouro --- */}
        <View style={styles.goldBellContainer}>
          <View style={styles.goldBellHeader}>
            <Text style={styles.goldBellTitle}>Sino de Ouro:</Text>
            <MaterialIcons name="notifications-active" size={24} color={COLORS.HIGHLIGHT_GOLD} />
          </View>
          
          {userData.alerts.map((alert, index) => (
            <AlertCard key={index} {...alert} />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


// --- Estilos ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.BACKGROUND },
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.BACKGROUND },
  
  // ----------------------------------------------------------------------
  // ESTILOS DO HEADER GLOBAL
  // ----------------------------------------------------------------------
  globalHeaderContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.PRIMARY_DARK, paddingHorizontal: 20, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.BACKGROUND, },
  globalHeaderIconPlaceholder: { width: 40, height: 40, borderRadius: 8,  justifyContent: 'center', alignItems: 'center', },
  globalHeaderText: { flex: 1, fontSize: 22, fontWeight: 'bold', color: COLORS.SUPPORT_WHITE, marginLeft: 10, },
  globalHeaderNotificationBell: { position: 'relative', },
  globalHeaderNotificationCount: { position: 'absolute', top: -5, right: -5, backgroundColor: COLORS.ATTENTION_RED, borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center', },
  globalHeaderCountText: { color: COLORS.SUPPORT_WHITE, fontSize: 12, fontWeight: 'bold', },
  
  // --- Estilos da Seção "Olá, Donald!" ---
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingVertical: 15 },
  
  // ESTILOS DO AVATAR DA SAUDAÇÃO
  profileIconPlaceholder: {
    width: 60, 
    height: 60,
    borderRadius: 30, 
    backgroundColor: '#1ABC9C', 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mascoteImage: {
    width: '100%',
    height: '100%',
  },
  greeting: { fontSize: 20, color: COLORS.SUPPORT_WHITE, fontWeight: 'normal', marginLeft: 15 },
  name: { color: COLORS.ACTION_GREEN, fontWeight: 'bold' },

  // ESTILOS DO AVATAR DO MASCOTE
  mascoteProfileIcon: {
      width: 60,  // Definimos o tamanho igual ao do ícone anterior (size=30)
      height: 50, // Definimos o tamanho igual ao do ícone anterior (size=30)
      borderRadius: 10,
      marginRight: 10, // Dica: Use um raio de borda para que pareça um Avatar de perfil!
    },
  
  // --- Card de Saldo ---
  balanceCard: { backgroundColor: COLORS.PRIMARY_DARK, borderRadius: 10, padding: 20, marginBottom: 20, position: 'relative' },
  balanceLabel: { color: COLORS.SUPPORT_WHITE, fontSize: 16, marginBottom: 5, opacity: 0.7 },
  balanceValue: { fontSize: 32, fontWeight: 'bold', color: COLORS.HIGHLIGHT_GOLD },
  toggleIconContainer: { position: 'absolute', top: 15, right: 20, padding: 5 },
  cloudIcon: { opacity: 0.8, color: COLORS.SUPPORT_WHITE },
  
  // --- Favoritos (Menu Rápido) ---
  sectionContainer: { backgroundColor: COLORS.PRIMARY_DARK, borderRadius: 10, padding: 15, marginBottom: 20 },
  sectionTitle: { color: COLORS.SUPPORT_WHITE, fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  favoritesRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }, 
  favoriteCard: { alignItems: 'center', width: '30%', marginBottom: 15 }, 
  favoriteIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  favoriteText: { color: COLORS.SUPPORT_WHITE, fontSize: 12, textAlign: 'center' },
  
  // ESTILOS DO BOTÃO DE TOGGLE
  scrollDownIndicator: { alignItems: 'center', marginTop: 10, padding: 5 },
  
  // --- Sino de Ouro (Alertas) ---
  goldBellContainer: { paddingVertical: 10 },
  goldBellHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  goldBellTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.HIGHLIGHT_GOLD, marginRight: 10 },
  alertCard: { paddingVertical: 15 },
  alertTitle: { fontSize: 16, color: COLORS.SUPPORT_WHITE },
  alertRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 5 },
  alertDate: { fontSize: 12, color: COLORS.ACTION_GREEN },
  alertValueStatus: { flexDirection: 'row', alignItems: 'center' },
  alertValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.SUPPORT_WHITE, marginRight: 10 },
  alertStatusButton: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 15 },
  alertStatusText: { color: COLORS.PRIMARY_DARK, fontWeight: 'bold', fontSize: 12 },
  alertDivider: { height: 1, backgroundColor: COLORS.SUPPORT_WHITE, opacity: 0.1, marginTop: 15 },
});