const express = require("express")
const router = express.Router()

//Modelos
const User = require("./models/users")
const Usuarios = require("./models/Usuarios")
const FriendRequest = require("./models/FriendRequest")

// Devuelve el número de usuarios
router.get("/usuarios/count", async (req, res) => {
    const users = await Usuarios.find({}).sort('-_id') //Inverse order
    res.send(users.length);
})

//Añadir usuario COMPROBAR
router.post("/usuario/add", async (req, res) => {
    let webid = req.body.webid;
    let usuario = await Usuarios.findOne({ webid: webid })
    const users = await Usuarios.find({})
    if (usuario)
        res.send({ error: "Error: Este usuario ya ha sido añadido" })
    else {
        usuario = new Usuarios({
            nombreUsuario: users.length,
            webid: webid,
            coordinates: ""
        })
        await usuario.save()
        res.send(usuario)
    }
})

//Modificar nombre de usuario COMPROBAR
router.post("/usuario/modificar/nombre", async (req, res) => {
    let webid = req.body.webid;
    let nombreUsuario = req.body.nombreUsuario;
    let usuario = await Usuarios.findOne({ nombreUsuario: nombreUsuario })
    if (usuario)
        res.send({ error: "Error: Este nombre de usuario ya existe" })
    else {
        let usuario = await Usuarios.findOneAndUpdate(
            {
                webid: webid
            },
            {

                nombreUsuario: nombreUsuario,
            },
            { returnOriginal: false })
        if (usuario)
            res.send("El nombre ha sido cambiado con éxito")
        else
            res.send("Ha habido un error al cambiar el nombre")
    }
})

//Modificar localización de usuario COMPROBAR
router.post("/usuario/modificar/coordinates", async (req, res) => {
    let webid = req.body.webid;
    let coordinates = req.body.coordinates;
    let usuario = await Usuarios.findOne({ webid: webid })
    if (usuario) {
        let usuario = await Usuarios.findOneAndUpdate(
            {
                webid: webid
            },
            {
                coordinates: coordinates
            })
        if (usuario)
            res.send("La localización ha sido cambiado con éxito")
        else
            res.send("Ha habido un error al cambiar la localización")
    }
    else
        res.send("Ha habido un error")
})

//Obtener webid con nombre de usuario COMPROBAR
router.post("/usuario/nombreUsuario", async (req, res) => {
    let nombreUsuario = req.body.nombreUsuario;
    let usuario = await Usuarios.findOne({ nombreUsuario: nombreUsuario })
    if (usuario)
        res.send(usuario.webid)
    else {
        res.send("Error: Usuario no encontrado")
    }
})

//Obtener nombre de usuario con webid COMPROBAR
router.post("/usuario/webId", async (req, res) => {
    let webId = req.body.webId;
    let usuario = await Usuarios.findOne({ webid: webId })
    if (usuario) {
        res.send(usuario)
    }
    else {
        res.send("Error: Usuario no encontrado")
    }
})

//Añadir elemento a la tabla de peticiones COMPROBAR
router.post("/friendrequest/add", async (req, res) => {
    let webidSolicitante = req.body.webidSolicitante;
    let webidSolicitado = req.body.webidSolicitado;
    let peticion = await FriendRequest.findOne(
        {
            webidSolicitante: webidSolicitante,
            webidSolicitado: webidSolicitado
        })
    if (peticion)
        res.send({ error: "Error: Esta petición ya ha sido añadida" })
    else {
        peticion = new FriendRequest({
            webidSolicitante: webidSolicitante,
            webidSolicitado: webidSolicitado,
            status: "PENDIENTE"
        })
        await peticion.save()
        res.send(peticion)
    }
})

//Listar solicitudes pendientes COMPROBAR
router.post("/friendrequest/list/pendientes", async (req, res) => {
    let webidSolicitado = req.body.webidSolicitado;
    let peticiones = await FriendRequest.find(
        {
            webidSolicitado: webidSolicitado,
            status: "PENDIENTE"
        })
    res.send(peticiones)
})

//Listar solicitudes completadas COMPROBAR
router.post("/friendrequest/list/completadas", async (req, res) => {
    let webidSolicitante = req.body.webidSolicitante;
    let peticiones = await FriendRequest.find(
        {
            webidSolicitante: webidSolicitante,
            status: "COMPLETADO"
        })
    res.send(peticiones)
})

//Aceptar solicitud COMPROBAR
router.post("/friendrequest/aceptar", async (req, res) => {
    let webidSolicitante = req.body.webidSolicitante;
    let webidSolicitado = req.body.webidSolicitado;
    let peticion = await FriendRequest.findOne(
        {
            webidSolicitante: webidSolicitante,
            webidSolicitado: webidSolicitado
        })
    if (peticion) {
        let peticion = await FriendRequest.findOneAndUpdate(
            {
                webidSolicitante: webidSolicitante,
                webidSolicitado: webidSolicitado
            },
            {
                "$set": {
                    status: "COMPLETADO",
                }
            })
        if (peticion)
            res.send("La petición ha sido aceptada con éxito")
        else
            res.send("Ha habido un error al aceptar la petición")
    }
    else
        res.send("Ha habido un error")
})

//Eliminar solicitud COMPROBAR
router.post("/friendrequest/delete", async (req, res) => {
    let webidSolicitante = req.body.webidSolicitante;
    let webidSolicitado = req.body.webidSolicitado;
    let peticion = await FriendRequest.findOneAndDelete(
        {
            webidSolicitante: webidSolicitante,
            webidSolicitado: webidSolicitado
        })

    if (peticion)
        res.send("La petición " + peticion + " ha sido eliminada con éxito")
    else {
        res.send("Ha ocurrido un error")
    }
})


module.exports = router