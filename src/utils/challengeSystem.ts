import { Platform } from 'react-native';

export interface Challenge {
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
  progress: number; // 0-100
}

export interface ChallengeReward {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

// Challenge templates for different weeks
export const challengeTemplates: Omit<Challenge, 'id' | 'current' | 'completed' | 'progress' | 'startDate' | 'endDate'>[] = [
  // Practice Challenges
  {
    title: 'Rhythm Master',
    description: 'Complete 5 rhythm practice sessions this week',
    type: 'practice',
    difficulty: 'easy',
    target: 5,
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
    ]
  },
  {
    title: 'Note Detective',
    description: 'Identify 50 musical notes correctly in practice sessions',
    type: 'practice',
    difficulty: 'medium',
    target: 50,
    reward: {
      points: 150,
      badge: 'note_detective',
      title: 'Note Detective'
    },
    strategy: 'Focus on note reading exercises. Practice both treble and bass clef notes.',
    tips: [
      'Use flashcards for quick recognition',
      'Practice with different clefs',
      'Start with familiar notes (C, G, F)',
      'Use mnemonic devices',
      'Practice reading in context'
    ]
  },
  {
    title: 'Scale Explorer',
    description: 'Practice 3 different scales 10 times each',
    type: 'practice',
    difficulty: 'medium',
    target: 30,
    reward: {
      points: 200,
      badge: 'scale_explorer',
      title: 'Scale Explorer'
    },
    strategy: 'Learn and practice major scales. Start with C major, then G and F major.',
    tips: [
      'Learn the pattern: W-W-H-W-W-W-H',
      'Practice slowly and accurately',
      'Use proper fingerings',
      'Play with a metronome',
      'Practice ascending and descending'
    ]
  },

  // Quiz Challenges
  {
    title: 'Quiz Champion',
    description: 'Score 80% or higher on 3 quizzes this week',
    type: 'quiz',
    difficulty: 'hard',
    target: 3,
    reward: {
      points: 250,
      badge: 'quiz_champion',
      title: 'Quiz Champion'
    },
    strategy: 'Review previous lessons before taking quizzes. Focus on areas where you need improvement.',
    tips: [
      'Review lesson content before quizzing',
      'Take practice quizzes first',
      'Focus on weak areas',
      'Read questions carefully',
      'Use process of elimination'
    ]
  },
  {
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    type: 'quiz',
    difficulty: 'hard',
    target: 1,
    reward: {
      points: 300,
      badge: 'perfect_score',
      title: 'Perfect Score'
    },
    strategy: 'Choose a topic you know well and review thoroughly before attempting.',
    tips: [
      'Choose a familiar topic',
      'Review all related lessons',
      'Take practice questions first',
      'Double-check your answers',
      'Stay focused and take your time'
    ]
  },

  // Streak Challenges
  {
    title: 'Week Warrior',
    description: 'Practice for 7 consecutive days',
    type: 'streak',
    difficulty: 'medium',
    target: 7,
    reward: {
      points: 200,
      badge: 'week_warrior',
      title: 'Week Warrior'
    },
    strategy: 'Set a daily reminder and practice at the same time each day. Even 5 minutes counts!',
    tips: [
      'Set a daily reminder',
      'Practice at the same time daily',
      'Start with just 5 minutes',
      'Track your progress',
      'Celebrate small wins'
    ]
  },
  {
    title: 'Consistency King',
    description: 'Complete 10 practice sessions in 7 days',
    type: 'streak',
    difficulty: 'hard',
    target: 10,
    reward: {
      points: 300,
      badge: 'consistency_king',
      title: 'Consistency King'
    },
    strategy: 'Practice multiple times per day. Mix different types of practice sessions.',
    tips: [
      'Practice morning and evening',
      'Mix different practice types',
      'Keep sessions short but frequent',
      'Track your sessions',
      'Stay motivated with rewards'
    ]
  },

  // Exploration Challenges
  {
    title: 'Lesson Explorer',
    description: 'Complete 3 new lessons this week',
    type: 'exploration',
    difficulty: 'easy',
    target: 3,
    reward: {
      points: 150,
      badge: 'lesson_explorer',
      title: 'Lesson Explorer'
    },
    strategy: 'Choose lessons that build on what you already know. Don\'t rush - understand each concept.',
    tips: [
      'Choose related lessons',
      'Take notes while learning',
      'Practice concepts immediately',
      'Review previous lessons first',
      'Ask questions if confused'
    ]
  },
  {
    title: 'Theory Pioneer',
    description: 'Learn 5 new music theory concepts',
    type: 'exploration',
    difficulty: 'medium',
    target: 5,
    reward: {
      points: 200,
      badge: 'theory_pioneer',
      title: 'Theory Pioneer'
    },
    strategy: 'Focus on understanding the "why" behind music theory concepts, not just memorizing.',
    tips: [
      'Connect concepts to real music',
      'Practice applying theory',
      'Use visual aids',
      'Teach concepts to others',
      'Relate to familiar songs'
    ]
  },

