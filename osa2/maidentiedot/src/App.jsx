import { useEffect, useState } from 'react'
import './App.css'
import Search from './Search'
import axios from 'axios'
import { CountryInfo } from './CountryInfo';
import { CountryList } from './CountryList';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const url = "https://studies.cs.helsinki.fi/restcountries/api/"
  const [countries, setCountries] = useState([]);
  const [resultCountries, setResultCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    getResults(event.target.value);
  }

  const getResults = (name) => {
    const helperArr = []
    countries.forEach((c) => {
      if (c.toLowerCase().includes(name.toLowerCase()))
        helperArr.push(c);
    })
    if (helperArr.length === 1) {
      getCountryInfo(helperArr[0])
      setResultCountries([])
    } else {
      setCountryInfo(null)
      setResultCountries(helperArr);
    }
  }

  const getCountryInfo = (name) => {
    axios.get(url.concat(`name/${name}`))
    .then(res => {
        const countryObj = {
          name: res.data.name.common,
          code: res.data.cca2,
          capital: res.data.capital,
          area: res.data.area,
          languages: Object.values(res.data.languages),
          flag: res.data.flags.png
        }
        setCountryInfo(countryObj)
    }).catch(error => console.log(error))  
  }

  useEffect(() => {
    axios.get(url.concat('all'))
    .then(res => {
      const helperArr = []
      res.data.forEach((el) => {
        helperArr.push(el.name.common)
      })
      setCountries(helperArr)
    })
  },[])

  return (
    <>
    <Search searchTerm={searchTerm} handleChange={handleSearchChange}/>
    <CountryList countryList={resultCountries} searchTerm={searchTerm} getCountryInfo={getCountryInfo}/>
    { countryInfo ? 
      <CountryInfo countryInfo={countryInfo} /> 
      : 
      []
    }
    </>
  )
}

export default App
