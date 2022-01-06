export const Parameter = ({parameter}) => {
    return (
        <div className = 'parameter'>
            <div className = 'calculateToggle'>
            {parameter.calculateToggle}
            </div>
            <div className = 'symbol'>
            {parameter.symbol}
            </div>
            <div className = "input">
            {parameter.input}
            </div>
        </div>
    )
}

export default Parameter