const Search = ({searchTerm, handleChange}) => {
    return(
    <div>
        find countries
        <input type="text" value={searchTerm} onChange={handleChange}/>
    </div>);
}

export default Search;