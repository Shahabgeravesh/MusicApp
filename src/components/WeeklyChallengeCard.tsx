import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIcon from './AppIcon';
import { Challenge, ChallengeSystem } from '../utils/challengeSystem';
import i18n from '../i18n';

const { width } = Dimensions.get('window');

interface WeeklyChallengeCardProps {
  challenge: Challenge;
  onPress?: () => void;
  onComplete?: () => void;
}

const WeeklyChallengeCard: React.FC<WeeklyChallengeCardProps> = ({
  challenge,
  onPress,
  onComplete,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const progress = ChallengeSystem.calculateProgress(challenge);
  const isActive = ChallengeSystem.isChallengeActive(challenge);
  const motivationalMessage = ChallengeSystem.getMotivationalMessage(challenge);
  const difficultyColor = ChallengeSystem.getDifficultyColor(challenge.difficulty);
  const typeColor = ChallengeSystem.getTypeColor(challenge.type);
  const typeIcon = ChallengeSystem.getTypeIcon(challenge.type);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setShowDetails(true);
    }
  };

  const handleComplete = () => {
    if (challenge.completed) {
      Alert.alert('Challenge Completed!', 'You\'ve already completed this challenge. Great job! 🏆');
    } else if (progress >= 100) {
      Alert.alert(
        'Challenge Complete! 🎉',
        `Congratulations! You've earned ${challenge.reward.points} points and the "${challenge.reward.title}" badge!`,
        [
          { text: 'Continue', onPress: () => onComplete?.() }
        ]
      );
    } else {
      setShowDetails(true);
    }
  };

  const getProgressColor = () => {
    if (progress >= 100) return '#4CAF50';
    if (progress >= 75) return '#FF9800';
    if (progress >= 50) return '#2196F3';
    if (progress >= 25) return '#9C27B0';
    return '#E0E0E0';
  };

  const getProgressEmoji = () => {
    if (progress >= 100) return '🏆';
    if (progress >= 75) return '🔥';
    if (progress >= 50) return '⭐';
    if (progress >= 25) return '💪';
    return '🚀';
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <LinearGradient
          colors={[typeColor + '20', typeColor + '10']}
          style={styles.gradient}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <AppIcon name={typeIcon} size={24} color={typeColor} />
              <Text style={styles.title}>{challenge.title}</Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}>
              <Text style={styles.difficultyText}>{challenge.difficulty.toUpperCase()}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{challenge.description}</Text>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>
                {challenge.current} of {challenge.target} completed
              </Text>
              <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${progress}%`,
                    backgroundColor: getProgressColor()
                  }
                ]} 
              />
            </View>

            {/* Motivational Message */}
            <Text style={styles.motivationalMessage}>
              {getProgressEmoji()} {motivationalMessage}
            </Text>
          </View>

          {/* Reward Preview */}
          <View style={styles.rewardSection}>
            <AppIcon name="star" size={16} color="#FFD700" />
            <Text style={styles.rewardText}>
              {challenge.reward.points} points + "{challenge.reward.title}" badge
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.strategyButton]}
              onPress={() => setShowDetails(true)}
            >
              <AppIcon name="info" size={16} color="#6200ee" />
              <Text style={styles.actionButtonText}>Strategy</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.tipsButton]}
              onPress={() => setShowTips(true)}
            >
              <AppIcon name="help-circle" size={16} color="#FF9800" />
              <Text style={styles.actionButtonText}>Tips</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.actionButton, 
                styles.startButton,
                { backgroundColor: progress >= 100 ? '#4CAF50' : typeColor }
              ]}
              onPress={handleComplete}
            >
              <AppIcon 
                name={progress >= 100 ? "checkmark" : "play"} 
                size={16} 
                color="#fff" 
              />
              <Text style={[styles.actionButtonText, { color: '#fff' }]}>
                {progress >= 100 ? 'Completed' : 'Start'}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Strategy Modal */}
      <Modal
        visible={showDetails}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDetails(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{i18n.t('home.challengeStrategy')}</Text>
                <TouchableOpacity onPress={() => setShowDetails(false)}>
                  <AppIcon name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={styles.strategySection}>
                <Text style={styles.sectionTitle}>Your Strategy</Text>
                <Text style={styles.strategyText}>{challenge.strategy}</Text>
              </View>

              <View style={styles.progressSection}>
                <Text style={styles.sectionTitle}>{i18n.t('home.challengeProgress')}</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${progress}%`,
                        backgroundColor: getProgressColor()
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {challenge.current} of {challenge.target} completed ({Math.round(progress)}%)
                </Text>
              </View>

              <View style={styles.rewardSection}>
                <Text style={styles.sectionTitle}>{i18n.t('home.challengeReward')}</Text>
                <View style={styles.rewardCard}>
                  <AppIcon name="star" size={24} color="#FFD700" />
                  <View style={styles.rewardInfo}>
                    <Text style={styles.rewardTitle}>{challenge.reward.title}</Text>
                    <Text style={styles.rewardPoints}>{challenge.reward.points} points</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: typeColor }]}
                onPress={() => setShowDetails(false)}
              >
                <Text style={styles.modalButtonText}>{i18n.t('home.gotIt')}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Tips Modal */}
      <Modal
        visible={showTips}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTips(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{i18n.t('home.proTips')}</Text>
              <TouchableOpacity onPress={() => setShowTips(false)}>
                <AppIcon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {challenge.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <View style={styles.tipNumber}>
                    <Text style={styles.tipNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}

              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: typeColor }]}
                onPress={() => setShowTips(false)}
              >
                <Text style={styles.modalButtonText}>{i18n.t('home.thanksForTips')}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  motivationalMessage: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  rewardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
  },
  rewardText: {
    fontSize: 14,
    color: '#E65100',
    fontWeight: '500',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  strategyButton: {
    backgroundColor: '#E8F5E8',
  },
  tipsButton: {
    backgroundColor: '#FFF3E0',
  },
  startButton: {
    backgroundColor: '#6200ee',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: width - 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  strategySection: {
    marginBottom: 20,
  },
  strategyText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
  },
  rewardInfo: {
    marginLeft: 12,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
  },
  rewardPoints: {
    fontSize: 14,
    color: '#E65100',
    marginTop: 4,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  tipNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    flex: 1,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WeeklyChallengeCard; 