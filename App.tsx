import React from 'react';
import { StatusBar } from 'expo-status-bar';
import NavegacaoApp from './navigation/NavegacaoApp';

export default function App() {
  return (
    <>
      <NavegacaoApp />
      <StatusBar style="light" />
    </>
  );
}