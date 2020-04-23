<template>
  <nav class="navbar navbar-expand-lg navbar-light  outline mb-3">
    <router-link class="navbar-brand text-light" id="navbar-font" :to="{ name: 'home' }"
      >Kanban</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto ">
        <li class="nav-item" :class="{ active: $route.name == 'home' }">
          <router-link :to="{ name: 'home' }" class="nav-link text-light"
            >Home</router-link
          >
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'boards' }"
        >
          <router-link class="nav-link text-light" :to="{ name: 'boards' }"
            >Dashboard</router-link
          >
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-success"
          @click="login"
          v-if="!$auth.isAuthenticated"
        >
          Login
        </button>
        <button class="btn btn-danger" @click="logout" v-else>logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import axios from "axios";

let _api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
});
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    async logout() {
      // this.$store.dispatch("resetBearer");
      await this.$auth.logout({returnTo:window.location.origin});
    }
  }
};
</script>

<style>
#navbar-font{
  font-family: 'Pacifico', cursive;
  font-size: 1.7rem;
}
.navbar{
  background-color: #5f4c4f;
}
.outline{
  border-top: 0px ;
  border-left: 0px ;
  border-right: 0px ;
  border-bottom: 2px;
  border-color: rgb(84, 82, 74, 20);
  border-style: solid;
}
.text-light{
  color: rgb(156, 156, 156);
}
</style>
