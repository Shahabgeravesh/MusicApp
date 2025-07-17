import React, { useState } from 'react';
import LessonViewer, { LessonContent } from '../components/LessonViewer';
import PracticeActivity from '../components/PracticeActivity';
import Quiz from '../components/Quiz';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import i18n from '../i18n';
import { useAppData } from '../hooks/useAppData';

const LessonsScreen: React.FC = () => {
  const [step, setStep] = useState(0);
  const [showPractice, setShowPractice] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizModule, setQuizModule] = useState<string | null>(null);
  const { completeLesson, addPracticeSession, addQuizResult } = useAppData();

  const moduleBoundaries = [3, 7, 10, 12, 13]; // End indices for each module
  const moduleKeys = ['basics', 'notes', 'rhythm', 'scales', 'chords'];

  const getLessonContent = (step: number): LessonContent => {
    const lessonData = i18n.t(`lessons.${step}`) as any;
    return {
      title: lessonData.title,
      text: lessonData.text,
      // image: require(`../assets/lesson_${step}.png`), // Placeholder for images
      // audio: require(`../assets/audio/lesson_${step}.mp3`), // Placeholder for audio
    };
  };

  const getPracticeQuestions = () => {
    if (step < 3) return i18n.t('practice.basics') as any;
    if (step < 7) return i18n.t('practice.notes') as any;
    if (step < 10) return i18n.t('practice.rhythm') as any;
    if (step < 12) return i18n.t('practice.scales') as any;
    return i18n.t('practice.chords') as any;
  };

  const getQuizModule = () => {
    for (let i = 0; i < moduleBoundaries.length; i++) {
      if (step === moduleBoundaries[i] - 1) return moduleKeys[i];
    }
    return null;
  };

  const handlePracticeComplete = async (score: number, total: number) => {
    setShowPractice(false);
    
    // Determine practice type based on current step
    let practiceType: 'rhythm' | 'notes' | 'scales' | 'chords' = 'rhythm';
    if (step < 3) practiceType = 'rhythm';
    else if (step < 7) practiceType = 'notes';
    else if (step < 10) practiceType = 'rhythm';
    else if (step < 12) practiceType = 'scales';
    else practiceType = 'chords';
    
    // Record practice session
    await addPracticeSession(practiceType, 5, total, score, (score / total) * 100);
    
    // Complete the lesson
    await completeLesson(step, (score / total) * 100, 5);
    
    Alert.alert('Practice Complete', `Great job! You scored ${score}/${total}. Your progress has been saved.`);
  };

  const handleQuizComplete = async (score: number, total: number) => {
    setQuizScore(score);
    
    // Record quiz result
    const quizKey = getQuizModule();
    if (quizKey) {
      await addQuizResult(`quiz_${quizKey}`, (score / total) * 100, total, score, 300);
    }
    
    // Complete the lesson
    await completeLesson(step, (score / total) * 100, 10);
  };

  const handleQuizContinue = () => {
    setShowQuiz(false);
    setQuizScore(null);
    setQuizModule(null);
    setStep((s) => Math.min(13, s + 1));
  };

  // Show practice activity
  if (showPractice) {
    return (
      <PracticeActivity
        questions={getPracticeQuestions()}
        onComplete={handlePracticeComplete}
      />
    );
  }

  // Show quiz if at module boundary
  const quizKey = getQuizModule();
  if (quizKey && (showQuiz || quizScore !== null)) {
    if (quizScore === null) {
      return (
        <Quiz
          questions={i18n.t(`quiz.${quizKey}`) as any}
          onComplete={handleQuizComplete}
        />
      );
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>Quiz Complete!</Text>
          <Text style={{ fontSize: 18, marginBottom: 24 }}>Your score: {quizScore} / {i18n.t(`quiz.${quizKey}`).length}</Text>
          <TouchableOpacity
            style={{ backgroundColor: '#6200ee', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
            onPress={handleQuizContinue}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Continue</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  // If at module boundary, show quiz button
  if (quizKey) {
    return (
      <LessonViewer
        content={getLessonContent(step)}
        showPrev={step > 0}
        showNext={false}
        onPrev={() => setStep((s) => Math.max(0, s - 1))}
        onPracticePress={() => setShowPractice(true)}
        onNext={() => setShowQuiz(true)}
      />
    );
  }

  // Normal lesson flow
  return (
    <LessonViewer
      content={getLessonContent(step)}
      showPrev={step > 0}
      showNext={step < 13}
      onPrev={() => setStep((s) => Math.max(0, s - 1))}
      onNext={() => setStep((s) => Math.min(13, s + 1))}
      onPracticePress={() => setShowPractice(true)}
    />
  );
};

export default LessonsScreen; 