import Parameter from './Parameter'

export const Parameters = ({parameters}) => {

    return (
        <>
        {parameters.map((parameter) => (
            <Parameter parameter = {parameter}
            />
        ))}
        </>
    )
}

export default Parameters