import React, {useEffect} from 'react';

import {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

import styles from './login.styles';

import Button from '../../components/common/Button/Button.component';
import Link from '../../components/common/Link.component';

import {theme} from '../../styles/theme';
import {Input} from '../../components/common/TextField.component';

import {z} from 'zod';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {login} from '../../store/slices/auth/auth.actions';

import toastService from '../../ui/toast.service';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, ' Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type RootStackParamList = {
  MainStack: {screen: string};
  Home: undefined;
  Signup: undefined;
};

export default function LoginScreen() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('MainStack', {screen: 'Home'});
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      loginSchema.parse({email, password});
      const resultAction = await dispatch(login({email, password}));
      if (resultAction.type === login.fulfilled.type) {
        toastService.success('Login successful');
        navigation.navigate('Home' as never);
      } else {
        toastService.error('Failed to login');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png',
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.header}>To continue, log in to Spotify.</Text>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <Input
        style={styles.input}
        placeholder="Email address or username"
        placeholderTextColor="#B3B3B3"
        value={email}
        onChangeText={setEmail}
        containerStyle={{marginBottom: 0}}
        error={errors.email}
      />

      <Input
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B3B3B3"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        containerStyle={{marginBottom: 0}}
      />

      <Button
        title="Log In"
        onPress={handleLogin}
        style={{marginTop: theme.spacing.medium}}
        loading={loading}
      />

      <Link title="Forgot your password?" onPress={() => {}} />

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>SIGN UP FOR SPOTIFY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
