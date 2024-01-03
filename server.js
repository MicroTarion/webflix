import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './app/routes.js';
import session from 'express-session';
import flash from 'express-flash-messages';




const __dirname = path.dirname(fileURLToPath(import.meta.url));




const app = express();
app.use(session({
    secret: process.env.APP_KEY, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));

app.use((req, res, next) => {
    if(process.env.APP_ENV === 'dev') {
        req.session.a2f = true;
    }
    next();
})
//--------------------------------------------------------------------
//      transférer les sessions à toutes les vues (templates)
//--------------------------------------------------------------------
app.use((req, res, next) => {
    res.locals.route = req._parsedUrl.pathname;
    res.locals.session = req.session;
    next();
})
//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
app.use(flash());

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
//     JWT et connexion
//--------------------------------------------------------------------



//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------
app.listen(process.env.HTTP_PORT,() => {
    console.log(`Le serveur est démarré : http://localhost:${process.env.HTTP_PORT}`);
});
