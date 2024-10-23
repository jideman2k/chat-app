<template>
  <nav>
    <div>
      <p>Hey there........ displayName</p>
      <p>Currently logged in as..... <span class="email">email</span></p>
    </div>
    <button @click="handleClick">Logout</button>
  </nav>
</template>

<script>
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";

export default {
  name: "Navbar",
  setup() {
    const router = useRouter();
    const { error, logout } = useLogout();

    const handleClick = async () => {
      await logout();

      if (!error.value) {
        router.push({ name: "Welcome" });
        console.log("user logged out");
      }
    };

    return { handleClick };
  },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
