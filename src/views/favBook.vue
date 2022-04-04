<template>
<div class = "book">
   <h1>Enter your Favorite Book</h1>
   <div class="add">
     <div class="form">
       <input v-model="title" placeholder="Title">
	<p></p>
	<input v-model="author" placeholder="Author"> <span></span>
	<input v-model="name" placeholder="Name">
	<button @click="upload">Upload</button>      
      </div>
	<br />
     <section class="book-gallery">
	<div class="book" v-for="book in books" :key="book.id">
<p>	<button @click="incrementVotes(book)">{{book.title}}</button> votes: {{book.votes}}</p>
	<p>By: {{book.author}}, posted by: {{book.name}} <button @click="deleteBook(book)">Delete</button> </p>
     </div>
    </section>
</div>

  </div>
</template>

<script>
/* eslint-disable */ 
import axios from 'axios';
export default {
	name: 'favBook',
	data() {
         return {
           name: "",
           title: "",
           author: "",
           votes: 0,
           addBook: null,
           books: [],
           findBook: null,
         }
        },
    created() {
       this.getBooks();
    },
    methods: {
	async getBooks() {
          try {
             let response = await axios.get('/api/books');
             this.books = response.data;
             return true;
            } catch (error) {
              console.log(error);
            }
        },
      async upload() {
       try {
	let r1 = await axios.post('/api/books', {
            title: this.title,
            name: this.name,
            author: this.author,
            votes: 0,
	});
	this.addBook = r1.data;
	} catch (error) {
           console.log(error);
	}
      },
      async incrementVotes(book) {
	try {
          await axios.put("/api/books/" + book._id, {
		
          });
          this.findBook = null;
          this.getBooks();
          return true;
        } catch (error) {
	console.log(error);
        }
    },
    async deleteBook(book) {
     try {
	await axios.delete("/api/books/" + book._id, {
	});
	this.findBook = null;
	this.getBooks();
	return true;
	} catch (error) {
          console.log(error);
	}
     },
  },
}
</script>
