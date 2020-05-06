<template>
  <div class="notification" v-if="display" v-bind:class="type">
    <button class="delete" @click="display = false"></button>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    display: Boolean,
    message: String,
    type: String
  }
};
</script>

<style></style>
