// @ts-ignore
/* global console */
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
export const STORAGE_KEYS = {
  USER_PROGRESS: 'user_progress',
  COMPLETED_LESSONS: 'completed_lessons',
  PRACTICE_SESSIONS: 'practice_sessions',
  ACHIEVEMENTS: 'achievements',
  LEARNING_STREAK: 'learning_streak',
  TOTAL_PRACTICE_TIME: 'total_practice_time',
  LAST_ACTIVITY_DATE: 'last_activity_date',
  WEEKLY_CHALLENGE: 'weekly_challenge',
  SETTINGS: 'settings',
  BOOKMARKS: 'bookmarks',
  QUIZ_RESULTS: 'quiz_results',
} as const;

// Data interfaces
export interface UserProgress {
  totalLessons: number;
  completedLessons: number;
  currentLesson: number;
  lastActivityDate: string;
}

export interface CompletedLesson {
  lessonId: number;
  completedAt: string;
  score?: number;
  timeSpent: number; // in minutes
}

export interface PracticeSession {
  id: string;
  date: string;
  duration: number; // in minutes
  type: 'rhythm' | 'notes' | 'scales' | 'chords';
  score?: number;
  questionsAnswered: number;
  correctAnswers: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0-100
  maxProgress: number;
}

export interface LearningStreak {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'practice' | 'quiz' | 'streak' | 'exploration' | 'mastery';
  difficulty: 'easy' | 'medium' | 'hard';
  target: number;
  current: number;
  reward: {
    points: number;
    badge?: string;
    title?: string;
  };
  strategy: string;
  tips: string[];
  startDate: string;
  endDate: string;
  completed: boolean;
  progress: number;
}

export interface QuizResult {
  quizId: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
}

export interface AppSettings {
  language: 'en' | 'fa';
  notifications: boolean;
  sound: boolean;
  autoplay: boolean;
  theme: 'light' | 'dark';
}

