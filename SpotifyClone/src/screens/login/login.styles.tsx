import {StyleSheet} from 'react-native';
import {theme} from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 54,
    alignSelf: 'center',
    marginBottom: theme.spacing.large,
  },
  header: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.header,
    fontWeight: theme.fontWeights.bold,
    marginBottom: theme.spacing.medium,
    textAlign: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.small,
    marginBottom: theme.spacing.small,
  },
  socialButtonText: {
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.small,
    fontWeight: theme.fontWeights.bold,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.medium,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.divider,
  },
  dividerText: {
    color: theme.colors.divider,
    paddingHorizontal: theme.spacing.small,
  },
  input: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.small,
    marginBottom: theme.spacing.small,
    color: theme.colors.textPrimary,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.small,
    alignItems: 'center',
    marginTop: theme.spacing.small,
  },
  loginButtonText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
  forgotPasswordText: {
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginTop: theme.spacing.medium,
    textDecorationLine: 'underline',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.medium,
  },
  signupText: {
    color: theme.colors.textSecondary,
  },
  signupLink: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
});

export default styles;
