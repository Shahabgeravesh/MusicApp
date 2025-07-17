import { useState, useEffect, useCallback } from 'react';
import storage, { 
  UserProgress, 
  CompletedLesson, 
  PracticeSession, 
  Achievement, 
  LearningStreak, 
  WeeklyChallenge, 
  QuizResult, 
  AppSettings 
} from '../utils/storage';

export const useAppData = () => {
  // State for all app data
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [completedLessons, setCompletedLessons] = useState<CompletedLesson[]>([]);
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [learningStreak, setLearningStreak] = useState<LearningStreak | null>(null);
  const [weeklyChallenge, setWeeklyChallenge] = useState<WeeklyChallenge | null>(null);
  const [totalPracticeTime, setTotalPracticeTime] = useState(0);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Load all data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [
        progress,
        lessons,
        sessions,
        achievementsData,
        streak,
        challenge,
        practiceTime,
        appSettings,
      ] = await Promise.all([
        storage.getUserProgress(),
        storage.getCompletedLessons(),
        storage.getPracticeSessions(),
        storage.getAchievements(),
        storage.getLearningStreak(),
        storage.getWeeklyChallenge(),
        storage.getTotalPracticeTime(),
        storage.getSettings(),
      ]);

      setUserProgress(progress);
      setCompletedLessons(lessons);
      setPracticeSessions(sessions);
      setAchievements(achievementsData);
      setLearningStreak(streak);
      setWeeklyChallenge(challenge);
      setTotalPracticeTime(practiceTime);
      setSettings(appSettings);
    } catch (error) {
      console.error('Error loading app data:', error);
    } finally {
      setLoading(false);
    }
  };

  // User Progress Actions
  const completeLesson = useCallback(async (lessonId: number, score?: number, timeSpent: number = 0) => {
    try {
      await storage.completeLesson(lessonId, score, timeSpent);
      
      // Reload relevant data
      const [newProgress, newLessons, newAchievements] = await Promise.all([
        storage.getUserProgress(),
        storage.getCompletedLessons(),
        storage.getAchievements(),
      ]);

      setUserProgress(newProgress);
      setCompletedLessons(newLessons);
      setAchievements(newAchievements);

      // Update achievements based on completed lessons
      const noteLessons = newLessons.filter(lesson => 
        [3, 4, 5].includes(lesson.lessonId) // Note-related lessons
      ).length;
      
      const scaleLessons = newLessons.filter(lesson => 
        [7, 8, 9].includes(lesson.lessonId) // Scale-related lessons
      ).length;

      await Promise.all([
        storage.updateAchievement('first_lesson', newLessons.length),
        storage.updateAchievement('note_reader', noteLessons),
        storage.updateAchievement('scale_master', scaleLessons),
      ]);

      // Reload achievements
      const updatedAchievements = await storage.getAchievements();
      setAchievements(updatedAchievements);

      return true;
    } catch (error) {
      console.error('Error completing lesson:', error);
      return false;
    }
  }, []);

  // Practice Session Actions
  const addPracticeSession = useCallback(async (
    type: 'rhythm' | 'notes' | 'scales' | 'chords',
    duration: number,
    questionsAnswered: number,
    correctAnswers: number,
    score?: number
  ) => {
    try {
      await storage.addPracticeSession({
        type,
        duration,
        questionsAnswered,
        correctAnswers,
        score,
      });

      // Reload relevant data
      const [newSessions, newPracticeTime, newStreak, newChallenge] = await Promise.all([
        storage.getPracticeSessions(),
        storage.getTotalPracticeTime(),
        storage.getLearningStreak(),
        storage.getWeeklyChallenge(),
      ]);

      setPracticeSessions(newSessions);
      setTotalPracticeTime(newPracticeTime);
      setLearningStreak(newStreak);
      setWeeklyChallenge(newChallenge);

      // Update achievements
      await storage.updateAchievement('rhythm_king', newSessions.length);
      await storage.updateAchievement('week_warrior', newStreak.currentStreak);

      // Reload achievements
      const updatedAchievements = await storage.getAchievements();
      setAchievements(updatedAchievements);

      return true;
    } catch (error) {
      console.error('Error adding practice session:', error);
      return false;
    }
  }, []);

  // Quiz Actions
  const addQuizResult = useCallback(async (
    quizId: string,
    score: number,
    totalQuestions: number,
    correctAnswers: number,
    timeSpent: number
  ) => {
    try {
      await storage.addQuizResult({
        quizId,
        score,
        totalQuestions,
        correctAnswers,
        timeSpent,
      });

      // Update quiz champion achievement if score is 100%
      if (score === 100) {
        const quizResults = await storage.getQuizResults();
        const perfectScores = quizResults.filter(result => result.score === 100).length;
        await storage.updateAchievement('quiz_champion', perfectScores);
        
        // Reload achievements
        const updatedAchievements = await storage.getAchievements();
        setAchievements(updatedAchievements);
      }

      return true;
    } catch (error) {
      console.error('Error adding quiz result:', error);
      return false;
    }
  }, []);

  // Settings Actions
  const updateSettings = useCallback(async (newSettings: Partial<AppSettings>) => {
    try {
      await storage.updateSettings(newSettings);
      const updatedSettings = await storage.getSettings();
      setSettings(updatedSettings);
      return true;
    } catch (error) {
      console.error('Error updating settings:', error);
      return false;
    }
  }, []);

  // Data Management Actions
  const clearAllData = useCallback(async () => {
    try {
      await storage.clearAllData();
      await loadAllData(); // Reload with default values
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }, []);

  const exportData = useCallback(async () => {
    try {
      return await storage.exportData();
    } catch (error) {
      console.error('Error exporting data:', error);
      return '';
    }
  }, []);

  const importData = useCallback(async (jsonData: string) => {
    try {
      const success = await storage.importData(jsonData);
      if (success) {
        await loadAllData(); // Reload with imported data
      }
      return success;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }, []);

  // Computed values
  const progressPercentage = userProgress 
    ? (userProgress.completedLessons / userProgress.totalLessons) * 100 
    : 0;

  const recentLessons = completedLessons
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, 3);

  const thisWeekSessions = practiceSessions.filter(session => {
    const sessionDate = new Date(session.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sessionDate >= weekAgo;
  });

  const unlockedAchievements = achievements.filter(achievement => achievement.unlocked);

  return {
    // Data
    userProgress,
    completedLessons,
    practiceSessions,
    achievements,
    learningStreak,
    weeklyChallenge,
    totalPracticeTime,
    settings,
    loading,

    // Computed values
    progressPercentage,
    recentLessons,
    thisWeekSessions,
    unlockedAchievements,

    // Actions
    completeLesson,
    addPracticeSession,
    addQuizResult,
    updateSettings,
    clearAllData,
    exportData,
    importData,
    refreshData: loadAllData,
  };
}; 