import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "../hooks/useForm";
import papelera from "../images/papelera.png"
import clean from "../images/clean.png"
import add from "../images/add_w.png"
import Clip from "../images/clip.png"
import Code from "../images/Code.png"
import Martillo from "../images/martillo.png"
import Edit from "../images/Edit.png"
import Descarga from "../images/Descarga.png"
import { Info } from "./Info";


export const Home = () => {

    const [Jcontent, setJcontent] = useState({}); // Jcontent Para mostrar el Resultado Final obteniendo los datos de Jarray 
    const [Jarray, setJarray] = useState([{}]); // Arreglo de objetos con la finalidad de editar(Agregando y Eliminando) antes del Resultado Final
    const [copySuccess, setCopySuccess] = useState(false); // Para mostrar el mensaje de Copidado 
    const {formState, onInputChange,onResetForm,onResetDesc, setFormState} = useForm({});


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
            const type = formStateRef.current[`type.${index}`] || '';
            const desc = formStateRef.current[`desc.${index}`] || '';
            
            
            if (title || desc) {

                if (type === 'integer') {
                    const intValue = parseInt(desc);
                    newContent[title] = intValue;
                    
                } else if (type === 'bool') {
                    if (desc === '') {
                        newContent[title] = false;
                    } else {
                        newContent[title] = desc;
                    }
                } else {
                    newContent[title] = desc;
                }
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

    // Cambiar el Tipo de el input valor
    const onTypeChange = (e, index) => {
        const { value } = e.target;
        onResetDesc(index); //Limpiar valor al momento de cambiar el tipo de dato
        setFormState((prevState) => ({
            ...prevState,
            [`type.${index}`]: value,
        }));
    };

    // Mostrar Mensaje
    const copyToClipboard = () => {
        
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
    // Descargar JSON
    const downloadTxtFile = () => {
        // Crear un objeto Blob con el JSON
        const blob = new Blob([JSON.stringify(Jcontent, null, 2)], { type: 'text/plain' });
        // Crear un objeto URL para el Blob
        const url = URL.createObjectURL(blob);
        // Crear un enlace <a> para hacerle click
        const link = document.createElement('a');
        // Establecer el enlace como descarga de un archivo
        link.download = 'myjson.txt';
        link.href = url;
        // hacer un click en el enlace para iniciar la descarga
        link.click();
        // Liberar el objeto URL
        URL.revokeObjectURL(url);
    };
    

   
    return (
        
        <div>
               
            <Info/>
             <div className='mx-1 sm:mx-2 md:mx-9'>
                <div className='grid xl:grid-cols-2 gap-y-8 xl:gap-5 xl:gap-y-0'>
                    <div className='w-full'> 

                        <div className='flex items-center'>
                            <img src={Edit} alt="icon"  className='size-8 sm:size-9 md:size-10 mr-2'/>
                            <h1 className='mb-1 sm:text-xl md:text-2xl'>Crea tu JSON</h1>
                        </div>
                        <hr className='border-violet-600'/>

                        <form className='mt-3 max-h-[350px] min-h-[150px] md:max-h-[500px] overflow-y-auto '>
                            {Jarray.map((obj, index)=> (
                                <ul key={index} className='flex items-center sm:justify-center text-xs sm:text-sm md:text-base     '>
                                    <div className='hidden sm:block'>
                                        <span className='text-xl sm:text-2xl text-violet-300 sm:mr-1'>{"{"}</span>
                                    </div>
                                    
                                    
                                    <input type="text" placeholder='Clave ' name={`title.${index}`} value={formState[`title.${index}`] || ''} onChange={onInputChange} autocomplete="off"  
                                        className='text-zinc-50 bg-slate-600 m-1 p-1 rounded-md  border-2 border-sky-500/95 w-28 sm:w-2/5' />
                                    
                                    
                                    <select className='text-zinc-50 bg-slate-600 m-1 p-1 rounded-md  border-2 border-sky-500/95 w-24' 
                                        onChange={(e) => onTypeChange(e, index)} 
                                        value={formState[`type.${index}`] || 'string'}>
                                        <option value="string">String</option>
                                        <option value="integer">Interger</option>
                                        <option value="bool">Bool</option>
                                    </select>
                                    
                                    <div className='hidden sm:block'>
                                        <span className='text-xl sm:text-2xl text-violet-300 sm:mx-1'>:</span>
                                    </div>
                                    {formState[`type.${index}`] === 'bool' ? (
                                        <div className='flex items-center w-24 sm:w-2/5'>
                                           <input
                                            type="checkbox"
                                            name={`desc.${index}`}
                                            checked={formState[`desc.${index}`] || false}
                                            onChange={onInputChange}
                                            className='m-1 p-1 size-4 sm:size-5 '
                                        /> 
                                            <span className={formState[`desc.${index}`] ? 'pl-2 text-blue-300' : 'pl-2 text-red-300'}>
                                                {formState[`desc.${index}`] ? 'True' : 'False'}
                                            </span>
                                        </div>

                                        
                                        ) : (
                                        <input
                                            type="text"
                                            placeholder='Valor'
                                            name={`desc.${index}`}
                                            value={formState[`desc.${index}`] || ''}
                                            onChange={onInputChange}
                                            autoComplete="off"
                                            className='text-zinc-50 bg-slate-600 m-1 p-1 rounded-md border-2 border-sky-500/95 w-24 sm:w-2/5'
                                        />
                                    )}
                                    <div className='hidden sm:block'>
                                        <span className='text-xl sm:text-2xl text-violet-300  sm:ml-1'>{"}"}</span>
                                    </div>
                                    
                                    <div className='flex justify-center md:justify-around items-center sm:w-1/5'>
                                        <button type="button" onClick={ () => onResetForm( index )} className='bg-red-200 rounded-full p-1 border border-red-400 hover:bg-red-400 transition group flex justify-center items-center'>
                                            <img src={clean} alt="Limpiar"  className='size-4 sm:size-5 md:size-6 group-hover:scale-105'/>
                                        </button>
                                        <button type="button" onClick={ () => onDeleteIndex( index )} className='ml-1 sm:ml-2 md:ml-0 bg-red-400 rounded-full p-1 border border-red-600 hover:bg-red-600 transition group flex justify-center items-center '>
                                            <img src={papelera} alt="Limpiar"  className='size-4  sm:size-5 md:size-6 group-hover:scale-105'/>
                                        </button>
                                    </div>
                                    
                                    
                                </ul>
                            ))}
                        </form>
            
                        <button className='bg-violet-600 p-1 m-1 border border-purple-800 rounded-lg transition hover:bg-violet-700 w-full flex items-center justify-center h-7 sm:h-8 md:h-11 text-sm md:text-base' onClick={onAddObject}>
                            <img src={add} alt="add" className=' size-7 sm:size-8 md:size-10 mr-3' /> Agregar
                        </button>

                        
                    </div>
                    
                    <div className='w-full'>
                        <div className='flex items-center'>
                            <img src={Code} alt="icon"  className='size-8 sm:size-9 md:size-10 mr-2 '/>
                            <h1 className='mb-1 sm:text-xl md:text-2xl'>Code:</h1>
                        </div>                      
                        <hr  className='border-violet-600'/>
                        {/* Aqui botones cuando es MENOR a xl*/}
                        <div className="block xl:hidden">
                            <div className='sm:flex justify-around mt-3'>
                                <button className='bg-green-600 p-2  mb-3 sm:mb-0 sm:m-1 border  border-green-800 rounded-lg hover:scale-105 transition  hover:bg-green-700 w-full  sm:w-[200px] flex items-center justify-center h-7 sm:h-8 md:h-11 sm:text-sm md:text-base' onClick={onCreateJSON}>
                                    <img src={Martillo} alt="" className='size-6 sm:size-7 md:size-9 mr-1'/> Crear JSON
                                </button>
                                <button className='bg-violet-600 p-2  mb-3 sm:mb-0 sm:m-1 border border-purple-800 rounded-lg hover:scale-105 transition hover:bg-violet-700 w-full sm:w-[200px] flex items-center justify-center h-7 sm:h-8 md:h-11 sm:text-sm md:text-base' onClick={copyToClipboard}>
                                    <img src={Clip} alt="" className='size-6 sm:size-7 md:size-9 mr-1'/>Copiar 
                                </button>
                                <button className='bg-indigo-600 p-2  mb-3 sm:mb-0 sm:m-1 border border-indigo-800 rounded-lg hover:scale-105 transition hover:bg-indigo-700 w-full sm:w-[200px] flex items-center justify-center h-7 sm:h-8 md:h-11 sm:text-sm md:text-base' onClick={downloadTxtFile}>
                                    <img src={Descarga} alt="" className='size-5 sm:size-6 md:size-8 mr-1'/>
                                    Descargar JSON 
                                </button>
                            </div>
                        </div>
                        {/* Panel del Resultado del Codigo */}
                        <div className='mb-14 xl:mb-0 bg-slate-800 rounded-md h-[350px] md:h-[500px] border-2 border-slate-950 p-2 mt-3 overflow-y-auto'>
                        
                            <pre className='' style={{ whiteSpace: 'pre-wrap' }}><code>{JSON.stringify(Jcontent, null, 2)}</code></pre>

                        </div>
                        {/* Aqui botones cuando es MAYOR a xl*/}
                        <div className=' hidden xl:block'>
                            <div className='flex justify-around '>
                                <button className='bg-green-600 p-2 m-1 border  border-green-800 rounded-lg hover:scale-105 transition  hover:bg-green-700 w-[200px] flex items-center justify-center h-11' onClick={onCreateJSON}>
                                    <img src={Martillo} alt="" className='size-9 mr-1'/> Crear JSON
                                </button>
                                <button className='bg-violet-600 p-2 m-1 border border-purple-800 rounded-lg hover:scale-105 transition hover:bg-violet-700 w-[200px] flex items-center justify-center h-11' onClick={copyToClipboard}>
                                    <img src={Clip} alt="" className='size-9 mr-1'/>Copiar 
                                </button>
                                <button className='bg-indigo-600 p-2 m-1 border border-indigo-800 rounded-lg hover:scale-105 transition hover:bg-indigo-700 w-[200px] flex items-center justify-center h-11' onClick={downloadTxtFile}>
                                    <img src={Descarga} alt="" className='size-8 mr-1'/>
                                    Descargar JSON 
                                </button>
                                
                            </div>
                        </div>
                        
                        
                        {copySuccess && <div className='text-sky-400 ml-2'>Copiado al portapapeles !!!</div>}
                    </div>
                </div>
            </div> 
        </div>     
    );
};
