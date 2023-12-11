import AuthController from '../src/controllers/AuthController.js';


export default (app) => {
    app.get('/', (req, res) => {
        res.render("home");
    });
    app.get('/auth',(req, res) => {
        res.render("auth");
    });
    app.post('/auth', AuthController.process)
    
};