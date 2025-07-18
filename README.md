# 🎵 Music Theory Learning App

A comprehensive bilingual (English/Farsi) music theory learning application built with React Native and Expo. Master the fundamentals of music theory through interactive lessons, practice sessions, quizzes, and engaging challenges.

## ✨ Features

### 🎓 **Comprehensive Learning System**
- **14 Structured Lessons**: From basic music concepts to advanced theory
- **Progressive Difficulty**: Lessons build upon each other systematically
- **Real Progress Tracking**: Persistent learning progress with detailed statistics
- **Bilingual Support**: Full English and Farsi language support with RTL layout

### 🏆 **Dynamic Achievement System**
- **Unlockable Achievements**: Earn badges by completing lessons and challenges
- **Progress-Based Rewards**: Achievements tied to actual learning milestones
- **Visual Progress Tracking**: See your progress toward unlocking achievements
- **Motivational Empty States**: Encouraging messages when starting your journey

### 🎯 **Weekly Challenge System**
- **5 Challenge Types**: Practice, Quiz, Streak, Exploration, and Mastery challenges
- **Dynamic Challenges**: New challenges generated weekly with different objectives
- **Strategic Design**: Each challenge includes strategy guides and pro tips
- **Reward System**: Points and badges for completing challenges
- **Progress Integration**: Challenges automatically track user activity

### 📚 **Interactive Learning Components**
- **Practice Sessions**: Interactive exercises for rhythm, notes, scales, and chords
- **Quiz System**: Knowledge assessment with immediate feedback
- **Progress Visualization**: Beautiful progress bars and statistics
- **Learning Streaks**: Track daily practice consistency

### 🎨 **Modern User Interface**
- **Beautiful Design**: Clean, modern interface with gradient backgrounds
- **Responsive Layout**: Optimized for all screen sizes
- **Platform Icons**: Native iOS and Android icon support
- **Smooth Animations**: Engaging user experience with smooth transitions
- **Accessibility**: RTL support for Farsi language

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shahabgeravesh/MusicApp.git
   cd MusicApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 📱 App Structure

### Screens
- **Home**: Learning dashboard with progress overview and weekly challenges
- **Lessons**: Comprehensive lesson library with 14 music theory lessons
- **Practice**: Interactive practice sessions for different music concepts
- **Quiz**: Knowledge assessment with various question types
- **Settings**: App configuration, language settings, and achievements

### Key Components
- **WeeklyChallengeCard**: Dynamic challenge display with strategy and tips
- **LessonViewer**: Interactive lesson content viewer
- **PracticeActivity**: Interactive practice exercises
- **Quiz**: Assessment system with scoring
- **AppIcon**: Platform-aware icon component

### Utilities
- **Storage System**: AsyncStorage-based data persistence
- **Challenge System**: Dynamic challenge generation and tracking
- **i18n**: Custom internationalization system
- **App Data Hook**: Centralized state management

## 🎯 Learning Path

### Lesson Categories
1. **Basics** (Lessons 1-3): Music fundamentals, staff, clefs
2. **Notes** (Lesson 4): Note reading and pitch recognition
3. **Rhythm** (Lessons 5-7, 13): Rests, note values, time signatures, patterns
4. **Scales** (Lessons 8-9): Major and minor scales
5. **Theory** (Lessons 10-11, 14): Key signatures, intervals, comprehensive practice
6. **Chords** (Lesson 12): Building chords and harmony

### Challenge Types
- **Practice Challenges**: Complete practice sessions and exercises
- **Quiz Challenges**: Score high on knowledge assessments
- **Streak Challenges**: Maintain daily learning consistency
- **Exploration Challenges**: Complete new lessons and concepts
- **Mastery Challenges**: Focus on speed and accuracy

## 🏆 Achievement System

### Available Achievements
- **First Lesson**: Complete your first lesson
- **Note Reader**: Master note reading skills
- **Scale Master**: Complete scale-related lessons
- **Rhythm King**: Complete practice sessions
- **Week Warrior**: Maintain daily practice streaks
- **Quiz Champion**: Score perfectly on quizzes

### How to Earn
- Complete lessons and practice sessions
- Maintain learning streaks
- Score high on quizzes
- Complete weekly challenges
- Master specific music theory concepts

## 🌐 Internationalization

The app supports both English and Farsi languages with:
- **RTL Layout**: Proper right-to-left text direction for Farsi
- **Cultural Adaptation**: Appropriate translations and cultural considerations
- **Dynamic Switching**: Change language in settings
- **Persistent Settings**: Language preference is saved

## 📊 Data Management

### Persistent Storage
- **User Progress**: Lesson completion and scores
- **Practice Sessions**: Session history and statistics
- **Achievements**: Unlocked achievements and progress
- **Settings**: Language, notifications, and app preferences
- **Weekly Challenges**: Current challenge and progress

### Data Export/Import
- Export learning progress as JSON
- Import progress from backup files
- Clear all data option for fresh start

## 🛠️ Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── screens/            # Main app screens
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and systems
├── i18n/               # Internationalization files
└── assets/             # Images, fonts, and other assets
```

### Key Technologies
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **AsyncStorage**: Local data persistence
- **React Navigation**: Screen navigation
- **Expo Linear Gradient**: Beautiful gradient backgrounds
- **React Native Vector Icons**: Platform-specific icons

### State Management
- **useAppData Hook**: Centralized state management
- **AsyncStorage**: Persistent data storage
- **React Context**: App-wide state sharing
- **Custom Hooks**: Reusable state logic

## 🎨 Design System

### Color Palette
- **Primary**: #6200ee (Deep Purple)
- **Secondary**: #03dac6 (Teal)
- **Success**: #4CAF50 (Green)
- **Warning**: #FF9800 (Orange)
- **Error**: #F44336 (Red)
- **Background**: #f8f9fa (Light Gray)

### Typography
- **Headers**: Bold, 20-28px
- **Body Text**: Regular, 14-16px
- **Captions**: Light, 12-14px
- **Buttons**: Medium, 16px

### Components
- **Cards**: Rounded corners, shadows, clean design
- **Buttons**: Consistent styling with hover states
- **Progress Bars**: Visual progress indicators
- **Modals**: Overlay dialogs with smooth animations

## 🚀 Deployment

### Building for Production
```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android

# Build for web
npx expo build:web
```

### App Store Deployment
1. Configure app.json with proper metadata
2. Build production version
3. Submit to App Store Connect (iOS) or Google Play Console (Android)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React Native best practices
- Maintain bilingual support for all new features
- Add proper TypeScript types
- Include comprehensive documentation
- Test on both iOS and Android

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Music Theory Content**: Based on standard music theory curriculum
- **Icons**: React Native Vector Icons
- **Design Inspiration**: Modern mobile app design patterns
- **Community**: React Native and Expo communities

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Made with ❤️ for music education** 