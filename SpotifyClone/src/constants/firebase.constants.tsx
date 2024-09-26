export const firebaseErrorMessages: {[key: string]: string} = {
  'auth/email-already-in-use':
    'This email is already registered. Please use a different email or try logging in.',
  'auth/invalid-email': 'The email address is not valid.',
  'auth/weak-password':
    'The password is too weak. Please use a stronger password.',
  // Add more Firebase error codes and messages as needed
};
export const EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';
