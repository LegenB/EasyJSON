import React from 'react'
import rayo from "../images/rayo.png"




export const Info = () => {
  return (
    <div className='mx-9 my-5 bg-slate-800 p-4 rounded-md'>
        <div className='flex items-center mb-1'>
            <img src={rayo} alt="" className='size-7 mr-1' />
            <h2 className='text-xl'> Teclas Rapidas</h2>

        </div>
        
        
        <code>
            <ul className='ml-4'>
                <li>
                    - <span className='text-blue-300'>Dentro </span> de un Campo de Texto apretar tecla <span className='text-yellow-200'>"Enter" </span> = Agregar Objeto 
                </li>
                <li>
                    - <span className='text-green-200'>Fuera </span> de un Campo de Texto apretar tecla <span className='text-yellow-200'>"Enter" </span> = Crear JSON
                </li>
                <li>
                    - <span className='text-green-200'>Fuera </span> de un Campo de Texto apretar tecla <span className='text-yellow-200'>"+" </span> = Agregar Nuevo Campo
                </li>
                <li>
                    - <span className='text-red-300'>Apretar</span> tecla <span className='text-yellow-200'>"Supr" </span> = Elimina el ultimo del JSON
                </li>
            </ul>
        </code>
    </div>
)
}
