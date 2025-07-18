import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AppIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

// Platform-specific icon mapping following iOS and Android guidelines
const iconMap: Record<string, { ios: keyof typeof Ionicons.glyphMap; android: keyof typeof Ionicons.glyphMap }> = {
  // Quick Actions
  'continue-learning': { ios: 'play-circle', android: 'play-circle' },
  'daily-practice': { ios: 'time', android: 'time' },
  'quick-quiz': { ios: 'help-circle', android: 'help-circle' },
  
  // Navigation
  'home': { ios: 'home', android: 'home' },
  'lessons': { ios: 'book', android: 'book' },
  'practice': { ios: 'musical-notes', android: 'musical-notes' },
  'quiz': { ios: 'help-circle', android: 'help-circle' },
  'settings': { ios: 'settings', android: 'settings' },
  
  // Progress & Achievements
  'progress': { ios: 'trending-up', android: 'trending-up' },
  'achievement': { ios: 'trophy', android: 'trophy' },
  'streak': { ios: 'flame', android: 'flame' },
  'challenge': { ios: 'locate', android: 'locate' },
  
  // Music Theory
  'music-note': { ios: 'musical-note', android: 'musical-note' },
  'scale': { ios: 'musical-notes', android: 'musical-notes' },
  'rhythm': { ios: 'pulse', android: 'pulse' },
  'chord': { ios: 'layers', android: 'layers' },
  
  // Actions
  'play': { ios: 'play', android: 'play' },
  'pause': { ios: 'pause', android: 'pause' },
  'stop': { ios: 'stop', android: 'stop' },
  'next': { ios: 'chevron-forward', android: 'chevron-forward' },
  'previous': { ios: 'chevron-back', android: 'chevron-back' },
  
  // Status
  'checkmark': { ios: 'checkmark-circle', android: 'checkmark-circle' },
  'error': { ios: 'close-circle', android: 'close-circle' },
  'warning': { ios: 'warning', android: 'warning' },
  'info': { ios: 'information-circle', android: 'information-circle' },
  
  // UI Elements
  'star': { ios: 'star', android: 'star' },
  'heart': { ios: 'heart', android: 'heart' },
  'bookmark': { ios: 'bookmark', android: 'bookmark' },
  'share': { ios: 'share', android: 'share' },
  'download': { ios: 'download', android: 'download' },
  'upload': { ios: 'cloud-upload', android: 'cloud-upload' },
  
  // Time & Date
  'calendar': { ios: 'calendar', android: 'calendar' },
  'clock': { ios: 'time', android: 'time' },
  'timer': { ios: 'timer', android: 'timer' },
  
  // User & Profile
  'user': { ios: 'person', android: 'person' },
  'profile': { ios: 'person-circle', android: 'person-circle' },
  'avatar': { ios: 'person-circle', android: 'person-circle' },
  
  // Data & Analytics
  'chart': { ios: 'bar-chart', android: 'bar-chart' },
  'analytics': { ios: 'analytics', android: 'analytics' },
  'stats': { ios: 'stats-chart', android: 'stats-chart' },
  
  // Communication
  'message': { ios: 'chatbubble', android: 'chatbubble' },
  'notification': { ios: 'notifications', android: 'notifications' },
  'email': { ios: 'mail', android: 'mail' },
  
  // Media
  'camera': { ios: 'camera', android: 'camera' },
  'photo': { ios: 'image', android: 'image' },
  'video': { ios: 'videocam', android: 'videocam' },
  'microphone': { ios: 'mic', android: 'mic' },
  
  // Tools & Settings
  'edit': { ios: 'create', android: 'create' },
  'delete': { ios: 'trash', android: 'trash' },
  'search': { ios: 'search', android: 'search' },
  'filter': { ios: 'filter', android: 'filter' },
  'sort': { ios: 'funnel', android: 'funnel' },
  
  // Navigation & Location
  'map': { ios: 'map', android: 'map' },
  'location': { ios: 'location', android: 'location' },
  'compass': { ios: 'compass', android: 'compass' },
  
  // System
  'refresh': { ios: 'refresh', android: 'refresh' },
  'sync': { ios: 'sync', android: 'sync' },
  'wifi': { ios: 'wifi', android: 'wifi' },
  'battery': { ios: 'battery-charging', android: 'battery-charging' },
  
  // Social
  'like': { ios: 'heart', android: 'heart' },
  'dislike': { ios: 'thumbs-down', android: 'thumbs-down' },
  'comment': { ios: 'chatbubble-ellipses', android: 'chatbubble-ellipses' },
  'follow': { ios: 'person-add', android: 'person-add' },
  
  // Learning & Education
  'study': { ios: 'library', android: 'library' },
  'graduation': { ios: 'school', android: 'school' },
  'certificate': { ios: 'ribbon', android: 'ribbon' },
  'medal': { ios: 'medal', android: 'medal' },
  'school': { ios: 'school', android: 'school' },
  'musical-notes': { ios: 'musical-notes', android: 'musical-notes' },
  'pulse': { ios: 'pulse', android: 'pulse' },
  'trending-up': { ios: 'trending-up', android: 'trending-up' },
  'layers': { ios: 'layers', android: 'layers' },
  
  // Default fallback
  'default': { ios: 'help-circle', android: 'help-circle' },
};

const AppIcon: React.FC<AppIconProps> = ({ 
  name, 
  size = 24, 
  color = '#000',
  style 
}) => {
  const iconMapping = iconMap[name] || iconMap['default'];
  const iconName = Platform.OS === 'ios' ? iconMapping.ios : iconMapping.android;
  
  return (
    <Ionicons 
      name={iconName} 
      size={size} 
      color={color} 
      style={style}
    />
  );
};

export default AppIcon; 