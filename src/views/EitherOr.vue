<template>
  <div class="either">
	<p v-for="item in percentages" :key="item.id"><button @click="incrementClicks1(item)">{{item.item1}}</button>  votes: {{item.clicks1}}<span></span><button @click="incrementClicks2(item)">{{item.item2}}</button>  votes: {{item.clicks2}}</p>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
   name: 'EitherOr',
   data() {
     return {
	percentages: [],
	item1: "",
	item2: "",
	clicks1: 0,
	clicks2: 0,
	findItem: null,	
     }
   },
   created() {
	this.getEither();
   },
   methods: {
   async getEither() {
	try {
          let response =  await axios.get('/api/percentages');
          this.percentages = response.data;
          return true;
	} catch(error) {
		console.log(error);
	}
      },
   async incrementClicks1(item) {
	try {
	await axios.put("/api/percentages" , {
		clicks1: this.item.clicks1 + 1,
	});
	this.findItem = null;
	this.getEither();
	return true;
	} catch (error) {
         console.log(error)
	}
   },
   incrementClicks2(item) {
	item.clicks2 = item.clicks2+1;
   }
    
},
}
</script>


<style scoped>
.question {
display: flex;
text-align: center;
justify-content: center;
}

.either button {
	height: 150%;
	width: 200px;	
	  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

span  {
	margin-left: 70px;
}

</style>
