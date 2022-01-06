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
      input:<div>
              <form>
                <input type='text'>
               </input>
              </form>
            </div>,
      calculate: <input type='checkbox' />,
      unknownValue: true

    },

    {
      text:'Final Flow Rate',
      symbol:'qf',
      units:'bbl/d',
      input:<div>
      <form>
        <input type='text'>
       </input>
      </form>
    </div>,
      calculate: <input type='checkbox' />,
      unknownValue: true

    },

    {
      text:'Decline Rate',
      symbol:'d',
      units:'%/yr',
      input:<div>
      <form>
        <input type='text'>
       </input>
      </form>
    </div>,
      calculate: <input type='checkbox' />,
      unknownValue: true

    },

    {
      text:'Segment Duration',
      symbol:'t',
      units:'years',
      input:<div>
      <form>
        <input type='text'>
       </input>
      </form>
    </div>,
      calculate: <input type='checkbox' />,
      unknownValue: true

    },

    {
      text:'Segment Reserves',
      symbol:'np',
      units:'mbbl',
      input:<div>
      <form>
        <input type='text'>
       </input>
      </form>
    </div>,
      calculate: <input type='checkbox' />,
      unknownValue: true

    },
  ])

const toggleCalculate = (symbol) => {
  console.log(symbol)
}
  return (
    <div className = "container">
      <Header title = 'Decline Calculator'/>
      <Parameters parameters = {parameters} onToggle={toggleCalculate} />
    </div>
  );
}

export default App;
