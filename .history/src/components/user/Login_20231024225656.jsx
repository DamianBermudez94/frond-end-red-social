export const Login = () => {
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Login</h1>
      </header>
      <div className="content__posts">
        {/*{saved == "saved" ? <strong className="alert alert-success">El usuario se ha registrado correctamente</strong> : "" }
       {saved == "error" ? <strong className="alert alert-error">El usuario no se ha podido registrar</strong> : "" }*/}
        <form action="">
          <div className="form-group">
            <label htmlFor="email">Correo electronico:</label>
            <input type="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password" />
          </div>
          <input type="submit" value="Ingresar" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
