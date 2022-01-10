import React from 'react'
import { useState } from 'react'

export const Known = (parameter) => {
    const [param, setParam] = useState('');

    return (
        <div className = "input">
        <form>
            <input 
                type='text'
                value = {param} 
                onChange = {e => setParam(e.target.value)}
                /> 
      </form>
</div>
    )
}

export default Known;