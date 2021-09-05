<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/productos" icon="fas fa-calculator"
      >Ver Productos</SidebarLink
    >
    <SidebarLink to="/carrito" icon="fas fa-calculator"
      >Ver Carrito</SidebarLink
    >
    <SidebarLink to="/carrito" icon="fas fa-calculator"
      >Actualizar Producto</SidebarLink
    >
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink";
import { collapsed, toggleSidebar, sidebarWidth } from "./state";

export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth };
  },
};
</script>

<style>
:root {
  --sidebar-bg-color: #4dc6e6;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #26b1bf;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}
.sidebar h1 {
  height: 2.5em;
  margin-bottom: 5rem;
}
.separator-sidebar {
  background-color: white;
  border: 1px solid white;
  margin: 1rem 0 1rem 0;
}
.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
