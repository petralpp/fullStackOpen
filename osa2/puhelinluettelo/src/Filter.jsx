const Filter = ({ searchWord, handleSearch }) => {
    return(<div>
        <p>Filter shown with 
            <input value={searchWord} onChange={handleSearch}/>
        </p>
    </div>)
}

export default Filter;