import React from "react";
import { calcularDistancia, getMarkers, iconByColourCode, getMarker } from "./Markers";
import "@testing-library/jest-dom/extend-expect";
import { divIcon  } from 'leaflet';
import { UserDTO } from "../domain/UserDTO";
import { Marker, Popup } from 'react-leaflet';

test ("comprobar que el Markers funciona correctamente", async () => {
  expect(calcularDistancia(0,0,0,0)).toBe(0);
  var users=[];
  expect(getMarkers(users)).toStrictEqual(users);
  var user = new UserDTO({ username: "pedro", latitude: parseFloat("58"), longitude: parseFloat("45")})
  users=[user];
  var usersEx=[getMarker(user, "#FFCD00", parseInt(1))];
  expect(getMarkers(users).toString()).toStrictEqual(usersEx.toString());
  var style=`background-color: yellow;
            width: 3rem;
            height: 3rem;
            display: block;
            left: -1.5rem;
            top: -1.5rem;
            position: relative;
            border-radius: 3rem 3rem 0;
            transform: rotate(45deg);
            border: 1px solid #FFFFFF`;
  var a =divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${style}" />`
    });
    expect(iconByColourCode("yellow")).toStrictEqual(a);
    var b= <Marker key={parseInt(0)} ref={(ref) => { if (ref && ref.leafletElement) { ref.leafletElement.openPopup(); } }} position={user.getLatLng()} icon={iconByColourCode('yellow')} >
                <Popup><pre>{user.toString()}</pre></Popup>
            </Marker>;
    expect(getMarker(user,"yellow",parseInt(0)).toString()).toStrictEqual(b.toString());
    var c= <Marker key={parseInt(0)} ref={(ref) => { if (ref && ref.leafletElement) { ref.leafletElement.openPopup(); } }} position={user.getLatLng()} icon={iconByColourCode('#FFFFFF')} >
                <Popup><pre>{user.toString()}</pre></Popup>
            </Marker>;
    expect(getMarker(user,null,parseInt(0)).toString()).toStrictEqual(b.toString());
});