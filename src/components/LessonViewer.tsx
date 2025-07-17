import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AudioPlayer from './AudioPlayer';

export type LessonContent = {
  title: string;
  text: string;
  image?: any;
  audio?: any;
};

type LessonViewerProps = {
  content: LessonContent;
  showPrev: boolean;
  showNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPracticePress?: () => void;
};

const LessonViewer: React.FC<LessonViewerProps> = ({
  content,
  showPrev,
  showNext,
  onPrev,
  onNext,
  onPracticePress,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>{content.title}</Text>
          <Text style={styles.text}>{content.text}</Text>
          
          {content.audio && (
            <AudioPlayer 
              title="Listen to this lesson"
              onPlay={() => console.log('Play audio')}
              onPause={() => console.log('Pause audio')}
            />
          )}
        </View>
      </ScrollView>
      
      <View style={styles.navigation}>
        <View style={styles.buttonRow}>
          {showPrev && (
            <TouchableOpacity style={styles.button} onPress={onPrev}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          {onPracticePress && (
            <TouchableOpacity style={styles.practiceButton} onPress={onPracticePress}>
              <Text style={styles.practiceButtonText}>Practice</Text>
            </TouchableOpacity>
          )}
          
          {showNext && (
            <TouchableOpacity style={styles.button} onPress={onNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
  },
  navigation: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
  },
  practiceButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  practiceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 600,
  },
});

export default LessonViewer; 