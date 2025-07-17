# Music Theory Learning App

A React Native (Expo) mobile application for teaching beginner music theory with bilingual support (English and Farsi) and RTL layout.

## Features

### 🎵 Core Learning Features
- **14 Comprehensive Lessons** covering:
  - Music fundamentals and staff reading
  - Notes, pitches, and clefs
  - Rhythm and time signatures
  - Major and minor scales
  - Chords and intervals
- **Interactive Practice Activities** after each lesson:
  - Note identification exercises
  - Rhythm tapping activities
  - Scale recognition challenges
- **Module Quizzes** to reinforce learning:
  - 5 quiz modules (Basics, Notes, Rhythm, Scales, Chords)
  - Progress tracking and scoring
  - Immediate feedback on answers

### 🌍 Localization & Accessibility
- **Bilingual Support**: Full English and Farsi translations
- **RTL Layout**: Right-to-left text direction for Farsi
- **Language Switching**: Easy toggle between languages in Settings
- **Accessibility Features**: High contrast colors, readable fonts, touch-friendly buttons

### 📊 Progress Tracking & Engagement
- **Visual Progress Bar**: Shows completion percentage
- **Achievement Badges**: 
  - 🎼 New (0-19%)
  - 🎵 Beginner (20-39%)
  - 📚 Intermediate (40-59)
  - ⭐ Advanced (60-79%)
  - 🌟 Expert (80-99%)
  - 🎓 Master (100%)
- **Lesson Navigation**: Easy forward/backward navigation
- **Practice Integration**: Seamless transition between lessons and practice

### 🎨 Modern UI/UX
- **Material Design**: Clean, modern interface
- **Responsive Layout**: Optimized for mobile devices
- **Card-based Design**: Organized content presentation
- **Color-coded Elements**: Visual hierarchy and feedback
- **Smooth Animations**: Enhanced user experience

## Technical Implementation

### Architecture
- **React Native with Expo**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **Navigation**: React Navigation with bottom tabs
- **State Management**: React hooks for local state

### Key Components
- `LessonViewer`: Displays lesson content with navigation
- `PracticeActivity`: Interactive practice exercises
- `Quiz`: Module assessment with scoring
- `AudioPlayer`: Audio playback component (placeholder)
- `ProgressBar`: Visual progress tracking
- `SettingsScreen`: Language and app configuration

### Localization System
- **i18n-js**: Internationalization library
- **Translation Files**: Separate files for English (`en.ts`) and Farsi (`fa.ts`)
- **Dynamic Language Switching**: Runtime language changes
- **RTL Support**: Automatic text direction handling

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LessonViewer.tsx
│   ├── PracticeActivity.tsx
│   ├── Quiz.tsx
│   ├── AudioPlayer.tsx
│   └── ProgressBar.tsx
├── screens/            # Main app screens
│   ├── HomeScreen.tsx
│   ├── LessonsScreen.tsx
│   ├── PracticeScreen.tsx
│   ├── QuizScreen.tsx
│   └── SettingsScreen.tsx
├── i18           # Localization files
│   ├── index.ts
│   ├── en.ts
│   └── fa.ts
└── data/              # Static data (if needed)
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

## Usage

### Learning Flow
1. **Home Screen**: View progress and start learning
2. **Lessons**: Navigate through 14 structured lessons
3. **Practice**: Complete interactive exercises after each lesson
4. **Quizzes**: Take module assessments to test knowledge
5. **Settings**: Switch languages and customize the app

### Language Switching
1. Navigate to Settings tab2n desired language (English/Farsi)
3. App will automatically switch language and text direction

## Future Enhancements

### Planned Features
- **Audio Integration**: Real audio files for lessons and examples
- **Image Assets**: Visual diagrams and sheet music examples
- **Offline Support**: Download lessons for offline learning
- **User Accounts**: Progress synchronization across devices
- **Advanced Exercises**: More complex practice activities
- **Social Features**: Share progress and achievements

### Technical Improvements
- **State Persistence**: Save progress locally
- **Performance Optimization**: Lazy loading and caching
- **Testing**: Unit and integration tests
- **CI/CD**: Automated deployment pipeline

## Contributing

This project is designed as a learning tool for music theory education. Contributions are welcome for:
- Additional lesson content
- New practice activities
- UI/UX improvements
- Bug fixes and performance enhancements
- Additional language support

## License

This project is open source and available under the MIT License.

---

**Note**: This app is designed for educational purposes and provides a solid foundation for learning music theory fundamentals. The modular architecture makes it easy to extend with additional content and features. 