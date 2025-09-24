import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';

const InsightsScreen: React.FC = () => {
  const { expenses } = useExpenses();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0);
  const topCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.value;
    return acc;
  }, {} as Record<string, number>);

  const topCategoryName = Object.keys(topCategory).reduce((a, b) => topCategory[a] > topCategory[b] ? a : b, '');
  const topPercentage = totalExpenses > 0 ? (topCategory[topCategoryName] / totalExpenses * 100).toFixed(0) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insights</Text>
      <Text style={styles.percentage}>{topPercentage}%</Text>
      <Text style={styles.subtitle}>Top 3 gastos do mês</Text>
      <Text style={styles.insightText}>
        Você gasta {topPercentage}% do seu orçamento em {topCategoryName}, que tal reduzir?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  percentage: {
    fontSize: 48,
    color: '#F39C12',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#BDC3C7',
    marginBottom: 20,
  },
  insightText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default InsightsScreen;
