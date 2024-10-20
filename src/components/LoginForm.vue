<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" placeholder="Email" v-model="email" required />
    <input type="password" placeholder="Password" v-model="password" required />
    <button type="submit">Sign in</button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const handleSubmit = () => {
      // Handle form submission here
      console.log(displayName.value, email.value, "Form submitted");
    };

    return { email, password, handleSubmit };
  },
};
</script>

<style></style>
