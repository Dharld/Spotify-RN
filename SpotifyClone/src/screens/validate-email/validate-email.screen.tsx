import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {authService} from '../../api/services/auth.service';
import Button from '../../components/common/Button/Button.component';
import styles from './validate-email.styles';
import toastService from '../../ui/toast.service';

const EmailVerificationScreen = () => {
  const [isResending, setIsResending] = useState(false);
  const navigation = useNavigation();

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await authService.resendVerificationEmail();
      // Show success message
      toastService.success('Verification email has been resent.');
    } catch (error) {
      // Handle error
      toastService.error('Failed to resend verification email.');
    } finally {
      setIsResending(false);
    }
  };

  const handleProceedToLogin = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.message}>
        We've sent a verification email to your address. Please check your inbox
        and click the verification link.
      </Text>
      <Button
        title={isResending ? 'Resending...' : 'Resend Verification Email'}
        onPress={handleResendVerification}
        disabled={isResending}
      />
      <Button
        title="Proceed to Login"
        onPress={handleProceedToLogin}
        isSecondary={true}
      />
    </View>
  );
};

export default EmailVerificationScreen;
