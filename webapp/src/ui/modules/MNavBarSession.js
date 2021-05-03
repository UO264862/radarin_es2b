// External dependences
import React from "react";
import {CombinedDataProvider, Text } from "@inrupt/solid-ui-react";
import Nav from "react-bootstrap/Nav";
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import {useWebId } from "@solid/react";
import LoginButton from "./LoginButtons.js"

function MNavBarSession() {
    const webId  = useWebId();

    //We have logged out


    return (
        <Nav>
            <Nav.Link>
                <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
                    <Text property={FOAF.name.iri.value} autosave />
                </CombinedDataProvider>
            </Nav.Link>
            <Nav.Link>
                <LoginButton />
            </Nav.Link>
        </Nav>
    );
}
export default MNavBarSession;


// linea 25 
// <Text property={FOAF.name.iri.value} autosave/> 