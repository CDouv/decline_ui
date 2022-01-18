//Will eventually use this component to talk to Rust and calculate unknown value
import React from 'react'

export const Unknown = ({parameter,clearInput}) => {

    
    return (
        <div className = "input">
                <form>
                    <input type='text' readOnly="readOnly"/> 
              </form>
              {/* {clearInput(parameter.symbol)} */}
        </div>
    )
}


export default Unknown;