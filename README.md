[![CI for radarin](https://github.com/arquisoft/radarin_es2b/workflows/CI%20for%20radarin/badge.svg)](https://github.com/Arquisoft/radarin_es2b/actions)
[![codecov](https://codecov.io/gh/Arquisoft/radarin_es2b/branch/master/graph/badge.svg?token=5KEJ0DQDTU)](https://codecov.io/gh/Arquisoft/radarin_es2b)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/39b5e401a34f4b9eb499b8ecc9e798de)](https://www.codacy.com/gh/Arquisoft/radarin_es2b/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arquisoft/radarin_es2b&amp;utm_campaign=Badge_Grade)

# Proyecto RadarIn ES2B
- Acceso a la aplicación: [RadarIn-ES2B](https://radarines2bwebapp.herokuapp.com/).
- Acceso a la documentación: [Documentación de RadarIn-ES2B](https://radarines2bwebapp.herokuapp.com/docs/).

Nótese que a veces **puede tardar en cargar** porque el plan gratis de Heroku pone a dormir sus contenedores cuando no se usan durante un tiempo y volverlos a levantar lleva tiempo.

## Colaboradores
- Iván Álvarez López UO264862@uniovi.es
- Iyan Sanjurjo Luna UO264921@uniovi.es
- Miguel Fernández Álvarez UO269736@uniovi.es
- Esther González García de Vega UO269763@uniovi.es
- Andrés del Pozo Amo UO271035@uniovi.es

## Quick start guide
If you want to execute the project you will need [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) and [Docker](https://docs.docker.com/get-docker/). Make sure the three of them are installed in your system. Download the project with `git clone https://github.com/Arquisoft/radarin_es2b.git`. The fastest way to launch everything is with docker:
```
docker-compose up --build
```
This will create two docker images as they don't exist in your system (the webapp and the restapi) and launch a mongo container database. It will also launch Prometheus and Grafana containers to monitor the webservice. You should be able to access everything from here:
 - [Webapp - http://localhost:3000](http://localhost:3000)
 - [Docs - http://localhost:3000/docs](http://localhost:3000/docs)
 - [RestApi example call - http://localhost:5000/api/users/list](http://localhost:5000/api/users/list)
 - [RestApi raw metrics - http://localhost:5000/metrics](http://localhost:5000/metrics)
 - [Prometheus server - http://localhost:9090](http://localhost:9090)
 - [Grafana server http://localhost:9091](http://localhost:9091)
 
If you want to run it without docker (even though you still need docker to run the mongo db database):
```
cd restapi
mkdir data
sudo docker run -d -p 27017:27017 -v `pwd`/data:/data/db mongo
```
Compile and run the web app:
```
cd webapp
npm install
npm start
```
Now the webservice:
```
cd restapi
npm install
npm start
```
You should be able to access the application in [http://localhost:3000](http://localhost:3000) and the documentation in [http://localhost:3000/docs](http://localhost:3000/docs)  
