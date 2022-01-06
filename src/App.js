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
      calculateToggle: <input type='checkbox' />

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
      calculateToggle: <input type='checkbox' />

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
      calculateToggle: <input type='checkbox' />

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
      calculateToggle: <input type='checkbox' />

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
      calculateToggle: <input type='checkbox' />

    },
  ])


  return (
    <div className = "container">
      <Header title = 'Decline Calculator'/>
      <Parameters parameters = {parameters} />
    </div>
  );
}

export default App;
