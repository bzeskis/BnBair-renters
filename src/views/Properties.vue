<template>
  <div class="properties">
    <div class="wrapper">
      <section class="hero">
        <div class="hero-body">
          <h1 class="title">
            See our properties
          </h1>
        </div>
      </section>

      <form class="field is-grouped" @submit.prevent="searchByName">
        <p class="control is-expanded">
          <input
            v-model="searchPhrase"
            class="input"
            type="text"
            placeholder="Search by name"
          />
        </p>
        <p class="control">
          <a class="button is-success">
            Search
          </a>
        </p>
      </form>

      <div class="field">
        <p class="control">
          <span class="select">
            <select v-model="citySelect" @change="filterByCity">
              <option selected>All</option>
              <option>Vilnius</option>
              <option>Kaunas</option>
              <option>Klaipėda</option>
            </select>
          </span>
        </p>
      </div>

      <div class="columns is-multiline">
        <div
          class="column is-one-third "
          v-for="property of filteredProperties"
          :key="property.id"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <router-link :to="{ path: `/order/${property.id}` }">
                  <img :src="property.image" alt="Image" />
                </router-link>
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <router-link :to="{ path: `/order/${property.id}` }">
                    <div class="content">
                      <p></p>
                      <h3 class="title">{{ property.name }}</h3>
                      <p>{{ property.description }}</p>
                      <p><strong> Price: </strong> {{ property.price }}€</p>
                      <p><strong> City: </strong> {{ property.city }}</p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="order-button">
              <a class="button" :href="'/order/' + property.id">Order</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  data() {
    return {
      properties: [],
      filteredProperties: [],
      searchPhrase: "",
      citySelect: "All"
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
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((item) => {
                this.properties.push({
                  id: item.id,
                  name: item.data().name,
                  city: item.data().city,
                  image: item.data().images[0],
                  price: item.data().price,
                  description: item.data().description
                });
                this.filteredProperties = this.properties;
              });
            });
        })
      );
  },
  methods: {
    filterByCity() {
      if (this.citySelect !== "All") {
        this.filteredProperties = this.properties.filter(
          (property) => property.city == this.citySelect
        );
      } else {
        this.filteredProperties = this.properties;
      }
    },
    searchByName() {
      this.filteredProperties = this.properties.filter((property) =>
        property.name.toLowerCase().includes(this.searchPhrase.toLowerCase())
      );
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
}

.card a {
  color: black;
}

.card {
  display: flex;
  flex-direction: column;
}

.order-button {
  text-align: center;
  margin: 1rem auto;
}

.card-content {
  padding-top: 0;
  padding-bottom: 0;
}

@media screen and (min-width: 768px) {
  .card {
    transition: transform 0.2s;
  }
  .card:hover {
    transform: translateY(4px);
  }
}
</style>