// Storage utility class
class StorageManager {
  // Generic storage methods
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  }

  async getItem<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return defaultValue;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  }

  // User Progress Methods
  async getUserProgress(): Promise<UserProgress> {
    return this.getItem(STORAGE_KEYS.USER_PROGRESS, {
      totalLessons: 14,
      completedLessons: 0,
      currentLesson: 0,
      lastActivityDate: new Date().toISOString(),
    });
  }

  async updateUserProgress(progress: Partial<UserProgress>): Promise<void> {
    const current = await this.getUserProgress();
    const updated = { ...current, ...progress };
    await this.setItem(STORAGE_KEYS.USER_PROGRESS, updated);
  }

  async completeLesson(lessonId: number, score?: number, timeSpent: number = 0): Promise<void> {
    // Update user progress
    const progress = await this.getUserProgress();
    const completedLessons = await this.getCompletedLessons();
    
    // Check if lesson is already completed
    const isAlreadyCompleted = completedLessons.some(lesson => lesson.lessonId === lessonId);
    
    if (!isAlreadyCompleted) {
      // Add to completed lessons
      const newCompletedLesson: CompletedLesson = {
        lessonId,
        completedAt: new Date().toISOString(),
        score,
        timeSpent,
      };
      
      await this.setItem(STORAGE_KEYS.COMPLETED_LESSONS, [
        ...completedLessons,
        newCompletedLesson,
      ]);

      // Update progress
      await this.updateUserProgress({
        completedLessons: progress.completedLessons + 1,
        currentLesson: Math.max(progress.currentLesson, lessonId + 1),
        lastActivityDate: new Date().toISOString(),
      });

      // Update learning streak
      await this.updateLearningStreak();
    }
  }

  async getCompletedLessons(): Promise<CompletedLesson[]> {
    return this.getItem(STORAGE_KEYS.COMPLETED_LESSONS, []);
  }

  // Practice Sessions Methods
  async addPracticeSession(session: Omit<PracticeSession, 'id' | 'date'>): Promise<void> {
    const sessions = await this.getPracticeSessions();
    const newSession: PracticeSession = {
      ...session,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    await this.setItem(STORAGE_KEYS.PRACTICE_SESSIONS, [...sessions, newSession]);
    
    // Update total practice time
    const currentTime = await this.getTotalPracticeTime();
    await this.setItem(STORAGE_KEYS.TOTAL_PRACTICE_TIME, currentTime + session.duration);
    
    // Update learning streak
    await this.updateLearningStreak();
  }

  async getPracticeSessions(): Promise<PracticeSession[]> {
    return this.getItem(STORAGE_KEYS.PRACTICE_SESSIONS, []);
  }

  async getTotalPracticeTime(): Promise<number> {
    return this.getItem(STORAGE_KEYS.TOTAL_PRACTICE_TIME, 0);
  }

  // Learning Streak Methods
  async getLearningStreak(): Promise<LearningStreak> {
    return this.getItem(STORAGE_KEYS.LEARNING_STREAK, {
      currentStreak: 0,
      longestStreak: 0,
      lastPracticeDate: '',
    });
  }

  async updateLearningStreak(): Promise<void> {
    const today = new Date().toDateString();
    const streak = await this.getLearningStreak();
    
    if (streak.lastPracticeDate === today) {
      return; // Already practiced today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    let newStreak = streak.currentStreak;
    
    if (streak.lastPracticeDate === yesterdayString) {
      // Consecutive day
      newStreak += 1;
    } else if (streak.lastPracticeDate !== today) {
      // Break in streak
      newStreak = 1;
    }

    const updatedStreak: LearningStreak = {
      currentStreak: newStreak,
      longestStreak: Math.max(streak.longestStreak, newStreak),
      lastPracticeDate: today,
    };

    await this.setItem(STORAGE_KEYS.LEARNING_STREAK, updatedStreak);
  }

  // Achievements Methods
  async getAchievements(): Promise<Achievement[]> {
    const defaultAchievements: Achievement[] = [
      {
        id: 'first_lesson',
        title: 'First Steps',
        description: 'Complete your first lesson',
        emoji: '🎵',
        unlocked: false,
        progress: 0,
        maxProgress: 1,
      },
      {
        id: 'note_reader',
        title: 'Note Reader',
        description: 'Complete 5 lessons about notes',
        emoji: '📖',
        unlocked: false,
        progress: 0,
        maxProgress: 5,
      },
      {
        id: 'scale_master',
        title: 'Scale Master',
        description: 'Complete all scale lessons',
        emoji: '🎼',
        unlocked: false,
        progress: 0,
        maxProgress: 3,
      },
      {
        id: 'rhythm_king',
        title: 'Rhythm King',
        description: 'Complete 10 practice sessions',
        emoji: '🥁',
        unlocked: false,
        progress: 0,
        maxProgress: 10,
      },
      {
        id: 'week_warrior',
        title: 'Week Warrior',
        description: 'Practice for 7 consecutive days',
        emoji: '🔥',
        unlocked: false,
        progress: 0,
        maxProgress: 7,
      },
      {
        id: 'quiz_champion',
        title: 'Quiz Champion',
        description: 'Score 100% on 5 quizzes',
        emoji: '🏆',
        unlocked: false,
        progress: 0,
        maxProgress: 5,
      },
    ];

    return this.getItem(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements);
  }

  async updateAchievement(achievementId: string, progress: number): Promise<void> {
    const achievements = await this.getAchievements();
    const achievementIndex = achievements.findIndex(a => a.id === achievementId);
    
    if (achievementIndex !== -1) {
      const achievement = achievements[achievementIndex];
      const newProgress = Math.min(progress, achievement.maxProgress);
      const wasUnlocked = achievement.unlocked;
      
      achievements[achievementIndex] = {
        ...achievement,
        progress: newProgress,
        unlocked: newProgress >= achievement.maxProgress,
        unlockedAt: newProgress >= achievement.maxProgress && !wasUnlocked 
          ? new Date().toISOString() 
          : achievement.unlockedAt,
      };
      
      await this.setItem(STORAGE_KEYS.ACHIEVEMENTS, achievements);
    }
  }

  // Weekly Challenge Methods
  async getWeeklyChallenge(): Promise<WeeklyChallenge> {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return this.getItem(STORAGE_KEYS.WEEKLY_CHALLENGE, {
      id: `week_${startOfWeek.getTime()}`,
      title: 'Rhythm Master',
      description: 'Complete 5 rhythm practice sessions this week',
      type: 'practice',
      difficulty: 'easy',
      target: 5,
      current: 0,
      reward: {
        points: 100,
        badge: 'rhythm_master',
        title: 'Rhythm Master'
      },
      strategy: 'Practice rhythm exercises for 5-10 minutes daily. Focus on different time signatures and note values.',
      tips: [
        'Start with simple 4/4 rhythms',
        'Use a metronome to keep steady tempo',
        'Practice clapping before playing',
        'Try different note combinations',
        'Record yourself to track improvement'
      ],
      startDate: startOfWeek.toISOString(),
      endDate: endOfWeek.toISOString(),
      completed: false,
      progress: 0,
    });
  }

  async updateWeeklyChallenge(progress: number): Promise<void> {
    const challenge = await this.getWeeklyChallenge();
    const updatedChallenge = {
      ...challenge,
      current: Math.min(progress, challenge.target),
      completed: progress >= challenge.target,
    };
    
    await this.setItem(STORAGE_KEYS.WEEKLY_CHALLENGE, updatedChallenge);
  }

  async updateWeeklyChallengeFull(challenge: WeeklyChallenge): Promise<void> {
    await this.setItem(STORAGE_KEYS.WEEKLY_CHALLENGE, challenge);
  }

  // Quiz Results Methods
  async addQuizResult(result: Omit<QuizResult, 'date'>): Promise<void> {
    const results = await this.getQuizResults();
    const newResult: QuizResult = {
      ...result,
      date: new Date().toISOString(),
    };
    
    await this.setItem(STORAGE_KEYS.QUIZ_RESULTS, [...results, newResult]);
  }

  async getQuizResults(): Promise<QuizResult[]> {
    return this.getItem(STORAGE_KEYS.QUIZ_RESULTS, []);
  }

  // Settings Methods
  async getSettings(): Promise<AppSettings> {
    return this.getItem(STORAGE_KEYS.SETTINGS, {
      language: 'en',
      notifications: true,
      sound: true,
      autoplay: false,
      theme: 'light',
    });
  }

  async updateSettings(settings: Partial<AppSettings>): Promise<void> {
    const current = await this.getSettings();
    const updated = { ...current, ...settings };
    await this.setItem(STORAGE_KEYS.SETTINGS, updated);
  }

  // Utility Methods
  async clearAllData(): Promise<void> {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }

  async exportData(): Promise<string> {
    try {
      const data: Record<string, any> = {};
      const keys = Object.values(STORAGE_KEYS);
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          data[key] = JSON.parse(value);
        }
      }
      
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      return '';
    }
  }

  async importData(jsonData: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonData);
      const entries = Object.entries(data);
      
      for (const [key, value] of entries) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }
      
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

export const storage = new StorageManager();
export default storage; 