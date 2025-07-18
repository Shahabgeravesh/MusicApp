# Music Theory Learning App

A bilingual (English/Farsi) music theory learning app built with React Native and Expo. The app features 14 structured lessons, interactive practice activities, quizzes, progress tracking, achievements, weekly challenges, and a settings screen with language switching and RTL support for Farsi.

## Features
- **Bilingual Support:** English and Farsi (RTL) with instant language switching
- **14 Lessons:** Covers staff, notes, clefs, rhythm, scales, key signatures, intervals, chords, and more
- **Practice Activities:** Interactive exercises after each lesson
- **Quizzes:** Assessments for each module with feedback
- **Progress Tracking:** Badges, achievements, and weekly challenges
- **Settings:** Language, theme, and app preferences
- **Persistence:** All progress and settings are saved using AsyncStorage

## Development & Code Quality

### Linting & Type Checking
- **ESLint** is configured for React Native + TypeScript (see `eslint.config.js`)
- Run lint checks with:
  ```bash
  npx eslint . --ext .ts,.tsx
  ```
- **TypeScript** type checks:
  ```bash
  npx tsc --noEmit
  ```
- All critical lint errors and type errors must be fixed before merging.

### Bug Discovery & Fix Workflow
1. **Run ESLint and TypeScript checks** to discover potential bugs
2. **Fix all errors** (e.g., no-undef, parsing errors, unused variables)
3. **Remove unused imports, variables, and directives**
4. **Document fixes in commit messages and PRs**
5. **Manual testing**: Test all screens, flows, and edge cases

### Recent Improvements
- Fixed all ESLint `no-undef` errors (console, setTimeout, alert)
- Fixed ProgressBar parsing error and StyleSheet issues
- Cleaned up unused variables, imports, and directives
- Updated ESLint config for v9+ flat config and TypeScript
- Improved code quality and maintainability

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```
3. Run lint checks:
   ```bash
   npx eslint . --ext .ts,.tsx
   ```
4. Run type checks:
   ```bash
   npx tsc --noEmit
   ```

## Contributing
- Follow the linting and type checking workflow
- Write clean, simple, and maintainable code
- Add tests for new features and bug fixes
- Document all changes in PRs

## License
MIT 