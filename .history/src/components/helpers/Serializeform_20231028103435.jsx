//*Helpers que sirve para serializar los datos del formulario al editar al usuario
export const Serializeform = (form) => {

    // Accesamos a los valores del formulario
    const formData = new FormData(form);
    // Objeto vacio que se va a ir rellenando a medida que se recorra los datos del formulario 
    const completeObj = {}
    console.log(formData);
    for (let [name, value]of formData ) {
        completeObj[name]=value;
        
    }
};
