import { useState } from 'react'

export const useForm = (initialObj ={}) => {
 const [form, setForm] = useState(initialObj)

const changed = ({target})=>{

    // Desestructuramos la variable target para sacarle el valor 
    const {name,value} = target;

    // Actualizamos el valor que ya tiene
     //*FORM y le agregamos una clave valor del nuevo dato que queremos añadir
    setForm({
        ...form,
        [name]:value
    })
}
  return {
    form,
    changed
  }
}
