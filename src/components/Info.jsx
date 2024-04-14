import React from 'react'
import rayo from "../images/rayo.png"




export const Info = () => {
  return (
    <div className='mx-1 sm:mx-2 md:mx-9 my-2 sm:my-3 md:my-5 bg-slate-800 p-4 rounded-md'>
        <div className='flex items-center mb-1'>
            <img src={rayo} alt="icon" className='size-5 sm:size-6 md:size-7 mr-1' />
            <h2 className='text-md sm:text-lg md:text-xl'> Teclas Rapidas</h2>

        </div>
        
        
        <code>
            <ul className='sm:ml-2 md:ml-4 text-xs sm:text-sm md:text-base'>
                <li>
                    - <span className='text-blue-300'>Dentro </span> de un Campo de Texto apretar tecla <span className='text-yellow-200'>"Enter" </span> = Agregar Objeto 
                </li>
                <li className='hidden sm:block'>
                    - <span className='text-green-200'>Fuera </span> de un Campo de Texto apretar tecla <span className='text-yellow-200'>"Enter" </span> = Crear JSON
                </li>
                <li className='hidden sm:block'>
                    - <span className='text-green-200'>Fuera </span> de un Campo de Texto apretar tecla <span className='text-yellow-200'>"+" </span> = Agregar Nuevo Campo
                </li>
                <li className='hidden sm:block'>
                    - <span className='text-red-300'>Apretar</span> tecla <span className='text-yellow-200'>"Supr" </span> = Elimina el ultimo del JSON
                </li>
            </ul>
        </code>
    </div>
)
}
