import Header from './components/Header'
import Parameters from './components/Parameters'
import Calculate from './components/Calculate'

import './App.css';
import { useState} from 'react'
import { queries } from '@testing-library/react';
const axios = require('axios').default;


const App = () => {

  // Test connecting to back-end
  const getData = async () => {
    const response = await axios({
      method: 'get',
      url: "http://localhost:8000/api/myrocket",
      withCredentials: false,
    });

    console.log(response.data);

  };

  // getData();

  const [parameters, setParameters] = useState([
    {
      text:'Initial Flow Rate',
      symbol:'qi',
      units:'bbl/d',
      calculate: false,
      input:null,
      
     

    },

    {
      text:'Final Flow Rate',
      symbol:'qf',
      units:'bbl/d',
      calculate: false,
      input:null,
      
     

    },

    {
      text:'Decline Rate',
      symbol:'d',
      units:'%/yr',
      calculate: false,
      input:null,
      
     

    },

    {
      text:'Segment Duration',
      symbol:'t',
      units:'years',
      calculate: false,
      input:null,
      
      

    },

    {
      text:'Segment Reserves',
      symbol:'np',
      units:'mbbl',
      calculate: false,
      input:null,
      

    },
  ])

const exportParameters = () => {
  let inputs = [];
  parameters.map((parameter) => inputs.push(parameter.input));
  let jsonInputs = {...inputs};

  return jsonInputs
}

const countUnknowns = () => {
  let knownsCount = 0;
  let unknownsCount = 0;

  parameters.map((parameter) =>parameter.calculate === true ?
    knownsCount += 1 : unknownsCount += 1) 
    
  console.log(`There are ${knownsCount} knowns and ${unknownsCount} unknowns`);

  return (knownsCount,unknownsCount)

}


console.log(exportParameters());

const toggleCalculate = (symbol) => {
  setParameters(parameters.map((parameter) => parameter.symbol === symbol 
 
  ? {...parameter, calculate: !parameter.calculate} : parameter

  
  ));

}

const toggleChangeInput = (symbol,val) => {
  setParameters(parameters.map((parameter) => parameter.symbol === symbol
  ? {...parameter, input:val} : parameter))
}

const clearInput = (symbol) => {
  setParameters(parameters.map((parameter) => (parameter.symbol === symbol) || (!parameter.calculate)
  ? {...parameter,input:null} : parameter))
}


  return (
    <div className = "container">
      <Header title = 'Decline Calculator'/>
      <Parameters 
        parameters = {parameters}
        onToggle={toggleCalculate}
        changeInput = {toggleChangeInput}
        clearInput = {clearInput} />
       <Calculate countUnknowns = {countUnknowns}/>
    </div>
  );
}

export default App;
