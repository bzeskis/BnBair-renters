<template>
  <div class="edit">
    <div class="wrapper">
      <div class="box">
        <h3 class="title">{{ property.name }}</h3>
        <article class="media">
          <div class="media-left">
            <img :src="property.image" alt="Image" />
          </div>
          <div class="media-content">
            <div class="content">
              <p></p>
              <p>{{ property.description }}</p>
              <p><strong> Price: </strong> {{ property.price }}€</p>
            </div>
          </div>
        </article>
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
        image: ""
      }
    };
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("properties")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.property.id = doc.id;
        this.property.name = doc.data().name;
        this.property.price = doc.data().price;
        this.property.description = doc.data().description;
        this.property.image = doc.data().image;
      })
      .then(() => console.log(this.property));
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
  width: 100%;
}
.box {
  margin-bottom: 2rem;
}

@media screen and (min-width: 768px) {
}
</style>
