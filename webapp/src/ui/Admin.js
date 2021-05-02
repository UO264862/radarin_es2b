import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from "@material-ui/core";
import {desbloquearUsuario,bloquearUsuario, getUsuarios} from "../api/api.js"
import './Admin.css';

let usuarios=[]

export async function ListarUsuarios() {
  usuarios= await getUsuarios()
    ReactDOM.render(
      <ListaUsuarios/>
         ,
      document.getElementById('usuarios')
    );
}

export const ListaUsuarios = ({usauriosOpcional})=>{
  if(usauriosOpcional)
    usuarios=usauriosOpcional
  var listItems = usuarios.map( (usuario) => 
    <li key="{item}"><Usuario usuario={usuario} desbloquear={()=>desbloquearUsuario(usuario.webid)} bloquear={()=>bloquearUsuario(usuario.webid)}/></li>
  );
    return(
      <ul className="user-list">
        {listItems}
      </ul>
    )
}

export const Usuario =({usuario, desbloquear, bloquear})=>{
  var nombre=usuario.nombreUsuario;
  var webid=usuario.webid;
  const desblo = desbloquear
  const blo = bloquear
    return(
        <div  >
            <div>
                <h4 className="lista">
                    <p className="admin-title-name">Usuario:</p><span className="admin-name">{nombre}</span><br/><p className="admin-title-webid">WebId:</p><span className="admin-webid">{webid}</span>
                </h4> 
                <center>
                    <div className="botones"> 
                        <Button variant="contained" className="buttoncard" name="Desbloquear" id='usuario.webid' datatype="button" onClick={desblo}>Desbloquear</Button>
                        <Button variant="contained" className="buttoncard" name="Bloquear" id='usuario.webid' datatype="button" onClick={blo }>Bloquear</Button>
                    </div>
                </center>
            </div>
        </div>
    );
}

export const Admin = ({method}) => {
  return (
    <div title="Admin">
      <div className="prueba">
        <h2>Administrar Usuarios</h2>
        <button onClick={method}>Mostrar Usuarios</button>
        <div id="usuarios" className="list" padding-inline-start="0">
        </div>
      </div>      
    </div>
  )
}

export default Admin;