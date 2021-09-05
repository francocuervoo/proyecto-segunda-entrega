<script>
import Sidebar from "@/components/sidebar/Sidebar";
import { sidebarWidth } from "@/components/sidebar/state";
export default {
  components: {
    Sidebar,
  },
  setup() {
    return { sidebarWidth };
  },
};
</script>

<template>
  <Sidebar />
  <div :style="{ 'margin-left': sidebarWidth }">
    <router-view />
  </div>
</template>
