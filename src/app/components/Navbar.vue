<template>
  <nav class="sq-navbar" role="navigation">
    <div class="sq-navbar-logo">
      <img src="../assets/logo.png" alt="Uma espada e um escudo">
      <span>SideQuest</span>
    </div>
  </nav>
</template>

<style scoped>
@import '../assets/variables.css';

.sq-navbar {
  height: 3.5rem;
  background-color: var(--primary-color);
}

.sq-navbar-logo {
  height: 100%;
  display: flex;
  align-items: center;
  color: var(--secondary-color);
  max-width: 200px;
  margin: 0 2rem;
  justify-content: center;
}

.sq-navbar-logo img {
  max-height: 2.5rem;
  height: auto;
  margin-right: 10px;
}

.sq-navbar-logo span {
  font-size: 1.5rem;
}
</style>

