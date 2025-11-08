import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../styles/colors'; 
import type { StackNavigationProp } from '@react-navigation/stack';

// --- (Componente Principal) ---

// 1. ✨ NOVA API ✨ - Gratuita e sem token
const API_URL = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL';

// --- (Interfaces e Componente QuoteCard não mudam) ---
interface QuoteItem {
  symbol: string;
  shortName?: string;
  regularMarketPrice?: number;
  regularMarketChangePercent?: number;
}

interface QuoteCardProps {
  item: QuoteItem;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ item }) => {
  const varPercent = item.regularMarketChangePercent ?? 0;
  const varColor = varPercent >= 0 
    ? COLORS.ACTION_GREEN 
    : COLORS.ATTENTION_RED; 

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.shortName ?? item.symbol}</Text>
        <Text style={styles.cardSymbol}>{item.symbol}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardPrice}>
          R$ {(item.regularMarketPrice ?? 0).toFixed(2)}
        </Text>
        <Text style={[styles.cardChange, { color: varColor }]}>
          {varPercent.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

// --- (Tipagem da tela) ---
type CotacaoScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function CotacaoScreen({ navigation }: CotacaoScreenProps) {
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  // 2. ✨ FUNÇÃO fetchQuotes ATUALIZADA ✨
  const fetchQuotes = async () => {
    setLoading(true);
    setError(null);
    try {
      // 3. O fetch agora é simples, sem 'headers' ou 'token'
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Erro de rede: ${response.status}`);
      }

      const data = await response.json();

      // 4. A AwesomeAPI retorna um objeto (ex: { USDBRL: {...}, EURBRL: {...} })
      // Vamos transformar esse objeto em um array que o nosso QuoteCard entende
      
      // Checa se a API retornou um erro (ex: { status: 404, message: "..." })
      if (data.status) {
        throw new Error(data.message || 'Cotação não encontrada');
      }

      // Converte o objeto de objetos em um array: [ {...}, {...}, {...} ]
      const resultsArray = Object.values(data);

      // 5. Mapeia os dados da API para o formato que nosso app espera
      const formattedQuotes: QuoteItem[] = resultsArray.map((item: any) => ({
        symbol: `${item.code}-${item.codein}`,
        shortName: item.name,
        regularMarketPrice: parseFloat(item.bid), // 'bid' é o preço de compra
        regularMarketChangePercent: parseFloat(item.pctChange), // 'pctChange' é a variação
      }));
      
      setQuotes(formattedQuotes);

    } catch (e: any) {
      setError('Falha ao buscar dados. Verifique sua conexão.');
      console.error(e); 
    } finally {
      setLoading(false);
    }
  };

  // --- (O resto do componente não muda) ---
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={COLORS.HIGHLIGHT_GOLD} style={styles.centered} />;
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchQuotes} style={styles.retryButton}>
            <Text style={styles.retryText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={quotes}
        renderItem={({ item }) => <QuoteCard item={item} />}
        keyExtractor={(item) => item.symbol}
        contentContainerStyle={styles.list}
        onRefresh={fetchQuotes} 
        refreshing={loading}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.SUPPORT_WHITE} />
        </TouchableOpacity>
        <Text style={styles.title}>Cotações de Mercado</Text>
        <View style={{ width: 24 }} /> 
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

// --- (Estilos não mudam) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.SUPPORT_WHITE,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: COLORS.ATTENTION_RED,
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: COLORS.HIGHLIGHT_GOLD,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryText: {
    fontWeight: '600',
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8, 
  },
  card: {
    backgroundColor: COLORS.PRIMARY_DARK, 
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: COLORS.SUPPORT_WHITE,
  },
  cardSymbol: {
    fontSize: 14,
    color: COLORS.HIGHLIGHT_GOLD,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  cardPrice: {
    fontWeight: 'bold',
    fontSize: 24,
    color: COLORS.SUPPORT_WHITE,
    flex: 1,
  },
  cardChange: {
    fontWeight: '600',
    fontSize: 18,
  },
});