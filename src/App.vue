<template>
  <div id="app">
    <div class="wrapper">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="@/assets/bnbairlogo.png" width="112" height="28" />
          </a>

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div v-if="isLoaded" class="navbar-end">
            <div class="navbar-item">
              <div v-if="!loggedIn" class="buttons">
                <router-link to="/register" class="button is-success">
                  <strong>Sign up</strong>
                </router-link>
                <router-link to="/login" class="button is-light">
                  Log in
                </router-link>
              </div>
              <div v-else class="buttons">
                <button class="button is-success">
                  <router-link to="/properties">See All</router-link>
                </button>
                <button @click="signOut" class="button is-light">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <router-view />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      loggedIn: null,
      isLoaded: false
    };
  },
  methods: {
    signOut() {
      firebase.auth().signOut();
    }
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      user ? (this.loggedIn = true) : (this.loggedIn = false);
      this.isLoaded = true;
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
</script>

<style>
.wrapper {
  width: 95%;
  margin: 0 auto;
}
.navbar-item,
.hero-body {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

button a {
  color: white;
}

#changeProp {
  margin: 0;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .wrapper {
    width: 80%;
  }
}
</style>
