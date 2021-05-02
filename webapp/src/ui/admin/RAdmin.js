import React from 'react';
import CryptoJS from "crypto-js"

class RAdmin extends React.Component {

  async acceder(password){
    var hash = CryptoJS.SHA256(password);
    hash=hash.toString(CryptoJS.enc.Base64)
    console.log(hash)
    if(hash==="siHZ27CDp/M0KNfCo8MZiuklYU1wIQ4ocWzKp81N23k="){
      let url=window.location.toString()
      url=url.replace("radmin","administrar")
      window.location.href =url;
    }
  }

  render() {
    return (
      <div title="Admin">
        <div className="prueba">
          <h2>Registrate como admin</h2>
            <input type="text" id="password" />
            <button onClick={()=>this.acceder(document.getElementById("password").value)}>Acceder</button>
        </div>
        <button ><a href="/login" >Volver</a></button>
      </div>
    )
  }
}



export default RAdmin;