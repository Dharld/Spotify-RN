import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Input} from './common/TextField.component';
import {theme} from '../styles/theme';
// Adjust the import path as needed

interface LabeledInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: ViewStyle;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  containerStyle,
  labelStyle,
  inputStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <Input
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#878787"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.medium,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.small,
  },
  input: {
    // You can add any additional input styles here
  },
});

export default LabeledInput;
