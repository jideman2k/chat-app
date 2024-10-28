import { ref } from "vue";
import { auth } from "../service/firebase/config";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

const user = ref(null);
const error = ref(null);

const getUser = () => {
  const loadingUser = ref(true);

  const currentUser = getAuth().currentUser;
  if (currentUser) {
    user.value = currentUser;
    loadingUser.value = false;
  }

  onAuthStateChanged(
    auth,
    (_user) => {
      if (_user) {
        user.value = _user;
      } else {
        user.value = null;
      }
      loadingUser.value = false;
    },

    (err) => {
      error.value = err.message;
      loadingUser.value = false;
    }
  );

  const updateUserProfile = async (displayName) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName });
        user.value = auth.currentUser;
      }
    } catch (err) {
      error.value = err.message;
    }
  };

  return { user, error, loadingUser, updateUserProfile };
};

export default getUser;
