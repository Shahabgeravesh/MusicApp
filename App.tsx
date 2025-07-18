import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { I18nManager } from 'react-native';
import i18n from './src/i18n';

import HomeScreen from './src/screens/HomeScreen';
import LessonsScreen from './src/screens/LessonsScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import QuizScreen from './src/screens/QuizScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.getLocale());
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Listen for language changes
  useEffect(() => {
    const unsubscribe = i18n.onLanguageChange(() => {
      const newLocale = i18n.getLocale();
      setCurrentLanguage(newLocale);
      
      // Force re-render of the entire app
      setForceUpdate(prev => prev + 1);
      
      // Handle RTL layout changes
      if (newLocale === 'fa' && !I18nManager.isRTL) {
        I18nManager.forceRTL(true);
      } else if (newLocale === 'en' && I18nManager.isRTL) {
        I18nManager.forceRTL(false);
      }
    });
    
    return unsubscribe;
  }, []);
  
  const getTabTitle = (key: string) => {
    const titles = {
      home: i18n.t('navigation.home'),
      lessons: i18n.t('navigation.lessons'),
      practice: i18n.t('navigation.practice'),
      quiz: i18n.t('navigation.quiz'),
      settings: i18n.t('navigation.settings'),
    };
    return titles[key as keyof typeof titles] || key;
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          key={`${currentLanguage}-${forceUpdate}`} // Force re-render when language changes
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