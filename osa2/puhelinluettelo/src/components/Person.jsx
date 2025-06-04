const Person = ({ person, onDelete }) => {

    const handeClick = () => {
        if (confirm(`Delete ${person.name} ?`))
            onDelete(person.name)
    }

    return(<>
        <p>{person.name} {person.number}</p>
        <button onClick={handeClick}>Delete</button>
        </>)
}

export default Person;