import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useExpenses } from '../context/ExpenseContext';

type RootStackParamList = {
  AddExpense: undefined;
  Dashboard: undefined;
};

type AddExpenseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddExpense'>;

const AddExpenseScreen: React.FC = () => {
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation<AddExpenseScreenNavigationProp>();
  const { addExpense } = useExpenses();

  const handleSave = () => {
    if (value && date && category && description) {
      const newExpense = {
        id: Date.now().toString(),
        value: parseFloat(value),
        date,
        category,
        description,
      };
      addExpense(newExpense);
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Despesa</Text>
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Data"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
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
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#34495E',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  cancelButton: {
    backgroundColor: '#95A5A6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: '#F39C12',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default AddExpenseScreen;
