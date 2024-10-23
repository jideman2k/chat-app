<script>
import SignForm from "../components/SignForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Welcome",
  components: {
    SignForm,
    LoginForm,
  },

  setup() {
    const show = ref(true);
    const router = useRouter();
    const enterChat = () => {
      router.push({ name: "Chat" });
    };

    return { show, enterChat };
  },
};
</script>

<template>
  <main class="welcome container">
    <div v-if="show">
      <h2 class="title">Login</h2>
      <LoginForm @login="enterChat" />
      <p>Not a member yet? <span @click="show = false">Sign Up</span></p>
    </div>
    <div v-else>
      <h2 class="title">Sign Up</h2>
      <SignForm @signup="enterChat" />
      <p>Already a member? <span @click="show = !show">Login</span></p>
    </div>
  </main>
</template>
<style>
.welcome {
  text-align: center;
  padding: 20px;
}

.welcome h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.welcome form {
  width: 400px;
  margin: 20px auto;
}

.welcome label {
  display: block;
  margin: 20px 0 10px;
}

.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #eee;
  outline: none;
  color: #999;
  margin: 10px auto;
}

.welcome span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  -moz-text-decoration: underline;
}

.welcome button {
  margin-top: 20px;
  padding: 7px 20px;
}
</style>
