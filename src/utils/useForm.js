import { useState } from "react"


export const useForm  = (initialState = {}, onSubmit) => {
    //pass in intialState
    const [values, setValues] = useState(initialState)

    const handleInputChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSelectChange = (name) => (e, value) => {
        setValues({...values, [name]: value})

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        onSubmit?.(values);
        setValues(initialState)
    }

    return {values, handleInputChange, submitHandler, setValues, handleSelectChange}

}



