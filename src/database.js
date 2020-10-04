const { connect } = require('mongoose');

const url = `mongodb://${process.env.URL}`
const address = process.env.ADDRESS

connect(`${url}${address}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(console.log(`Database ${address} is connected ${url}${address}`))
    .catch(err => console.log(err));