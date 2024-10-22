<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <div class="error" v-if="v$.email.$error">
      {{ v$.email.$errors[0].$message }}
    </div>
    <div class="error" v-if="v$.password.$error">
      {{ v$.password.$errors[0].$message }}
    </div>
    <button type="submit" :disabled="loading">Sign in</button>
    <div class="loading" v-if="loading">Loading...</div>
    <div class="remember-me">
      <input type="checkbox" v-model="rememberMe" />
      <p>Remember me</p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const rememberMe = ref(false);

    const rules = {
      email: { required, email },
      password: { required },
    };

    const v$ = useVuelidate(rules, { email, password });

    const handleSubmit = async () => {
      const isFormValid = await v$.value.$validate();
      if (!isFormValid) return;

      loading.value = true;
      // Handle form submission here
      console.log(email.value, password.value, "Form submitted");
      loading.value = false;
    };

    return { email, password, handleSubmit, v$, loading, rememberMe };
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
