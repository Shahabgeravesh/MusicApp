import React, { createContext, useContext, ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Lessons: undefined;
  Practice: undefined;
  Quiz: undefined;
  Settings: undefined;
  LessonDetail: { lessonId: number };
  PracticeActivity: { type: string };
  QuizActivity: { category: string };
};

type NavigationContextType = {
  navigateToLessons: () => void;
  navigateToPractice: () => void;
  navigateToQuiz: () => void;
  navigateToSettings: () => void;
  navigateToLesson: (lessonId: number) => void;
  navigateToPracticeActivity: (type: string) => void;
  navigateToQuizActivity: (category: string) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToLessons = () => {
    navigation.navigate('Lessons');
  };

  const navigateToPractice = () => {
    navigation.navigate('Practice');
  };

  const navigateToQuiz = () => {
    navigation.navigate('Quiz');
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  const navigateToLesson = (lessonId: number) => {
    navigation.navigate('LessonDetail', { lessonId });
  };

  const navigateToPracticeActivity = (type: string) => {
    navigation.navigate('PracticeActivity', { type });
  };

  const navigateToQuizActivity = (category: string) => {
    navigation.navigate('QuizActivity', { category });
  };

  const value: NavigationContextType = {
    navigateToLessons,
    navigateToPractice,
    navigateToQuiz,
    navigateToSettings,
    navigateToLesson,
    navigateToPracticeActivity,
    navigateToQuizActivity,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}; 