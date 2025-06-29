<script setup lang="ts">
// Home page по макету Battle Mile
</script>

<template>
  <div class="home-root">
    <!-- Intro + меню -->
    <div class="intro-block">
      <div class="intro-menu">
        <div class="logo">ACE BATTLE EVENTS</div>
        <nav>
          <a href="/add-coins" class="menu-link">Buy</a>
          <a href="#" class="menu-link">Analyse</a>
          <a href="#" class="menu-link">Register</a>
          <a href="#" class="menu-link">Win</a>
        </nav>
      </div>
    </div>
    <!-- Баннер -->
    <div class="banner-block">
      <div class="banner-title">BATTLE MILE</div>
      <div class="banner-label">RUNNING COMPETITIONS</div>
    </div>
    <!-- Приветствие -->
    <div class="welcome-block">
<!--      <img src="/src/assets/welcome.jpg" alt="Battle Mile" class="welcome-img" />-->
      <div class="welcome-text">
        <h2>Welcome to the revolutionary world of Battle Mile.</h2>
        <p>Running events have been transformed into epic battles between teams. We are thrilled to present to you our cutting-edge web metaplatform, designed exclusively for running club managers and coaches.</p>
      </div>
    </div>
    <!-- Join us -->
    <div class="join-block">
      <div class="join-left">
        <div class="join-title">Join us in this extraordinary journey.</div>
      </div>
      <div class="join-center">
        <p>Join us in this extraordinary journey, where precision meets competition and running tournaments are transformed into epic battles. ACE Battle brings a new, unparalleled experience, giving you edge over your rivals. Join today and become history in the realm of running battles.</p>
      </div>
    </div>
    <!-- Additional resources -->
    <div class="resources-block">
      <div class="resources-title">Additional resources</div>
      <div class="resources-links">
        <a href="#" class="resource-link">ACE BATTLE BET</a>
        <a href="#" class="resource-link">ACE BATTLE ASSOCIATION</a>
      </div>
    </div>
    <!-- Ace Battle Websites -->
    <div class="websites-block">
      <div class="websites-text">
        <h3>Ace Battle Websites</h3>
        <p>You can find additional ace battle websites to dive deeper into the idea of our organization. "ACE Battle Bet" — betting website for our competitions: you can analyse results there and get more. "ABA" — association page, giving you more ways to collaborate with our organization and past results.</p>
      </div>
      <div class="websites-logos">
        <div class="website-logo">ACE BATTLE BET</div>
        <div class="website-logo">ACE BATTLE ASSOCIATION</div>
      </div>
    </div>
    <footer class="footer">ACE BATTLE EVENTS<br />© 2023 Ace Battle Association</footer>
  </div>
</template>

<style scoped>
.home-root {
  background: #232323;
  color: #fff;
  min-height: 100vh;
  font-family: 'Montserrat', Arial, sans-serif;
}
.intro-block {
  background: url('/src/assets/intro-bg.jpg') center/cover no-repeat;
  padding: 0 0 40px 0;
}
.intro-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
}
.logo {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 18px;
}
nav {
  display: flex;
  gap: 32px;
}
.menu-link {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: border 0.2s;
}
.menu-link:hover {
  border-bottom: 2px solid #e53935;
}
.banner-block {
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 900px;
  position: relative;
  margin-top: 32px;
}
.banner-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  background: #232323;
  padding: 18px 32px;
  border-radius: 8px 0 0 8px;
}
.banner-label {
  background: #e53935;
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 18px 32px;
  border-radius: 0 0 0 0;
  margin-left: -8px;
  clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
}
.welcome-block {
  display: flex;
  align-items: center;
  gap: 32px;
  max-width: 900px;
  margin: 48px auto 0 auto;
  background: #fff;
  color: #232323;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  padding: 32px 32px 32px 32px;
}
.welcome-img {
  width: 180px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
}
.welcome-text h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
}
.welcome-text p {
  font-size: 1.1rem;
  color: #444;
}
.join-block {
  display: flex;
  max-width: 900px;
  margin: 40px auto 0 auto;
  gap: 32px;
}
.join-left {
  flex: 1;
  display: flex;
  align-items: flex-start;
}
.join-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  background: #232323;
  padding: 18px 24px;
  border-radius: 8px;
}
.join-center {
  flex: 2;
  background: #fff;
  color: #232323;
  border-radius: 8px;
  padding: 18px 24px;
  font-size: 1.05rem;
}
.resources-block {
  background: #fff;
  color: #232323;
  max-width: 320px;
  margin: 40px auto 0 auto;
  border-radius: 8px;
  padding: 24px 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.resources-title {
  font-weight: 700;
  margin-bottom: 12px;
}
.resources-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.resource-link {
  color: #232323;
  font-weight: 600;
  text-decoration: none;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 8px 12px;
  transition: background 0.2s;
}
.resource-link:hover {
  background: #e53935;
  color: #fff;
}
.websites-block {
  max-width: 900px;
  margin: 48px auto 0 auto;
  background: #fff;
  color: #232323;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  padding: 32px;
  display: flex;
  gap: 32px;
  align-items: flex-start;
}
.websites-text {
  flex: 2;
}
.websites-logos {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: flex-end;
}
.website-logo {
  font-size: 1.1rem;
  font-weight: 700;
  background: #232323;
  color: #fff;
  padding: 12px 18px;
  border-radius: 8px;
  margin-bottom: 8px;
  min-width: 180px;
  text-align: center;
}
.footer {
  text-align: center;
  color: #bbb;
  font-size: 0.95rem;
  margin: 48px 0 0 0;
  padding: 18px 0 8px 0;
}

@media (max-width: 900px) {
  .welcome-block, .websites-block, .join-block {
    flex-direction: column;
    gap: 18px;
    padding: 18px;
  }
  .banner-block {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 12px;
  }
  .websites-logos {
    align-items: flex-start;
  }
}
@media (max-width: 600px) {
  .intro-menu {
    padding-top: 18px;
  }
  .logo {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  nav {
    gap: 16px;
    font-size: 0.95rem;
  }
  .banner-title, .banner-label {
    font-size: 1.1rem;
    padding: 10px 12px;
  }
  .welcome-block, .websites-block, .join-block {
    padding: 8px;
    gap: 10px;
  }
  .welcome-img {
    width: 100px;
    height: 120px;
  }
  .website-logo {
    min-width: 120px;
    font-size: 0.95rem;
    padding: 8px 10px;
  }
  .footer {
    font-size: 0.8rem;
    padding: 10px 0 4px 0;
  }
}
</style> 