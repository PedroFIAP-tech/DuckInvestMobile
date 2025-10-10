import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
// Importação dos ícones vetoriais
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors'; // Reutiliza as cores

import MascotePlaceholder from '../assets/duckbill.png'; 

// Se o seu GlobalHeader for um componente separado, importe-o aqui:
// import GlobalHeader from '../components/GlobalHeader'; 


// --- DADOS MOCK DO PERFIL ---
const profileData = {
    rm: '#559250', 
    name: 'Donald McDuck', 
    level: 'Poupador Iniciante', // Simula o badge de gamificação
};


// --- TELA DE PERFIL ---
export default function TelaPerfil() {
    // Estado para armazenar o URI da foto de perfil (vazio inicialmente, carrega o mascote)
    const [userAvatarUri, setUserAvatarUri] = useState<string | null>(null); 
    
    // Simulação da função para abrir galeria/câmera (A ser implementada com Expo ImagePicker)
    const handleAvatarUpload = () => {
        console.log('Abrindo galeria para o usuário escolher a foto...');
        // Aqui você chamaria o ImagePicker e, em seguida, faria:
        // setUserAvatarUri('link_da_nova_foto_do_usuario.jpg'); 
    };

    return ( 
        <SafeAreaView style={styles.safeArea}>
            {/* O HEADER GLOBAL VAI AQUI (se for necessário) */}
            {/* <GlobalHeader /> */}
            
            <View style={styles.container}>
                
                {/* ÁREA SUPERIOR DO PERFIL (Fundo Cinza/Verde) */}
                <View style={styles.profileHeader}>
                    
                    {/* BOTÃO DE EDITAR GERAL (Lápis superior direito) */}
                    <TouchableOpacity style={styles.editButton}>
                        <MaterialCommunityIcons name="pencil" size={24} color={COLORS.HIGHLIGHT_GOLD} />
                    </TouchableOpacity>
                    
                    {/* AVATAR/FOTO DO USUÁRIO CENTRAL */}
                    <View style={styles.avatarWrapper}>
                        
                        {/* Lógica: Se tem foto, mostra a foto. Senão, mostra o mascote placeholder. */}
                        {userAvatarUri ? (
                            <Image
                                source={{ uri: userAvatarUri }} 
                                style={styles.userAvatarImage} 
                            />
                        ) : (
                            <Image
                                source={MascotePlaceholder} // Mascote é o fallback
                                style={styles.userAvatarImage} 
                                resizeMode="contain"
                            />
                        )}
                        
                        {/* Ícone de editar pequeno (BOTÃO DE UPLOAD) */}
                        <TouchableOpacity style={styles.avatarEditOverlay} onPress={handleAvatarUpload}>
                            <MaterialCommunityIcons name="pencil" size={20} color={COLORS.PRIMARY_DARK} />
                        </TouchableOpacity>
                    </View>
                    
                    {/* DADOS DO USUÁRIO (RM e Nome/Nível) */}
                    <View style={styles.userInfoContainer}>
                        {/* ID (Esquerda) */}
                        <Text style={styles.userIdText}>
                            id {profileData.rm}
                        </Text>

                        {/* Nome e Nível (Direita) */}
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

                {/* CONTEÚDO RESTANTE (Opções de Conta, Configurações, etc.) */}
                <ScrollView style={styles.contentContainer}>
                    <Text style={styles.sectionTitle}>Opções da Conta</Text>
                    {/* Adicionar botões de navegação para: Segurança, Histórico, Ajuda */}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}


// --- Estilos Específicos para a Tela de Perfil ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#0A192F' }, 
    container: { flex: 1, backgroundColor: '#0A192F' },
    
    // --- ESTILOS DO CABEÇALHO (Área do Mascote) ---
    profileHeader: {
        height: 250,
        backgroundColor: '#1ABC9C50', 
        alignItems: 'center',
        paddingTop: 30,
        position: 'relative',
    },
    editButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
    },

    // Wrapper para a Foto/Avatar
    avatarWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.ACTION_GREEN || '#1ABC9C', 
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', 
        marginBottom: 15,
        borderWidth: 3, 
        borderColor: COLORS.HIGHLIGHT_GOLD || '#BFA15A', // Borda Dourada
    },
    
    // Estilos da Imagem
    userAvatarImage: {
        width: '100%',
        height: '100%',
    },
    
    avatarEditOverlay: {
        position: 'absolute',
        top: 0, 
        right: 0,
        backgroundColor: COLORS.HIGHLIGHT_GOLD || '#BFA15A', // Fundo Dourado do Lápis
        borderRadius: 12,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateX: 10 }, { translateY: -5 }],
    },
    
    // --- ESTILOS DA INFORMAÇÃO DO USUÁRIO ---
    userInfoContainer: {
        position: 'absolute',
        bottom: 20, 
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between', // ID na esquerda, Nome/Nível na direita
        alignItems: 'flex-start',
    },
    userIdText: {
        fontSize: 14,
        color: COLORS.SUPPORT_WHITE || '#F0F2F5',
        opacity: 0.7,
    },
    nameLevelWrapper: {
        alignItems: 'flex-end', // Alinha Nome e Nível à direita
    },
    userNameText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.ACTION_GREEN || '#1ABC9C',
    },
    userLevelText: {
        fontSize: 16,
        color: COLORS.SUPPORT_WHITE || '#F0F2F5',
        marginTop: 5,
    },
    
    // --- ESTILOS DO CONTEÚDO RESTANTE ---
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.SUPPORT_WHITE || '#F0F2F5',
        marginBottom: 15,
    }
});