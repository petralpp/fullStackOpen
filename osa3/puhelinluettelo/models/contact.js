const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('Connecting to database')
mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
})

const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3
    },
    number: String
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact;