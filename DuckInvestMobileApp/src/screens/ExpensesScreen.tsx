import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';

const ExpensesScreen: React.FC = () => {
  const { expenses } = useExpenses();
  const [filter, setFilter] = useState('Todas');

  const filteredExpenses = filter === 'Todas' ? expenses : expenses.filter(expense => expense.category === filter);

  const renderExpense = ({ item }: { item: any }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseCategory}>{item.category}</Text>
      <Text style={styles.expenseDescription}>{item.description}</Text>
      <Text style={styles.expenseValue}>R$ {item.value.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['Todas', 'Alimentação', 'Lazer'].map(cat => (
          <TouchableOpacity key={cat} onPress={() => setFilter(cat)} style={filter === cat ? styles.activeFilter : styles.filter}>
            <Text style={filter === cat ? styles.activeFilterText : styles.filterText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredExpenses}
        renderItem={renderExpense}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filter: {
    backgroundColor: '#34495E',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  activeFilter: {
    backgroundColor: '#F39C12',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  filterText: {
    color: '#FFFFFF',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
});

export default ExpensesScreen;
