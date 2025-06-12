const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
// node mongo.js yourpassword Anna 040-1234556
const password = process.argv[2]

const url = `mongodb+srv://fullstackPetra:${password}@cluster0.wmmnfec.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', contactSchema)

// jos annettu pelkästää salasana
if (process.argv.length == 3) {
    console.log("phonebook:")
    Contact
    .find({})
    .then(result => {
        result.forEach(contact => {
            console.log(contact.name, contact.number)
        })
        // ...
        mongoose.connection.close()
    })
} else {

    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4]
    })

    contact.save().then(result => {
        console.log(`added ${contact.name} number ${contact.number} to phonebook`)
    mongoose.connection.close()
    })
}