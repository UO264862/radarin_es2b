import React, { useEffect, useState, useCallback } from "react";
import {
  CombinedDataProvider,
  Image,
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
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import { modificarNombreUsuario, getUsernameByWebId } from "../api/api";
import EditIcon from "@material-ui/icons/Edit";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import "./styles/profile.css";
import { useWebId } from "@solid/react";

const Perfil = () => {
  const  webId  = useWebId();
  const [editing, setEditing] = useState(false);
  const [textEdit, setText] = useState("Editar perfil");
  const [colorEdit, setColor] = useState("#E5DBD4");
  const [nombre, setNombre] = useState(null);
  const [isBorder, setBorder] = useState("0px solid");

  var getUserName = useCallback(
    async function () {
      getUsernameByWebId(webId)
        .then((user) => {
          setNombre(user.nombreUsuario);
        })
        .catch((err) => console.log(err));
    },
    [setNombre, webId]
  );

  useEffect(() => {
    getUserName();
  }, [getUserName]);

  function setDisabled(){
    document.getElementById("input").setAttribute("disabled", true);
  }

  function setEnabled(){
    document.getElementById("input").removeAttribute("disabled");
  }

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
              <span className="perfil-span">Nombre de Usuario:</span>
              <br />
              <div>
                <input disabled style={{ border: isBorder }} autosave className = "inputEdit" id="input" type="text" placeholder={nombre}></input>
              </div>
            </Typography>
            <hr />
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
            <hr className="line" />
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
              style={{ backgroundColor: colorEdit }}
              onClick={() => {
                setEditing(!editing);
                if (textEdit === "Confirmar") {
                  setText("Editar perfil");
                  modificarNombreUsuario(
                    webId,
                    document.getElementById("input").value
                  );
                  toast.info("Tu perfil ha sido modificado", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000
                })
                  setBorder("0px solid");
                  setDisabled();
                } else {
                  setText("Confirmar");
                  setBorder("1px solid");
                  setEnabled();
                }
                  if(colorEdit === "#A4BC96"){
                  setColor("#E5DBD4");
                } else setColor("#A4BC96");
              }}
            >
              {textEdit} <EditIcon />
            </IconButton>
          </CardActions>
          <br />
          <hr />
        </Card>
      </CombinedDataProvider>
      <ToastContainer />
    </Container>
  );
};

export default Perfil;
