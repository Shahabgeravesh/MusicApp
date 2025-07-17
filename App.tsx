import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import i18n from './src/i18n';

import HomeScreen from './src/screens/HomeScreen';
import LessonsScreen from './src/screens/LessonsScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import QuizScreen from './src/screens/QuizScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.locale);
  
  // Listen for language changes
  useEffect(() => {
    const checkLanguage = () => {
      if (i18n.locale !== currentLanguage) {
        setCurrentLanguage(i18n.locale);
      }
    };
    
    // Check language every second (simple polling approach)
    const interval = setInterval(checkLanguage, 100);
    return () => clearInterval(interval);
  }, [currentLanguage]);
  
  const getTabTitle = (key: string) => {
    const titles = {
      home: currentLanguage === 'fa' ? 'خانه' : 'Home',
      lessons: currentLanguage === 'fa' ? 'درس‌ها' : 'Lessons',
      practice: currentLanguage === 'fa' ? 'تمرین' : 'Practice',
      quiz: currentLanguage === 'fa' ? 'آزمون' : 'Quiz',
      settings: currentLanguage === 'fa' ? 'تنظیمات' : 'Settings',
    };
    return titles[key as keyof typeof titles] || key;
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          key={currentLanguage} // Force re-render when language changes
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'home';
              
              // Platform-specific icon selection following iOS and Android guidelines
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Lessons') {
                iconName = focused ? 'library' : 'library-outline';
              } else if (route.name === 'Practice') {
                iconName = focused ? 'musical-notes' : 'musical-notes-outline';
              } else if (route.name === 'Quiz') {
                iconName = focused ? 'help-circle' : 'help-circle-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: '#6200ee',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: getTabTitle('home') }}
          />
          <Tab.Screen 
            name="Lessons" 
            component={LessonsScreen}
            options={{ title: getTabTitle('lessons') }}
          />
          <Tab.Screen 
            name="Practice" 
            component={PracticeScreen}
            options={{ title: getTabTitle('practice') }}
          />
          <Tab.Screen 
            name="Quiz" 
            component={QuizScreen}
            options={{ title: getTabTitle('quiz') }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ title: getTabTitle('settings') }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
} 