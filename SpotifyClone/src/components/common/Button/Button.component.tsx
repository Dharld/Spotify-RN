import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  isSecondary?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  isSecondary = false,
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSecondary ? styles.secondaryButton : styles.primaryButton,
        disabled ? styles.disabledButton : null,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}>
      <Text
        style={[
          styles.buttonText,
          isSecondary ? styles.secondaryButtonText : styles.primaryButtonText,
          textStyle,
        ]}>
        {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#1DB954', // Spotify green
  },
  secondaryButton: {
    backgroundColor: 'transparent',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#1DB954', // Spotify green
  },
});

export default Button;
