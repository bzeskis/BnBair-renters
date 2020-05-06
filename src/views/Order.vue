<template>
  <div class="order">
    <div class="wrapper">
      <div class="box" v-if="imagesExist">
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
            </div>
          </div>
        </article>
        <div class="bottom">
          <div class="media-left">
            <table class="table is-striped is-hoverable is-bordered">
              <thead>
                <tr>
                  <th>Available Dates</th>
                  <th>Book</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2020 - 05 - 06</td>
                  <td><input type="checkbox" /></td>
                </tr>
                <tr>
                  <td>2020 - 05 - 06</td>
                  <td><input type="checkbox" /></td>
                </tr>
                <tr>
                  <td>2020 - 05 - 06</td>
                  <td><input type="checkbox" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="media-right">
            <p>
              Total price: <span> {{ totalPrice }}€</span>
            </p>
            <button class="button is-dark">Order</button>
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

export default {
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
      totalPrice: 100
    };
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
            });
        })
      );
  },
  computed: {
    imagesExist() {
      return this.imgCounter > 0;
    }
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
</style>
