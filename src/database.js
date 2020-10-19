const { connect } = require('mongoose');

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.x2ibd.mongodb.net/recipes?retryWrites=true&w=majority`

// const url = 'mongodb://localhost/recipesDB'

connect(`${url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(console.log(`Database is connected`))
    .catch(err => console.log(err));