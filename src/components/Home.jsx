import React, { useState } from 'react';
import { useForm } from "../hooks/useForm";

export const Home = () => {

    const [Jcontent, setJcontent] = useState({}); // Jcontent Para mostrar el Resultado Final
    const [copySuccess, setCopySuccess] = useState(false); // Para mostrar el mensaje de Copidado 
    const [Jarray, setJarray] = useState([{}]); // Arreglo de objetos para mantener actualizado los datos
    const {formState, onInputChange,onResetForm, setFormState} = useForm({});


    const onAddObject = () => {
        setJarray([...Jarray, {}]);
    };

    const onCreateJSON = () => {
        const newContent = {};
       
        Jarray.forEach((obj, index) => {
            const title = formState[`title.${index}`] || '';
            const desc = formState[`desc.${index}`] || '';
            if (title || desc) {
                newContent[title] = desc;
            }
        });
        console.log(newContent)
        setJcontent(newContent);


    };

    // Borrar una fila del arreglo
    const onDeleteIndex = (index) => {
        setJarray((prevJarray) => {
            const newArray = [...prevJarray];
            newArray.splice(index, 1);
            return newArray;
        });
    
        onResetForm(index); // Limpiar los valores en el formulario
    
        // Reorganizar los índices
        setFormState((prevFormState) => {
            const newState = { ...prevFormState };
            const keys = Object.keys(newState);
    
            // Actualizar los índices para title y desc
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const matchTitle = key.match(/^title\.(\d+)$/);
                const matchDesc = key.match(/^desc\.(\d+)$/);
                if (matchTitle) {      // Restarle 1 a Title[index]
                    const currentIndex = parseInt(matchTitle[1], 10);
                    if (currentIndex > index) {
                        newState[`title.${currentIndex - 1}`] = newState[key];
                        delete newState[key];
                    }
                } else if (matchDesc) { // Restarle 1 a Desc[index]
                    const currentIndex = parseInt(matchDesc[1], 10);
                    if (currentIndex > index) {
                        newState[`desc.${currentIndex - 1}`] = newState[key];
                        delete newState[key];
                    }
                }
            }
    
            return newState;
        });
    };

    // Mostrar Mensaje
    const copyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(Jcontent))
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => {
                    setCopySuccess(false);
                }, 3000); // Mostrar el mensaje de éxito durante 3 segundos
            })
            .catch((error) => {
                console.error('Error copying to clipboard: ', error);
            });
    };
    

   
    return (
        <>
            <h1>Home</h1>


            <h2>Code:</h2>
            <pre><code>{JSON.stringify(Jcontent)}</code></pre>
            {copySuccess && <div>Copiado al portapapeles</div>}
    
            <form>
                {Jarray.map((obj, index)=> (
                    <ul key={index}>
                        
                        <input type="text" placeholder='PrimerValor' name={`title.${index}`} value={formState[`title.${index}`] || ''} onChange={onInputChange} />
                        <input type="text" placeholder='SegundoValor' name={`desc.${index}`} value={formState[`desc.${index}`] || ''} onChange={onInputChange} />

                        <button type="button" onClick={ () => onResetForm( index )}>Clean</button>
                        <button type="button" onClick={ () => onDeleteIndex( index )}>Delete</button>
                    </ul>
                ))}
            </form>
            <br />
            <button onClick={onAddObject}>Agregar Objeto</button>
            <button onClick={onCreateJSON}>Crear JSON</button>
            <button onClick={copyToClipboard}>Copiar al portapapeles</button>
        </>
    );
};
