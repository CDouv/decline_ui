import Header from './components/Header'
import Parameters from './components/Parameters'

import './App.css';
import { useState} from 'react'
import { queries } from '@testing-library/react';

const App = () => {
  const [parameters, setParameters] = useState([
    {
      text:'Initial Flow Rate',
      symbol:'qi',
      units:'bbl/d',
      input:0,
      calculate: false,
     

    },

    {
      text:'Final Flow Rate',
      symbol:'qf',
      units:'bbl/d',
      input:0,
      calculate: false,
     

    },

    {
      text:'Decline Rate',
      symbol:'d',
      units:'%/yr',
      input:0,
      calculate: false,
     

    },

    {
      text:'Segment Duration',
      symbol:'t',
      units:'years',
      input:0,
      calculate: false,
      

    },

    {
      text:'Segment Reserves',
      symbol:'np',
      units:'mbbl',
      input:0,
      calculate: false,

    },
  ])

const toggleCalculate = (symbol) => {
  setParameters(parameters.map((parameter) => parameter.symbol === symbol
  ? {...parameter, calculate: !parameter.calculate} : parameter))

}
  return (
    <div className = "container">
      <Header title = 'Decline Calculator'/>
      <Parameters parameters = {parameters} onToggle={toggleCalculate} />
    </div>
  );
}

export default App;
