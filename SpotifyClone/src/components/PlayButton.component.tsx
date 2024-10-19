import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {theme} from '../styles/theme';

interface InteractivePlayButtonProps {
  onPress: () => void;
  size?: number;
  isPlaying: boolean;
}

const InteractivePlayButton: React.FC<InteractivePlayButtonProps> = ({
  onPress,
  size = 50,
  isPlaying,
}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const togglePlayPause = () => {
    onPress();

    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      onPress={togglePlayPause}
      style={[
        styles.playButton,
        {width: size, height: size, borderRadius: size / 2},
      ]}
      activeOpacity={0.7}>
      <Animated.View style={{transform: [{scale: scaleValue}]}}>
        <Icon
          name={isPlaying ? 'pause' : 'play'}
          size={size * 0.6}
          color={theme.colors.background}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playButton: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'absolute',
    bottom: 64,
    right: 16,
  },
});

export default InteractivePlayButton;
