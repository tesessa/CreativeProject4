<template>
  <div class="review">
    <h1>Thanks for coming to my website please review!</h1>
    <h3>Add a review</h3>
    <div class="add">
     <div class="form">
      <div class="center">
      <input v-model="name" placeholder="Name">
      <p></p>
	</div>
	<div class="center">
      <textarea v-model="comment" placeholder="What do you think of this website?"></textarea>
      <p></p>
	</div>
	<div class="center">
      <button @click="upload">Submit</button>
     </div>
	</div>
  </div>
 <div class="post">
    <section class="review-post">
	<div class="image" v-for="review in reviews" :key="review.id">
		<h3>{{review.name}}<span></span> <button @click="deleteReview(review)">Delete</button></h3>
		<p>{{review.comment}}</p>
	</div>  
  </section>
</div>
  </div>
</template>


<script>
/* eslint-disable */
import axios from 'axios';

export default {
    name: 'Review',
    data() {
      return {
	name: "",
	comment: "",
	addReview: null,
        reviews: [],
	findReview: null,
	findName: "",
      }
    },
    computed: {
	suggestions() {
          let reviews = this.reviews.filter(review => review.name.toLowerCase().startsWith(this.findName.toLowerCase()));
	return reviews.sort((a,b) => a.name > b.name);
      }
    },
    created() {
       this.getReviews();
    },
    methods: {
    async getReviews() {
      try {
          let response = await axios.get("/api/reviews");
          this.reviews = response.data;
          return true;
     } catch(error) {
          console.log(error);
     }
    },
  async upload() {
   try {
     let r1 = await axios.post('/api/reviews', {
	name: this.name,
	comment: this.comment
     });
     this.addItem = r1.data;
    } catch (error) {
	console.log(error);
    }
   },
  async deleteReview(review) {
   try {
	await axios.delete("/api/reviews/" + review._id, {
	});
	this.getReviews();
	return true;
	} catch (error) {
		console.log(error);
	}
   },
}
}
</script>

<style scoped>
.review {
	top: 120px;
}

button {
    font-family: 'Montserrat', sans-serif;
    font-size: 1em;
}

textarea {
    width: 100%;
    max-width: 500px;
    height: 100px;
}

.add {
  display: flex;
}

input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  text-align: center;
}

.form {
 margin: 0 auto; 
}

.upload h2 {
  margin: 0px;
}

.image {
	text-align: center;
	justify-content: center;
}

.center {
	justify-content: center;
}

span  {
        margin-left: 50px;
}
</style>
