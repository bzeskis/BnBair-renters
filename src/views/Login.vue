<template>
  <div class="log">
    <div class="wrapper">
      <form @submit.prevent="login">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input
              v-model="email"
              class="input"
              type="email"
              placeholder="Email@address.com"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input
              v-model="password"
              class="input"
              type="password"
              placeholder="Enter password"
            />
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button
              type="submit"
              class="button is-dark"
              :class="{ 'is-loading': loading }"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => (this.loading = false))
        .then(() => {
          this.$router.replace("/properties");
        })
        .catch((e) => console.log(e.message));
    }
  }
};
</script>

<style></style>
