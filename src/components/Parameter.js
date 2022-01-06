import { useState } from 'react'

export const Parameter = ({parameter, onToggle}) => {
    

    const [param, setParam] = useState('')
    const [calc,setCalcToggle] = useState('')

    //create a state for calculate or input value

    return (
        <div className = 'parameter'>

            <div className = 'calculate' onClick={() => onToggle(parameter.symbol)}>
            {parameter.calculate}
            </div>

            <div className = 'symbol'>
            {parameter.symbol}
            </div>

            <div className = "input" value = {param} onChange={(e) =>
            setParam(e.target.value)}
            >
            {parameter.input}
            </div>
        </div>
    )
}

export default Parameter