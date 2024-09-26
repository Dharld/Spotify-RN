import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  View,
  Text,
} from 'react-native';
import {theme} from '../../styles/theme';

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  error?: string[];
}

export const Input: React.FC<InputProps> = ({
  containerStyle,
  placeholderTextColor = theme.colors.textSecondary,
  error,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
      {error && (
        <Text style={[styles.inputError, styles.errorText]}>
          {error.join(', ')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.small,
    paddingHorizontal: theme.spacing.small,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.background,
  },
  inputError: {
    borderColor: theme.colors.error,
    marginBottom: theme.spacing.medium,
  },
  errorText: {
    color: theme.colors.error,
  },
});
