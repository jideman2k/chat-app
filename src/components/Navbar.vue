<template>
  <nav v-if="user">
    <div>
      <p>
        Hey there <span class="name">{{ displayName }}</span>
      </p>
      <p>
        Currently logged in as..... <span class="email">{{ user.email }}</span>
      </p>
    </div>
    <button @click="handleClick">Logout</button>
  </nav>
</template>

<script>
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";
import getUser from "@/composables/getUser";
import { computed, onMounted } from "vue";

export default {
  name: "Navbar",
  setup() {
    const router = useRouter();
    const { error, logout } = useLogout();
    const { user, userError, updateUserProfile } = getUser();

    const displayName = computed(() => {
      return (
        user.value?.displayName || user.value?.email?.split("@")[0] || "User"
      );
    });

    const handleClick = async () => {
      await logout();

      if (!error.value) {
        router.push({ name: "Welcome" });
        console.log("user logged out");
      }
    };
    onMounted(async () => {
      if (user.value && !user.value.displayName) {
        await updateUserProfile(user.value.email.split("@")[0]);
      }
    });

    return { handleClick, user, userError, displayName };
  },
};
</script>

<style scoped>
.name,
.email {
  font-weight: bold;
}
</style>
