import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootState} from './src/store/store';
import LoginScreen from './src/screens/login/login.screen';
import EmailVerificationScreen from './src/screens/validate-email/validate-email.screen';
import SignupScreen from './src/screens/signup/signup.screen';
import HomeScreen from './src/screens/home/home.screen';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import MainTabs from './src/components/NavigationBar.component';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator id="AuthStack" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ValidateEmail" component={EmailVerificationScreen} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator id="MainStack" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Tabs" component={MainTabs} />
  </Stack.Navigator>
);

const MainContent = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainContent;
