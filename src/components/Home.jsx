import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "../hooks/useForm";
import papelera from "../images/papelera.png"
import clean from "../images/clean.png"
import add from "../images/add_w.png"
import { Info } from "./Info";


export const Home = () => {

    const [Jcontent, setJcontent] = useState({}); // Jcontent Para mostrar el Resultado Final
    const [copySuccess, setCopySuccess] = useState(false); // Para mostrar el mensaje de Copidado 
    const [Jarray, setJarray] = useState([{}]); // Arreglo de objetos para mantener actualizado los datos
    const {formState, onInputChange,onResetForm, setFormState} = useForm({});


    const JarrayRef = useRef(Jarray); //UseRef para mantener las variables mutadas actualizadas
    JarrayRef.current = Jarray;

    const formStateRef = useRef(formState);
    formStateRef.current = formState;

    const JcontentRef = useRef(Jcontent);
    JcontentRef.current = Jcontent;

    // Eventos con teclas 
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch ( event.key  ) {
                case '+':
                    if (document.activeElement.tagName.toLowerCase() !== 'input') {
                        onAddObject();
                    }
                    break;
                case 'Delete': // Borrar con la tecla suprimir                
                    onDeleteLastObject();                                  
                    break;

                case 'Enter':
                    if (document.activeElement.tagName.toLowerCase() === 'input') {
                        onAddObject();
                    } else {
                        onCreateJSON();
                    }
                    break; 
                                   
                default:
                    break; 
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    const onAddObject = () => {
        const newArray = [...JarrayRef.current, {}];
        setJarray(newArray);
    };

    const onCreateJSON = () => {
        const newContent = {};
       
        JarrayRef.current.forEach((obj, index) => {
            const title = formStateRef.current[`title.${index}`] || '';
            const desc = formStateRef.current[`desc.${index}`] || '';
            if (title || desc) {
                newContent[title] = desc;
            }
        });   
        setJcontent(newContent);
    };
    // Borra el ultimo objeto del arreglo
    const onDeleteLastObject = () => {
        if (JarrayRef.current.length > 0) {
            const newArray = [...JarrayRef.current];
            newArray.pop();
            setJarray(newArray);
        }
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
        onCreateJSON();
        navigator.clipboard.writeText(JSON.stringify(Jcontent, null, 2))
            .then(() => {
                setCopySuccess(true);
                console.log('Copiado')
                setTimeout(() => {
                    setCopySuccess(false);
                }, 3000); // Mostrar el mensaje de éxito durante 3 segundos
            })
            .catch((error) => {
                console.error('Error copying to clipboard: ', error);
            });
    };


    

   
    return (
        
        <div>
            <Info/>
             <div className='mx-9'>
                <div className=' grid grid-cols-2 gap-5'>
                    <div className='w-full'> 
                        <h1 className='mb-1 text-2xl'>Crea tu JSON</h1>
                        <hr  className='border-violet-600'/>
                        <form className='mt-3 max-h-[500px]  overflow-y-auto '>
                            {Jarray.map((obj, index)=> (
                                <ul key={index} className='flex items-center '>
                                    
                                    <span className='text-2xl text-violet-300 mr-1'>{"{"}</span>
                                    <input type="text" placeholder='Clave ' name={`title.${index}`} value={formState[`title.${index}`] || ''} onChange={onInputChange}  className='text-zinc-50 bg-slate-600 m-1 p-1 rounded-md  border-2 border-sky-500/95 w-2/5' />
                                    <span className='text-2xl text-violet-300 mx-1'>:</span>
                                    <input type="text" placeholder='Valor' name={`desc.${index}`} value={formState[`desc.${index}`] || ''} onChange={onInputChange}  className='text-zinc-50 bg-slate-600 m-1 p-1 rounded-md  border-2 border-sky-500/95 w-2/5'/>
                                    <span className='text-2xl text-violet-300  ml-1'>{"}"}</span>
                                    <div className='flex justify-around items-center w-1/5'>
                                        <button type="button" onClick={ () => onResetForm( index )} className='bg-red-200 rounded-full p-1 border border-red-300 hover:bg-red-400 transition group m-1 flex justify-center items-center'>
                                            <img src={clean} alt="Limpiar"  className='size-6 group-hover:scale-105'/>
                                        </button>
                                        <button type="button" onClick={ () => onDeleteIndex( index )} className='bg-red-400 rounded-full p-1 border border-red-500 hover:bg-red-600 transition group flex justify-center items-center '>
                                            <img src={papelera} alt="Limpiar"  className='size-6 group-hover:scale-105'/>
                                        </button>
                                    </div>
                                    
                                </ul>
                            ))}
                        </form>
            
                        <button className='bg-violet-600 p-1 m-1 border border-purple-800 rounded-lg transition hover:bg-violet-700 w-full flex items-center justify-center h-11' onClick={onAddObject}>
                            <img src={add} alt="add" className='size-10 mr-3' /> Agregar Objeto
                        </button>
                        
                    </div>
                    
                    <div className='w-full'>
                        <h1 className='mb-1 text-2xl'>Code:</h1>
                        <hr  className='border-violet-600'/>
                        
                        <div className='bg-slate-800 rounded-md h-[500px] border-2 border-slate-950 p-2 mt-3 overflow-y-auto'>
                        
                            <pre className='' style={{ whiteSpace: 'pre-wrap' }}><code>{JSON.stringify(Jcontent, null, 2)}</code></pre>

                        </div>
                        <div className='flex justify-around'>
                            <button className='bg-indigo-600 p-2 m-1 border border-indigo-800 rounded-lg hover:scale-105 transition hover:bg-indigo-700 w-[200px] h-11' onClick={onCreateJSON}>Crear JSON</button>
                            <button className='bg-violet-600 p-2 m-1 border border-purple-800 rounded-lg hover:scale-105 transition hover:bg-violet-700 w-[200px] h-11' onClick={copyToClipboard}>Copiar al portapapeles</button>
                        </div>
                        
                        {copySuccess && <div className='text-sky-400 ml-2'>Copiado al portapapeles !!!</div>}
                    </div>
                </div>
            </div> 
        </div>     
    );
};
