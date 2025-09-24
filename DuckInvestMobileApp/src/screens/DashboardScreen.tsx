import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useExpenses } from '../context/ExpenseContext';

type RootStackParamList = {
  Dashboard: undefined;
  AddExpense: undefined;
};

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { expenses } = useExpenses();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0);
  const recentExpenses = expenses.slice(-3);

  const renderExpense = ({ item }: { item: any }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseCategory}>{item.category}</Text>
      <Text style={styles.expenseDescription}>{item.description}</Text>
      <Text style={styles.expenseValue}>R$ {item.value.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Olá, Maria</Text>
      <Text style={styles.expensesTitle}>Despesas neste mês</Text>
      <Text style={styles.expensesAmount}>R$ {totalExpenses.toFixed(2)}</Text>
      <Text style={styles.recentTitle}>Recente despesas</Text>
      <FlatList
        data={recentExpenses}
        renderItem={renderExpense}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddExpense')}>
        <Text style={styles.addButtonText}>+ Adicionar despesa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  expensesTitle: {
    fontSize: 16,
    color: '#BDC3C7',
    marginBottom: 10,
  },
  expensesAmount: {
    fontSize: 32,
    color: '#F39C12',
    marginBottom: 30,
  },
  recentTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  list: {
    flex: 1,
  },
  expenseItem: {
    backgroundColor: '#34495E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  expenseCategory: {
    color: '#F39C12',
    fontSize: 16,
  },
  expenseDescription: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  expenseValue: {
    color: '#BDC3C7',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#F39C12',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default DashboardScreen;
