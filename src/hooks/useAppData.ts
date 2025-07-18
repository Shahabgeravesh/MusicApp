// @ts-ignore
/* global console */
import { useState, useEffect, useCallback } from 'react';
import storage, { 
  UserProgress, 
  CompletedLesson, 
  PracticeSession, 
  Achievement, 
  LearningStreak, 
  WeeklyChallenge, 
  AppSettings,
} from '../utils/storage';
import { ChallengeSystem } from '../utils/challengeSystem';

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

      // Update weekly challenge progress
      await updateWeeklyChallengeProgress();

      return true;
    } catch (error) {
      console.error('Error adding quiz result:', error);
      return false;
    }
  }, []);

  // Challenge Actions
  const updateWeeklyChallengeProgress = useCallback(async () => {
    try {
      const currentChallenge = await storage.getWeeklyChallenge();
      if (!currentChallenge) return;

      // Check if we need to generate a new challenge
      const isActive = ChallengeSystem.isChallengeActive(currentChallenge);
      if (!isActive) {
        const newChallenge = ChallengeSystem.generateWeeklyChallenge();
        await storage.updateWeeklyChallengeFull(newChallenge);
        setWeeklyChallenge(newChallenge);
        return;
      }

      // Calculate progress based on challenge type
      let newCurrent = currentChallenge.current;
      
      switch (currentChallenge.type) {
        case 'practice':
          // Count practice sessions this week
          const weekSessions = practiceSessions.filter(session => {
            const sessionDate = new Date(session.date);
            const startDate = new Date(currentChallenge.startDate);
            const endDate = new Date(currentChallenge.endDate);
            return sessionDate >= startDate && sessionDate <= endDate;
          });
          newCurrent = weekSessions.length;
          break;
          
        case 'quiz':
          // Count high-scoring quizzes this week
          const quizResults = await storage.getQuizResults();
          const weekQuizzes = quizResults.filter(result => {
            const resultDate = new Date(result.date);
            const startDate = new Date(currentChallenge.startDate);
            const endDate = new Date(currentChallenge.endDate);
            return resultDate >= startDate && resultDate <= endDate && result.score >= 80;
          });
          newCurrent = weekQuizzes.length;
          break;
          
        case 'streak':
          // Use current learning streak
          newCurrent = learningStreak?.currentStreak || 0;
          break;
          
        case 'exploration':
          // Count new lessons completed this week
          const weekLessons = completedLessons.filter(lesson => {
            const lessonDate = new Date(lesson.completedAt);
            const startDate = new Date(currentChallenge.startDate);
            const endDate = new Date(currentChallenge.endDate);
            return lessonDate >= startDate && lessonDate <= endDate;
          });
          newCurrent = weekLessons.length;
          break;
          
        case 'mastery':
          // Count high-accuracy practice sessions
          const masterySessions = practiceSessions.filter(session => {
            const sessionDate = new Date(session.date);
            const startDate = new Date(currentChallenge.startDate);
            const endDate = new Date(currentChallenge.endDate);
            return sessionDate >= startDate && sessionDate <= endDate && 
                   session.score && session.score >= 95;
          });
          newCurrent = masterySessions.length;
          break;
      }

      // Update challenge progress
      const updatedChallenge = {
        ...currentChallenge,
        current: Math.min(newCurrent, currentChallenge.target),
        progress: Math.min((newCurrent / currentChallenge.target) * 100, 100),
        completed: newCurrent >= currentChallenge.target,
      };

      await storage.updateWeeklyChallengeFull(updatedChallenge);
      setWeeklyChallenge(updatedChallenge);

      // Award points and badge if completed
      if (updatedChallenge.completed && !currentChallenge.completed) {
        // Update user points (you might want to add this to storage)
        console.log(`Challenge completed! Awarded ${updatedChallenge.reward.points} points`);
        
        // Update achievement if there's a badge
        if (updatedChallenge.reward.badge) {
          await storage.updateAchievement(updatedChallenge.reward.badge, 1);
          const updatedAchievements = await storage.getAchievements();
          setAchievements(updatedAchievements);
        }
      }
    } catch (error) {
      console.error('Error updating weekly challenge progress:', error);
    }
  }, [practiceSessions, completedLessons, learningStreak]);

  const completeWeeklyChallenge = useCallback(async () => {
    try {
      const currentChallenge = await storage.getWeeklyChallenge();
      if (!currentChallenge) return;

      const updatedChallenge = {
        ...currentChallenge,
        completed: true,
        progress: 100,
      };

      await storage.updateWeeklyChallengeFull(updatedChallenge);
      setWeeklyChallenge(updatedChallenge);

      return true;
    } catch (error) {
      console.error('Error completing weekly challenge:', error);
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
    updateWeeklyChallengeProgress,
    completeWeeklyChallenge,
  };
}; 