import React from 'react';
import {TouchableOpacity, Text, StyleSheet, TextStyle} from 'react-native';
import {theme} from '../../styles/theme';

interface LinkProps {
  title: string;
  onPress: () => void;
  style?: TextStyle;
}

export const Link: React.FC<LinkProps> = ({title, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.linkText, style]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginTop: theme.spacing.medium,
    textDecorationLine: 'underline',
  },
});
export default Link;
