require('dotenv').config()
const express = require('express')
const app = express()
const Contact = require('./models/contact')

var morgan = require('morgan')
morgan.token('body', function (req) {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
    Contact.find({}).then(result => res.json(result))
})

/*app.get('/info', (req, res) => {
    const date = new Date()
    const info = `Phonebook has info for ${persons.length} people`
    res.send(`<p>${info}</p><p>${date}</p>`)
}) */

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Contact.findById(id).then(result => {
        if (result) {
            res.json(result)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => {
        next(error)})
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'name or number missing' 
    })
    }
    const contact = new Contact({
        name: body.name,
        number: body.number
    })
    contact.save().then(savedContact => {
        return res.json(savedContact)
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});


