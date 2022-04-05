const express=require('express')
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: false
}));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/statistic', {
        useNewUrlParser: true
});

const reviewSchema = new mongoose.Schema({
        name: String,
        comment: String,
});

const eitherSchema = new mongoose.Schema({
        item1: String,
        item2: String,
        clicks1: Number,
        clicks2: Number,
});


const bookSchema = new mongoose.Schema({
        title: String,
        name: String,
        author: String,
        votes: { type: Number, default: 0 },
});



const Either = mongoose.model('Either', eitherSchema);
const Review = mongoose.model('Review', reviewSchema);
const Book = mongoose.model("Book", bookSchema);

bookSchema.methods.votes = function(cb) {
        this.votes +=1;
        this.save(cb);
};

app.get('/api/reviews', async (req, res) => {
        try {
                let reviews = await Review.find();
                res.send(reviews);
        } catch (error) {
                console.log(error);
                res.sendStatus(500);
        }
});

app.post('/api/reviews', async (req, res) => {
//      console.log("api/reviews", req.body.name);
        const review = new Review({
                name: req.body.name,
                comment: req.body.comment,
        });
        try {
                await review.save();
                res.send(review);
        } catch (error) {
                console.log(error);
                res.sendStatus(500);
        }
});

app.delete('/api/reviews/:id', async (req,res) => {
        console.log("Delete", req.params.id);
        try {
                await Review.deleteOne({
                _id: req.params.id
                });
                res.sendStatus(200);
        } catch (error) {
                console.log(error);
                res.sendStatus(500);
        }
});

app.get('/api/books', async (req,res) => {
        try {
                let books = await Book.find();
                res.send(books);
        } catch (error) {
                console.log(error);
                res.sendStatus(500);
        }
});

app.post('/api/books', async (req, res) => {
        const book = new Book({
                title: req.body.title,
                name: req.body.name,
                author: req.body.author,
                votes: req.body.votes,
        });
        try {
                await book.save();
                res.send(book);
        } catch (error) {
                console.log(error);
                res.sendStatus(500);
        }
});

app.delete('/api/books/:id', async (req,res) => {
        console.log("Delete", req.params.id);
        try {
                await Book.deleteOne({
                _id: req.params.id
                });
                res.sendStatus(200);
        } catch (error) {
                console.log(error);
                res.sendStatus(500);
        }
});

app.put('/api/books/:id', async (req, res) => {
        console.log('Edit', req.params.id);
        let book = await Book.findOne({
                _id: req.params.id
        });
        book.votes++;
        try {
                await book.save();
                res.send(book);
        }catch(error) {
                console.log(error);
                res.sendStatus(500);
        }
});

app.get('/api/either', async (req, res) => {
        try {
                let eitherOr = await Either.find();
                res.send(eitherOr);
        } catch (error) {
                console.log(error);
                res.sendStatus(500);
        }
});

app.post('/api/either', async (req, res) => {
//      console.log("api/reviews", req.body.name);
      const eitherOr = new Either({
              item1: req.body.item1,
              item2: req.body.item2,
              clicks1: req.body.clicks1,
              clicks2: req.body.clicks2,
      });
        try {
                await eitherOr.save();
                res.send(eitherOr);
        } catch (error) {
                console.log(error);
                res.sendStatus(500);
        }
});

app.delete('/api/either/:id', async (req,res) => {
        console.log("Delete", req.params.id);
        try {
                await Either.deleteOne({
                        _id: req.params.id
                });
                res.sendStatus(200);
        } catch(error) {
                console.log(error);
                res.sendStatus(500);
        }
});

app.put('/api/either/:id', async (req, res) => {
        console.log("Increment Clicks1", req.params.id);
        let eitherOr = await Either.findOne({
                _id: req.params.id
        });
        eitherOr.clicks1++;
        try {
                await eitherOr.save();
                res.send(eitherOr);
        } catch (error) {
                console.log(error);
                res.sendStatus(500);
        }
});

app.patch('/api/either/:id', async (req, res) => {
        console.log("Increment Clicks2", req.params.id);
        let eitherOr = await Either.findOne({
                _id: req.params.id
        });
        eitherOr.clicks2++;
        try {
                await eitherOr.save();
                res.send(eitherOr);
        } catch(error) {
                console.log(error);
                res.sendStatus(500);
        }
});



app.listen(5050, () => console.log('Server listening on port 5050!'));
                                                              212,9         Bot