  // Mastery Challenges
  {
    title: 'Speed Demon',
    description: 'Complete 5 practice sessions in under 3 minutes each',
    type: 'mastery',
    difficulty: 'hard',
    target: 5,
    reward: {
      points: 250,
      badge: 'speed_demon',
      title: 'Speed Demon'
    },
    strategy: 'Focus on efficiency and accuracy. Practice the same exercises multiple times to build speed.',
    tips: [
      'Start slow and build speed',
      'Focus on accuracy first',
      'Use a timer',
      'Practice the same exercises',
      'Don\'t sacrifice quality for speed'
    ]
  },
  {
    title: 'Accuracy Ace',
    description: 'Score 95% or higher on 3 practice sessions',
    type: 'mastery',
    difficulty: 'hard',
    target: 3,
    reward: {
      points: 300,
      badge: 'accuracy_ace',
      title: 'Accuracy Ace'
    },
    strategy: 'Take your time and focus on getting each answer correct rather than rushing.',
    tips: [
      'Read questions carefully',
      'Double-check your answers',
      'Take your time',
      'Review before submitting',
      'Learn from mistakes'
    ]
  }
];

// Challenge rewards
export const challengeRewards: ChallengeReward[] = [
  {
    id: 'rhythm_master',
    title: 'Rhythm Master',
    description: 'Mastered the art of rhythm and timing',
    icon: 'rhythm',
    unlocked: false
  },
  {
    id: 'note_detective',
    title: 'Note Detective',
    description: 'Expert at reading musical notes',
    icon: 'music-note',
    unlocked: false
  },
  {
    id: 'scale_explorer',
    title: 'Scale Explorer',
    description: 'Explored the world of musical scales',
    icon: 'scale',
    unlocked: false
  },
  {
    id: 'quiz_champion',
    title: 'Quiz Champion',
    description: 'Consistently excels in knowledge tests',
    icon: 'achievement',
    unlocked: false
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Achieved perfection in assessment',
    icon: 'star',
    unlocked: false
  },
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Maintained daily practice for a week',
    icon: 'streak',
    unlocked: false
  },
  {
    id: 'consistency_king',
    title: 'Consistency King',
    description: 'Master of consistent practice',
    icon: 'achievement',
    unlocked: false
  },
  {
    id: 'lesson_explorer',
    title: 'Lesson Explorer',
    description: 'Explored new learning territories',
    icon: 'study',
    unlocked: false
  },
  {
    id: 'theory_pioneer',
    title: 'Theory Pioneer',
    description: 'Pioneered music theory concepts',
    icon: 'graduation',
    unlocked: false
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Mastered speed and efficiency',
    icon: 'achievement',
    unlocked: false
  },
  {
    id: 'accuracy_ace',
    title: 'Accuracy Ace',
    description: 'Achieved exceptional accuracy',
    icon: 'achievement',
    unlocked: false
  }
];

// Challenge system utilities
export class ChallengeSystem {
  static generateWeeklyChallenge(): Challenge {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Select a random challenge template
    const template = challengeTemplates[Math.floor(Math.random() * challengeTemplates.length)];
    
    return {
      ...template,
      id: `week_${startOfWeek.getTime()}`,
      current: 0,
      completed: false,
      progress: 0,
      startDate: startOfWeek.toISOString(),
      endDate: endOfWeek.toISOString(),
    };
  }

  static calculateProgress(challenge: Challenge): number {
    return Math.min((challenge.current / challenge.target) * 100, 100);
  }

  static isChallengeActive(challenge: Challenge): boolean {
    const now = new Date();
    const start = new Date(challenge.startDate);
    const end = new Date(challenge.endDate);
    return now >= start && now <= end;
  }

  static getMotivationalMessage(challenge: Challenge): string {
    const progress = this.calculateProgress(challenge);
    
    if (progress === 0) {
      return "Ready to start your challenge? Let's make this week amazing! 🚀";
    } else if (progress < 25) {
      return "Great start! Every step counts towards your goal. 💪";
    } else if (progress < 50) {
      return "You're making excellent progress! Keep up the momentum! ⭐";
    } else if (progress < 75) {
      return "You're more than halfway there! You've got this! 🔥";
    } else if (progress < 100) {
      return "Almost there! The finish line is in sight! 🎯";
    } else {
      return "Challenge completed! You're absolutely incredible! 🏆";
    }
  }

  static getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#6200ee';
    }
  }

  static getDifficultyEmoji(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '🟣';
    }
  }

  static getTypeIcon(type: string): string {
    switch (type) {
      case 'practice': return 'musical-notes';
      case 'quiz': return 'help-circle';
      case 'streak': return 'flame';
      case 'exploration': return 'compass';
      case 'mastery': return 'trophy';
      default: return 'star';
    }
  }

  static getTypeColor(type: string): string {
    switch (type) {
      case 'practice': return '#4CAF50';
      case 'quiz': return '#2196F3';
      case 'streak': return '#FF9800';
      case 'exploration': return '#9C27B0';
      case 'mastery': return '#F44336';
      default: return '#6200ee';
    }
  }
} 