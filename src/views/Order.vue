<template>
  <div class="order">
    <div class="modals" :class="{ 'is-active': isActive }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <p class="title has-text-white">
          Total price: <span> {{ totalPrice }}€</span>
        </p>
        <StripeVueCard />
      </div>
      <button
        @click="isActive = false"
        class="modal-close is-large"
        aria-label="close"
      ></button>
    </div>

    <div class="wrapper">
      <div class="box">
        <div class="media top">
          <h3 class="title">{{ property.name }}</h3>
          <router-link class="button" to="/properties">Back</router-link>
        </div>
        <article class="media" id="order-media">
          <carousel>
            <slide v-for="index in imgCounter" :key="index">
              <img :src="property.images[index - 1]" alt="Image" />
            </slide>
          </carousel>
          <div class="media-content">
            <div class="content">
              <p></p>
              <p>{{ property.description }}</p>
              <p><strong> Price per night: </strong> {{ property.price }}€</p>
              <div class="date-select">
                <label for="month">Select month: </label>
                <select name="month" v-model="month">
                  <option value="0">January</option>
                  <option value="1">February</option>
                  <option value="2">March</option>
                  <option value="3">April</option>
                  <option value="4">May</option>
                  <option value="5">June</option>
                  <option value="6">July</option>
                  <option value="7">August</option>
                  <option value="8">September</option>
                  <option value="9">October</option>
                  <option value="10">November</option>
                  <option value="11">December</option>
                </select>
              </div>
            </div>
          </div>
        </article>
        <div class="bottom">
          <div class="media-left">
            <Notification
              :display="success"
              type="is-success"
              message="Successfully made an order"
            />

            <table class="table is-striped is-hoverable is-bordered">
              <thead>
                <tr>
                  <th>Available Dates</th>
                  <th>Book</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(date, index) of allDates" :key="index">
                  <td>{{ date.toLocaleDateString("lt-LT") }}</td>
                  <td>
                    <input
                      :value="date.getTime()"
                      type="checkbox"
                      @change="updateOrder($event)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="media-right">
            <p class="subtitle">
              Total price: <span> {{ totalPrice }}€</span>
            </p>
            <button @click="makeOrder" class="button is-dark">
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Notification from "@/components/Notification";
import StripeVueCard from "@/components/StripeVueCard";

export default {
  components: {
    Notification,
    StripeVueCard
  },
  data() {
    return {
      property: {
        id: "",
        name: "",
        price: "",
        description: "",
        images: []
      },
      imgCounter: 0,
      totalPrice: 0,
      isActive: false,
      complete: false,
      month: 0,
      allDates: [],
      busyDates: [],
      orderedDates: [],
      success: false
    };
  },
  methods: {
    updateOrder(e) {
      if (this.orderedDates.includes(e.target.value)) {
        const index = this.orderedDates.indexOf(e.target.value);
        if (index !== -1) this.orderedDates.splice(index, 1);
      } else {
        this.orderedDates.push(e.target.value);
      }
      this.totalPrice = this.property.price * this.orderedDates.length;
    },
    makeOrder() {
      this.success = false;
      firebase
        .firestore()
        .collection("users")
        .get()
        .then((snapshot) =>
          snapshot.docs.forEach((doc) => {
            firebase
              .firestore()
              .collection("users")
              .doc(doc.id)
              .collection("properties")
              .doc(this.$route.params.id)
              .set(
                {
                  orderedDates: this.orderedDates
                },
                { merge: true }
              );
            this.success = true;
          })
        );
    }
  },
  watch: {
    month: function getDaysInMonth(month) {
      const today = new Date().getTime();
      let date = new Date(2020, month, 1);
      let days = [];
      while (date.getMonth() == month) {
        if (new Date(date).getTime() > today) {
          days.push(new Date(date));
        } else {
          days = [];
        }
        date.setDate(date.getDate() + 1);
      }
      for (let i = days.length - 1; i >= 0; --i) {
        if (this.busyDates.includes(String(days[i].getTime()))) {
          days.splice(i, 1); // Remove even numbers
        }
      }
      this.allDates = days;
    }
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) => {
          firebase
            .firestore()
            .collection("users")
            .doc(doc.id)
            .collection("properties")
            .doc(this.$route.params.id)
            .get()
            .then((doc) => {
              this.property.id = doc.id;
              this.property.name = doc.data().name;
              this.property.price = doc.data().price;
              this.property.description = doc.data().description;
              this.property.images = doc.data().images;
              this.imgCounter = this.property.images.length;
              this.busyDates = doc.data().orderedDates || [];
            });
        })
      );
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
}
article {
  display: flex;
  flex-direction: column;
}
.media-left {
  width: 70%;
}
.media-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding-top: 1rem;
}
.media-right button {
  margin-top: 1rem;
}

.media-left table {
  width: 100%;
}

.box {
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.top {
  display: flex;
  justify-content: space-between;
}

.bottom {
  margin-top: 1rem;
}

.bottom > * {
  margin: 0 auto;
  text-align: center;
}

#order-media {
  margin-top: 0;
  padding-top: 0;
}

td,
th {
  text-align: center !important;
}

@media screen and (min-width: 480px) {
  .bottom {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  .media-right {
    padding-top: 0rem;
  }
}
div .modal-background {
  color: white !important;
}
</style>
