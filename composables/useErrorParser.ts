const errors: { [error: string]: string } = {
  "auth/wrong-password": "The provided email or password is incorrect.",
  "auth/user-not-found": "User with this email doesn't exist.",
  "auth/popup-closed-by-user": "Popup closed by user",
  "auth/popup-blocked": "Popup is disabled please check your browser",
  "auth/email-already-in-use": "Email already in use. Try logging in instead",
  "auth/internal-error": "Internal/Network Error",
};

export default function useErrorParser(error: string) {
  for (let key of Object.keys(errors)) {
    if (error.includes(key)) return errors[key];
  }
  return error;
}
