import { ref } from "vue";
import { auth } from "@/service/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app"; // Import FirebaseError if needed

const error = ref(null);

const signup = async (email, password, displayName) => {
  error.value = null;

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!userCredentials) {
      throw new Error("Sign up incomplete");
    }

    // Update the user's profile with displayName
    await updateProfile(auth.currentUser, { displayName });
    error.value = null;

    return userCredentials;
  } catch (err) {
    console.log(err.message);

    // Check if the error is a FirebaseError
    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/invalid-email":
          error.value = "Invalid email address.";
          break;
        case "auth/email-already-in-use":
          error.value = "Email already in use.";
          break;
        case "auth/weak-password":
          error.value = "Password should be at least 6 characters.";
          break;
        // Add more cases as needed
        default:
          error.value = "An unexpected error occurred. Please try again.";
      }
    } else {
      error.value = err.message; // Fallback for non-Firebase errors
    }
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
