import { useState } from 'react'
import Unknown from './inputs/Unknown'
import Known from './inputs/Known'

export const Parameter = ({parameter, onToggle, changeInput}) => {
    

    //function to render input
    const renderInput = () => {
        if (parameter.calculate) {
            return <Known parameter = {parameter}
                          changeInput = {changeInput} 
                          onToggle = {onToggle} />
         } else {
             return <Unknown />
         }
    }

    return (
        <div className = 'parameter'>

            <input type='checkbox'  onClick={() => onToggle(parameter.symbol)}
            />

            <div className = 'symbol'>
            {parameter.symbol}
            </div>

            {renderInput()}

        </div>
    )
}

export default Parameter