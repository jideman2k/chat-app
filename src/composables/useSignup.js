import { ref } from "vue";
import { auth } from "@/service/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const error = ref(null);

const signup = async (email, password, displayName) => {
  error.value = null;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password); // Pass auth here

    if (!res) {
      throw new Error("Sign up incomplete");
    }

    // Update the user's profile with displayName
    await updateProfile(res.user, { displayName });

    console.log(res.user);
    return res.user;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
