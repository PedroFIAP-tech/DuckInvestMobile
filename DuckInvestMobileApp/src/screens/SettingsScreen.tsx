import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Notificações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Privacidade</Text>
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
  option: {
    backgroundColor: '#34495E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default SettingsScreen;
