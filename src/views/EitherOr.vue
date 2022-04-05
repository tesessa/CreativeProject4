<template>
<div class="eithter">
<h1>Enter an either or question here</h1>
  <div class="add">
    <div class="form">
        <p><input v-model="item1" placeholder="option1">  or  <input v-model="item2" placeholder="option2"></p>
      <button @click="upload">Upload</button>
     </div>
  <section class="item-gallery">
     <div class="item" v-for="item in either" :key="item.id">
	<div class="print">
	<p><button @click="incrementClicks1(item)">{{item.item1}}</button>  votes: {{item.clicks1}}<span></span><button @click="incrementClicks2(item)">{{item.item2}}</button>  votes: {{item.clicks2}} </p>
        <button @click="deleteEither(item)">Delete</button>
            <br>
		<br>
        </div>
   </div>
 </section>
</div>
</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
   name: 'EitherOr',
   data() {
     return {
	either: [],
	item1: "",
	item2: "",
	clicks1: 0,
	clicks2: 0,
	addEither: null,
	findEither: null,	
     }
   },
   created() {
	this.getEither();
   },
   methods: {
   async getEither() {
	try {
          let response =  await axios.get('/api/either');
          this.either  = response.data;
          return true;
	} catch(error) {
		console.log(error);
	}
      },
    
    async upload() {
     try {
       let r1 = await axios.post('/api/either', {
            item1: this.item1,
            item2: this.item2,
            clicks1: 0,
            clicks2: 0,
       });
       this.addEither = r1.data;
       } catch (error) {
          console.log(error);
       }
    },
    async deleteEither(item) {
      try {
        await axios.delete('/api/either/' + item._id, {
        });
        this.findEither = null;
        this.getEither();
        return true;
        } catch(error) { 
           console.log(error);
       }
     },
    async incrementClicks1(item) {
     try {
	await axios.put('/api/either/' + item._id, {
        });
	this.findEither = null;
	this.getEither();
	return true;
	} catch(error) {
           console.log(error);
	}
      },
   async incrementClicks2(item) {
     try {
	await axios.patch('/api/either/' + item._id, {
	});
	this.findEither = null;
	this.getEither();
	return true;
	} catch (error) {
           console.log(error);
	}
     }, 
},
}
</script>


<style scoped>
.question {
display: flex;
text-align: center;
justify-content: center;
}

.print button {
	height: 150%;
	width: 200px;	
	  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

span  {
	margin-left: 70px;
}

</style>
