import React, { useState } from 'react';
import { useForm } from "../hooks/useForm";
import papelera from "../images/papelera.png"
import clean from "../images/clean.png"

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
        <div className='flex justify-center mt-9'>
            <div className=' grid grid-cols-2 gap-5'>
                <div className='w-[525px]'> 
                    <h1 className='mb-1 text-2xl'>Crea tu JSON</h1>
                    <hr  className='border-violet-600'/>
                    <form className='mt-3 max-h-[500px]  overflow-y-auto'>
                        {Jarray.map((obj, index)=> (
                            <ul key={index} className='flex items-center'>
                                
                                <span className='text-2xl text-violet-300 mr-1'>{"{"}</span>
                                <input type="text" placeholder='Nombre ' name={`title.${index}`} value={formState[`title.${index}`] || ''} onChange={onInputChange}  className='text-zinc-50 bg-slate-600 m-1 p-1 rounded-md  border-2 border-sky-500/95' />
                                <span className='text-2xl text-violet-300 mx-1'>:</span>
                                <input type="text" placeholder='Valor' name={`desc.${index}`} value={formState[`desc.${index}`] || ''} onChange={onInputChange}  className='text-zinc-50 bg-slate-600 m-1 p-1 rounded-md  border-2 border-sky-500/95'/>
                                <span className='text-2xl text-violet-300  ml-1'>{"}"}</span>
                                <button type="button" onClick={ () => onResetForm( index )} className='bg-red-200 rounded-full p-1 border border-red-300 hover:bg-red-400 transition group m-1 flex justify-center items-center'>
                                    <img src={clean} alt="Limpiar"  className='size-6 group-hover:scale-105'/>
                                </button>
                                <button type="button" onClick={ () => onDeleteIndex( index )} className='bg-red-400 rounded-full p-1 border border-red-500 hover:bg-red-600 transition group flex justify-center items-center'>
                                    <img src={papelera} alt="Limpiar"  className='size-6 group-hover:scale-105'/>
                                </button>
                            </ul>
                        ))}
                    </form>
          
                    <button className='bg-violet-600 p-2 m-1 border border-purple-800 rounded-lg hover:scale-105 transition hover:bg-violet-700 w-full' onClick={onAddObject}>Agregar Objeto</button>
                    
                    

                </div>
                

                <div className='w-[525px]'>
                    <h1 className='mb-1 text-2xl'>Code:</h1>
                    <hr  className='border-violet-600'/>
                    
                    <div className='bg-slate-800 rounded-md h-[500px] border-2 border-slate-950 p-2 mt-3 overflow-y-auto'>
                    
                        <pre className='' style={{ whiteSpace: 'pre-wrap' }}><code>{JSON.stringify(Jcontent, null, 2)}</code></pre>

                    </div>
                    <button className='bg-violet-600 p-2 m-1 border border-purple-800 rounded-lg hover:scale-105 transition hover:bg-violet-700' onClick={onCreateJSON}>Crear JSON</button>
                    <button className='bg-violet-600 p-2 m-1 border border-purple-800 rounded-lg hover:scale-105 transition hover:bg-violet-700' onClick={copyToClipboard}>Copiar al portapapeles</button>
                    {copySuccess && <div className='text-sky-400 ml-2'>Copiado al portapapeles !!!</div>}
                </div>
            </div>
        </div>    
    );
};
