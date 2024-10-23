<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Username" v-model="displayName" required />
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <button type="submit" :disabled="loading">
      {{ loading ? "Loading..." : "Sign up" }}
    </button>
    <div class="error">{{ error }}</div>
    <!-- Display error message -->
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";
import { useRouter } from "vue-router";

export default {
  setup(_, { emit }) {
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const { signup, error } = useSignup();
    const router = useRouter();
    const loading = ref(false);

    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password) => {
      // Minimum 8 characters, at least 1 uppercase, 1 lowercase and 1 number
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(password);
    };

    const handleSubmit = async () => {
      if (!validateEmail(email.value)) {
        error.value = "Invalid email";
        return;
      }

      if (!validatePassword(password.value)) {
        error.value =
          "Password must be at least 8 characters long and contain at least one uppercase letter.";
      }

      loading.value = true;
      await signup(email.value, password.value, displayName.value);
      loading.value = false;
      if (!error.value) {
        displayName.value = "";
        email.value = "";
        password.value = "";
        emit("signup");
      }
    };

    return { displayName, email, password, handleSubmit, error, loading };
  },
};
</script>

<style>
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
