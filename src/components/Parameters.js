import Parameter from './Parameter'

export const Parameters = ({parameters,onToggle,changeInput}) => {

    return (
        <>
        {parameters.map((parameter) => (
            <Parameter parameter = {parameter}
            onToggle={onToggle}
            changeInput = {changeInput}
            />
        ))}
        </>
    )
}

export default Parameters 