/* eslint-disable react/prop-types */
import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleClick = (value) => {
    let changedValue = 0;
    if (value === "good") {
      changedValue = good+1;
      setGood(changedValue);
      countStatistics(changedValue, neutral, bad);
    } else if (value === "neutral") {
      changedValue = neutral+1;
      setNeutral(changedValue);
      countStatistics(good, changedValue, bad);
    } else {
      changedValue = bad+1;
      setBad(changedValue);
      countStatistics(good, neutral, changedValue);
    }
  }

  const countStatistics = (goodVal, neutralVal, badVal) => {
    const newAll = goodVal + neutralVal + badVal;
    setAll(newAll);

    const newAverage = (goodVal - badVal) / newAll;
    setAverage(newAverage);

    const newPositive = (goodVal / newAll) * 100;
    setPositive(newPositive);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button type="good" onClick={handleClick} />
        <Button type="neutral" onClick={handleClick} />
        <Button type="bad" onClick={handleClick} />
      </div>
      { all > 0 && <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />}
    </div>
  )
}

const Statistics = ( { good, neutral, bad, all, average, positive } ) => {
  return(<>
    <h1>Statistics</h1>
    <table>
      <tbody>
        <tr><StatisticLine text="good" value={good} /></tr>
        <tr><StatisticLine text="neutral" value={neutral} /></tr>
        <tr><StatisticLine text="bad" value={bad} /></tr>
        <tr><StatisticLine text="all" value={all} /></tr>
        <tr><StatisticLine text="average" value={average} /></tr>
        <tr><StatisticLine text="positive" value={positive} /></tr>
      </tbody>
    </table>
  </>);
}

const StatisticLine = ( {text, value} ) => {
  if ( text==="positive" )
    return <><td>{text}</td><td>{value} %</td></>
  return(
    <><td>{text}</td><td>{value}</td></>
  )
}

const Button = ( { type, onClick } ) => {
  return(
    <button onClick={() => onClick(type)}>{type}</button>
  )
}

export default App
