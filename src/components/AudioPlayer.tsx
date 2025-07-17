import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type AudioPlayerProps = {
  title: string;
  onPlay?: () => void;
  onPause?: () => void;
  isPlaying?: boolean;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  title, 
  onPlay, 
  onPause, 
  isPlaying = false 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity 
        style={styles.playButton}
        onPress={isPlaying ? onPause : onPlay}
      >
        <Ionicons 
          name={isPlaying ? 'pause' : 'play'} 
          size={24} 
          color="#fff" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 500,
    marginRight: 12,
  },
  playButton: {
    backgroundColor: '#620ee',    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AudioPlayer; 