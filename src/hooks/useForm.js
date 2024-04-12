import { useState } from "react";



export const useForm = ( initialForm = {} ) => {

    const [formState, setFormState] = useState(initialForm);

    
    const onInputChange = ({target}) =>{
        const { name, value, type, checked } = target;
        //console.log(checked)
        //console.log(value)
        const newValue = type === 'checkbox' ? checked : value;
        
        setFormState({
            ...formState,
            [name]: newValue
        });
    }

    // Limpiar los textos del valor al cambiar el tipo de dato
    const onResetDesc = (index) => {
        setFormState({
            ...formState,
            [`desc.${index}`]: ""
        });
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
        onResetDesc,
        onInputChange,
        setFormState 
         
    }
}
