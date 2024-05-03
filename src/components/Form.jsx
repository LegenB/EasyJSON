import Papelera from "../images/papelera.png"
import Clean from "../images/clean.png"




export const Form = ({ Jarray, formState, onInputChange, onTypeChange, onResetForm, onDeleteIndex }) => {
    
    
    
    return (
           
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

                        
                        ) : formState[`type.${index}`] === 'integer' ? (
                            <input
                                type="number"
                                placeholder='Valor'
                               
                                name={`desc.${index}`}
                                value={formState[`desc.${index}`] || ''}
                                onChange={onInputChange}
                                autoComplete="off"
                                className='text-zinc-50 bg-slate-600 m-1 p-1 rounded-md border-2 border-sky-500/95 w-24 sm:w-2/5'
                                
                            />
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
                            <img src={Clean} alt="Limpiar"  className='size-4 sm:size-5 md:size-6 group-hover:scale-105'/>
                        </button>
                        <button type="button" onClick={ () => onDeleteIndex( index )} className='ml-1 sm:ml-2 md:ml-0 bg-red-400 rounded-full p-1 border border-red-600 hover:bg-red-600 transition group flex justify-center items-center '>
                            <img src={Papelera} alt="Limpiar"  className='size-4  sm:size-5 md:size-6 group-hover:scale-105'/>
                        </button>
                    </div>
                    
                    
                </ul>
            ))}
        </form>
    )
}
