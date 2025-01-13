<template>
  <div class="app-layout">
    <header class="header">
      <nav class="nav">
        <NuxtLink to="/" class="logo">Образовательная платформа</NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/courses">Курсы</NuxtLink>
          <NuxtLink to="/profile">Профиль</NuxtLink>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <NuxtPage />
    </main>

    <footer class="footer">
      <p>&copy; 2024 Образовательная платформа</p>
    </footer>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background: #42b983;
  color: white;
  padding: 1rem 2rem;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover {
  text-decoration: underline;
}

.main-content {
  flex: 1;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
}
</style>
