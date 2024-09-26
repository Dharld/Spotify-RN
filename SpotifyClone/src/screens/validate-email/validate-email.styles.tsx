import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSizes.header,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.medium,
  },
  message: {
    fontSize: theme.fontSizes.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.small,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.regular,
    fontWeight: theme.fontWeights.bold,
  },
});

export default styles;
