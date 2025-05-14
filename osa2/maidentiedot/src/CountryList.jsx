export const CountryList = ({ countryList, searchTerm, getCountryInfo }) => {

    const handleClick = (name) => {
        getCountryInfo(name)
    }

    return(
        countryList.length > 10 ?
        searchTerm !== "" ? <p>Too many matches, specify another filter</p> : null
        :
        <ul>
            {countryList.map((c, index) => (
                <li key={index}>{c} <button onClick={() => handleClick(c)}>Show</button></li>
            ))}
        </ul>
    );

}