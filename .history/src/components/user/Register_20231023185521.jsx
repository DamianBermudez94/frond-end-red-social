import { useForm } from "../hooks/useForm"

export const Register = () => {
  const {form, changed} = useForm({});
  const saveUser = (e)=>{
    e.preventDefault();
  }
  return (
  
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>
      <div className="content__posts">
        <form action="" onSubmit={saveUser()}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input type="text" name="name" onChange={changed} />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Apellidos:</label>
          <input type="text" name="surname" onChange={changed} />
        </div>
        <div className="form-group">
          <label htmlFor="nick">Nick:</label>
          <input type="text" name="nick" onChange={changed} />
        </div>
       
        <div className="form-group">
          <label htmlFor="email">Correo electronico:</label>
          <input type="email" name="email" onChange={changed} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" name="password" onChange={changed} />
        </div>
        <input type="submit" value="Registrate" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
