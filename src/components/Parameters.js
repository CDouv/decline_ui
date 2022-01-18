import Parameter from './Parameter'

export const Parameters = ({parameters,onToggle,changeInput,clearInput}) => {

    return (
        <>
        {parameters.map((parameter) => (
            <Parameter parameter = {parameter}
            onToggle={onToggle}
            changeInput = {changeInput}
            clearInput = {clearInput}


            />
        ))}
        </>
    )
}

export default Parameters 