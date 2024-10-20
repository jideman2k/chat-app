<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Username" v-model="displayName" required />
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <button type="submit">Sign up</button>
    <p v-if="error">{{ error }}</p>
    <!-- Display error message -->
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";

export default {
  setup() {
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const { signup, error } = useSignup();

    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        // Clear form fields on successful signup
        displayName.value = "";
        email.value = "";
        password.value = "";
      }
    };

    return { displayName, email, password, handleSubmit, error };
  },
};
</script>

<style>
/* Add any necessary styling here */
</style>
