import Toast from 'react-native-toast-message';

// Set of function to use hooks
const showToast = {
  success(message: string, title: string = 'Success') {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
    });
  },

  error(message: string, title: string = 'Error') {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  },

  info(message: string, title: string = 'Info') {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
    });
  },
};

export default showToast;
