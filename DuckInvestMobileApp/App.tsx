import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { ExpenseProvider } from './src/context/ExpenseContext';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import ExpensesScreen from './src/screens/ExpensesScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import InsightsScreen from './src/screens/InsightsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Despesas" component={ExpensesScreen} />
      <Tab.Screen name="Relatórios" component={ReportsScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Configurações" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={TabNavigator} />
          <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </ExpenseProvider>
  );
}
