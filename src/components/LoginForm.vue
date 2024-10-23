<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />

    <button type="submit" :disabled="isPending">Sign in</button>
    <div class="loading" v-if="isPending">Loading...</div>
    <div class="remember-me">
      <input type="checkbox" v-model="rememberMe" />
      <p>Remember me</p>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

import useLogin from "../composables/useLogin";

export default {
  setup(_, { emit }) {
    const email = ref("");
    const password = ref("");
    const rememberMe = ref(false);
    const router = useRouter();

    const { login, error, isPending } = useLogin();

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        emit("login");
      }
    };
    return { email, password, handleSubmit, isPending, error, rememberMe };
  },
};
</script>

<style scoped>
.remember-me {
  display: flex;
  align-items: center;
}

.remember-me input[type="checkbox"] {
  align-self: center;
  vertical-align: middle;
  margin: 0 10px;
  width: 15px;
}

.remember-me p {
  display: inline-block;
}
</style>
