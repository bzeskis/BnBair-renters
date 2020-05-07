<template>
  <div id="app">
    <h1 class="title has-text-white">Please give us your payment details:</h1>
    <card
      class="stripe-card"
      :class="{ complete }"
      stripe="pk_test_WtTXdmyK0Qfhh7HpvER9SPaL0042EloOij"
      @change="complete = $event.complete"
    />
    <button class="pay-with-stripe" @click="pay" :disabled="!complete">
      Pay with credit card
    </button>
  </div>
</template>

<script>
import { Card, createToken } from "vue-stripe-elements-plus";

export default {
  data() {
    return {
      complete: false
    };
  },

  components: { Card },

  methods: {
    pay() {
      createToken().then((data) => console.log(data.token));
    }
  }
};
</script>

<style scoped>
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
  z-index: 1000;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #b300ff;
  z-index: 1000;
}

.StripeElement--invalid {
  border-color: #fa755a;
  z-index: 1000;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5;
  z-index: 1000;
}
.stripe-card {
  border: 1px solid grey;
  color: white !important;
}
.stripe-card.complete {
  border-color: green;
}

</style>
