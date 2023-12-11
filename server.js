
import express from 'express';
import path from 'path';
import dotenv from 'dotenv/config';
import { fileURLToPath } from 'url';
import routes from './app/routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();


//--------------------------------------------------------------------
//      Mise en place du moteur de template
//--------------------------------------------------------------------
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

//--------------------------------------------------------------------
//      Mise en place du répertoire static
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
routes(app);

//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(process.env.HTTP_PORT,() => {
    console.log(`Le serveur est démarré : http://localhost:${process.env.HTTP_PORT}`);
});