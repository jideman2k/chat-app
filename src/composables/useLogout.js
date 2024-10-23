import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);
const auth = getAuth();

const logout = async () => {
  error.value = null;

  try {
    await signOut(auth);
  } catch (err) {
    error.value = err.message;
    error.value = err.message;
  }
};

const useLogout = () => {
  return { error, logout };
};

export default useLogout;
