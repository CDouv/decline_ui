import Parameter from './Parameter'

export const Parameters = ({parameters,onToggle}) => {

    return (
        <>
        {parameters.map((parameter) => (
            <Parameter parameter = {parameter}
            onToggle={onToggle}
            />
        ))}
        </>
    )
}

export default Parameters 