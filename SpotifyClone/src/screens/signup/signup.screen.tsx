import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

import styles from './signup.styles';
import LabeledInput from '../../components/LabeledInput.component';
import Link from '../../components/common/Link.component';
import {useDispatch} from 'react-redux';
import {z} from 'zod';
import {register} from '../../store/slices/auth/auth.actions';
import {AppDispatch} from '../../store/store';
import Button from '../../components/common/Button/Button.component';
import toastService from '../../ui/toast.service';

import {
  EMAIL_ALREADY_IN_USE,
  firebaseErrorMessages,
} from '../../constants/firebase.constants';
import {useNavigation} from '@react-navigation/native';

const signupSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function SpotifySignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      setLoading(true);
      signupSchema.parse({email, password});
      const resultAction = await dispatch(register({email, password}));
      if (resultAction.type === register.fulfilled.type) {
        toastService.success('Registration successful');
        navigation.navigate('ValidateEmail' as never);
      } else {
        let message = '';
        const error = resultAction.payload;
        if (error.code === EMAIL_ALREADY_IN_USE) {
          message = firebaseErrorMessages[error.code];
        } else {
          message = 'An error occurred while signing up';
        }
        toastService.error(message, 'Registration Failed');
      }
      setLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toastService.error(error.errors[0].message, 'Validation Error');
      } else {
        toastService.error('An error occurred while signing up');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>Spotify</Text>
      <Text style={styles.header}>Sign up for free to start listening.</Text>

      <LabeledInput
        label="What's your email?"
        placeholder="Enter your email."
        value={email}
        onChangeText={setEmail}
        containerStyle={styles.inputContainer}
        labelStyle={styles.label}
        inputStyle={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <LabeledInput
        label="Create a password"
        placeholder="Create a password."
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.inputContainer}
        labelStyle={styles.label}
        inputStyle={styles.input}
      />

      <Button
        title="Sign up"
        style={{
          width: '100%',
        }}
        loading={loading}
        onPress={handleSignup}
      />

      <Text style={styles.termsText}>
        By clicking on sign-up, you agree to Spotify's Terms and Conditions of
        Use.
      </Text>

      <Text style={styles.termsText}>
        To learn more about how Spotify collects, uses, shares and protects your
        personal data, please see Spotify's Privacy Policy.
      </Text>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Have an account?</Text>
        <Link
          title="Log In"
          onPress={handleNavigation}
          style={{marginTop: 0}}
        />
      </View>
    </ScrollView>
  );
}
