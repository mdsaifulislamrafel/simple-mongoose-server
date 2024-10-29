const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const app = express()
const port = 5000
app.use(express.json())


// mongoose schema
const todoSchema = new mongoose.Schema({
    name: String,
    education: String,
});

const Todo = mongoose.model('Todo', todoSchema);


const uri = "mongodb+srv://todo_user:B1EHEEMBRIKEb8BH@cluster0.2lraink.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0";
// const todoCollection = client.db("todoDB").collection("todos");

async function run() {
    try {

        await mongoose.connect(uri);

        app.get('/todos', async (req, res) => {
            const todos = await Todo.find({});
            res.send(todos);
        });


        app.post('/todo', async (req, res) => {
            const todoData = req.body;
            // const todo = new Todo(todoData);
            // todo.save();
            const todo = await Todo.create(todoData);
            res.send({
                message: "Todo added successfully",
                todo
            });
        });



        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();    
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})