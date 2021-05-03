import React from 'react'
import { render} from "@testing-library/react";
import MapView from "./MapView";

test('Comprobar que todo se renderiza correctamente', async () => {
   render(<MapView/>);
});
