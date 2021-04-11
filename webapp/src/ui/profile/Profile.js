
import React,{useEffect, useState, useCallback} from "react"
import {
  useSession,
  CombinedDataProvider,
  Image,
  LogoutButton,
  Text,
} from "@inrupt/solid-ui-react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Typography,
  IconButton,
} from "@material-ui/core";

import { modificarNombreUsuario,getUsernameByWebId } from "../../api/api";
import { getDefaultSession } from "@inrupt/solid-client-authn-browser";
import EditIcon from "@material-ui/icons/Edit";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import "./Profile.css";

const Perfil = () => {
  const { session } = useSession();
  const { webId } = session.info;
  const [editing, setEditing] = useState(false);
  const [textEdit, setText] = useState("Editar perfil");
  const [colorEdit, setColor] = useState("#E5DBD4");
  const [nombre,setNombre] = useState(null);

  var getUserName=useCallback(async function(){
     getUsernameByWebId(webId).then(user=>{
       setNombre(user.nombreUsuario);
     }).catch(err=>console.log(err));
  },[setNombre,webId]);

  useEffect(()=>{
    getUserName();
  },[getUserName]);

  return (
    <Container className="fixed">
      <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
        <Card className="card">
          <Typography>
            <span className="miPerfil">Mi Perfil</span>
          </Typography>
          <CardActionArea>
            <Image
              className="perfil"
              property={VCARD.hasPhoto.iri.value}
              edit={editing}
              autosave
            />
            <br />
          </CardActionArea>
          <hr />
          <CardContent>
            <Typography>
              <span className="perfil-span">WebID:</span> {webId}
            </Typography>
            <hr className="line" />
            <Typography>
              <span className="perfil-span">Nombre del pod:</span>
              <br />{" "}
              <Text
                className="text"
                property={FOAF.name.iri.value}
                edit={editing}
                autosave
              />
            </Typography>
            <hr className="line" />
            <Typography>
              <span className="perfil-span">Nombre completo:</span>
              <br />{" "}
              <Text
                className="text"
                property={VCARD.fn.iri.value}
                edit={editing}
                autosave
              />
            </Typography>
            <Typography>
              <span className="perfil-span">Nombre de Usuario:</span><br/> <Text className="text" property={FOAF.name.iri.value} />
            </Typography>
            <hr className="line"/>
            <Typography>
              <span className="perfil-span">Descripcion:</span> <br />
              <Text
                className="text"
                property={VCARD.note.iri.value}
                edit={editing}
                autosave
              />
              <hr className="line" />
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              class="edit"
              size="small"
              style={{backgroundColor : colorEdit }}
              onClick={() => {
                setEditing(!editing);
                textEdit === "Confirmar"
                  ? setText("Editar perfil")
                  : setText("Confirmar");
                colorEdit === "#A4BC96"
                  ? setColor("#E5DBD4")
                  : setColor("#A4BC96");
              }}
            >
              {textEdit} <EditIcon />
            </IconButton>
          </CardActions>
          <br />
          <hr/>
          <div>
            <input id="input" type="text" ></input>
            <button onClick={()=>modificarNombreUsuario(getDefaultSession().info.webId,document.getElementById("input").value)} ></button>
            <p>{nombre}</p>
          </div>
          <LogoutButton>
            <button className="botonLogout">
              <span className="logout">Logout</span>
            </button>
          </LogoutButton>
          <hr />
        </Card>
      </CombinedDataProvider>
    </Container>
    
  );
};

export default Perfil;