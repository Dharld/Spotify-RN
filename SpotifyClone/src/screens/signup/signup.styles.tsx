import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1DB954',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#3E3E3E',
    width: '100%',
    padding: 15,
    borderRadius: 4,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    color: '#878787',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#FFFFFF',
  },
  loginLink: {
    color: '#1DB954',
    marginLeft: 5,
  },
});

export default styles;
