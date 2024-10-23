import { ref } from "vue";
import { auth } from "../service/firebase/config";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password, displayName) => {
  error.value = null;
  isPending.value = true;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    error.value = err.message;
    error.value = "Incorrect user credentials";
  } finally {
    isPending.value = false;
  }
};

const useLogin = () => {
  return { error, isPending, login };
};

export default useLogin;
