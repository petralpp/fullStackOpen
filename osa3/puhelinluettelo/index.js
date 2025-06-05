const express = require('express')
const cors = require('cors')
const app = express()

var morgan = require('morgan')
morgan.token('body', function (req) {
    return JSON.stringify(req.body)
})

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

let persons = [
{
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": "1"
},
{
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": "2"
},
{
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": "3"
},
{
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": "4"
}
]

const generateId = () => {
    const max = persons.length * 100
    const id = Math.floor(Math.random() * max);

    return String(id);
}

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/info', (req, res) => {
    const date = new Date()
    const info = `Phonebook has info for ${persons.length} people`
    res.send(`<p>${info}</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (!body.name || !body.number) {
        return res.status(400).json({ 
            error: 'name or number missing' 
    })
    }
    const found = persons.find(p => p.name === body.name)
    if (found) {
        return res.status(400).json({
             error: 'name must be unique'
        })
    }
    const id = generateId();
    const person = {
        "name": body.name,
        "number": body.number,
        "id": id
    }
    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});


