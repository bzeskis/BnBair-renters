<template>
  <div class="properties">
    <div class="wrapper">
      <section class="hero">
        <div class="hero-body">
          <h1 class="title">
            My Properties
          </h1>
        </div>
      </section>

      <div v-for="property of properties" :key="property.id" class="box">
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
              </div>
            </router-link>
          </div>

          <a class="button" :href="'/edit/' + property.id">Edit</a>
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
      properties: []
    };
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged(() => {
      firebase
        .firestore()
        .collection("properties")
        .where("uid", "==", firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((item) => {
            this.properties.push({
              id: item.id,
              name: item.data().name,
              city: item.data().city,
              image: item.data().image,
              price: item.data().price,
              description: item.data().description
            });
          });
        });
    });
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
