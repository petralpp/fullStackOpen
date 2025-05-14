import Person from "./Person";

const Persons = ({ filterWord, personList, onClick }) => {

    return(<>
        {filterWord === '' ? personList.map(person => <Person key={person.name} person={person} onDelete={onClick}/>)
        : personList.filter(person => person.name.toLowerCase().includes(filterWord.toLowerCase()))
                .map(person => <Person key={person.name} person={person} onDelete={onClick}/>)}
        </>)
}

export default Persons;