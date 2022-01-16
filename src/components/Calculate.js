import React from 'react'

export const Calculate = ({countUnknowns}) => {
    return (
        <div>
            <button className = "calculateButton"
                    onClick={() => countUnknowns()}>
                Calculate
            </button>
        </div>
    )
}

export default Calculate;