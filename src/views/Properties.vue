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

      <div v-for="property of filteredProperties" :key="property.id" class="box">
        <article class="media">
          <div class="media-left">
            <router-link :to="{ path: `/view/${property.id}` }">
              <img :src="property.image" alt="Image" />
            </router-link>
          </div>
          <div class="media-content">
            <router-link :to="{ path: `/view/${property.id}` }">
              <div class="content">
                <p></p>
                <h3 class="title">{{ property.name }}</h3>
                <p>{{ property.description }}</p>
                <p><strong> Price: </strong> {{ property.price }}€</p>
                <p><strong> City: </strong> {{ property.city }}</p>
              </div>
            </router-link>
          </div>

          <a class="button" :href="'/order/' + property.id">Order</a>
        </article>
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
        property.name.includes(this.searchPhrase)
      );
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
  align-items: center;
}
a .button {
  margin-top: 1rem;
}

.box a {
  color: black;
}

.box:last-child {
  margin-bottom: 2rem;
}

.media-content {
  text-align: center;
  margin-bottom: 1rem;
}

@media screen and (min-width: 768px) {
  .media-content {
    margin-right: 1rem;
    text-align: left;
  }
  article {
    flex-direction: row;
  }
  .media-left {
    width: 30%;
  }
  .box {
    transition: transform 0.2s;
  }
  .box:hover {
    transform: translateX(5px);
  }
}
</style>
