import { useState } from "react";



export const useForm = ( initialForm = {} ) => {

    const [formState, setFormState] = useState(initialForm);

    
    const onInputChange = ({target}) =>{
        const {name,value} = target;
        console.log(target)
        setFormState({
            ...formState,
            [name]: value
        })
    }

    // Limpiar los textos de la fila seleccionada
    const onResetForm = (index) => {
        setFormState({
            ...formState,
            [`title.${index}`]: "",
            [`desc.${index}`]: ""
        });

    }

    return {
        ...formState,
        formState,
        onResetForm,
        onInputChange,
        setFormState 
         
    }
}
