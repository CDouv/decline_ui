//Will eventually use this component to talk to Rust and calculate unknown value
import React from 'react'

export const Unknown = ({parameter,changeInput}) => {

    return (
        <div className = "input">
                <form>
                    <input type='text' readOnly="readOnly"/> 
              </form>
        </div>
    )
}


export default Unknown;