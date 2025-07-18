import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ProgressBarProps = {
  current: number;
  total: number;
  label?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const percentage = (current / total) * 100;
  
  const getBadge = () => {
    if (percentage >= 100) return '🎓 Master';
    if (percentage >= 80) return '🌟 Expert';
    if (percentage >= 60) return '⭐ Advanced';
    if (percentage >= 40) return '📚 Intermediate';
    if (percentage >= 20) return '🎵 Beginner';
    return '🎼 New';
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${percentage}%` }]} />
        </View>
        <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
      </View>
      <Text style={styles.badge}>{getBadge()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6200ee',
    minWidth: 40,
  },
  badge: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
});

export default ProgressBar; 