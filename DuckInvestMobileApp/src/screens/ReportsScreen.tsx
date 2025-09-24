import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useExpenses } from '../context/ExpenseContext';

const screenWidth = Dimensions.get('window').width;

const ReportsScreen: React.FC = () => {
  const { expenses } = useExpenses();

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.value;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    population: value,
    color: '#F39C12',
    legendFontColor: '#FFFFFF',
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>
      <Text style={styles.subtitle}>Top 3 gastos do mês</Text>
      {data.length > 0 ? (
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: '#2C3E50',
            backgroundGradientFrom: '#2C3E50',
            backgroundGradientTo: '#34495E',
            color: (opacity = 1) => `rgba(243, 156, 18, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      ) : (
        <Text style={styles.noData}>Nenhum dado disponível</Text>
      )}
      <View style={styles.converterContainer}>
        <Text style={styles.converterTitle}>Conversor</Text>
        <TextInput style={styles.input} placeholder="1.00" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>USO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#BDC3C7',
    marginBottom: 20,
  },
  noData: {
    color: '#BDC3C7',
    textAlign: 'center',
    marginTop: 50,
  },
  converterContainer: {
    marginTop: 30,
  },
  converterTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#34495E',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#F39C12',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default ReportsScreen;
