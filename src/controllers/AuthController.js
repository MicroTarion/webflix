
import UserRepo from '../repository/UserRepository.js'
import bcrypt from 'bcryptjs';
const saltRounds = 10
class AuthController {
    index (request, response) {
        response.render('auth')
    }
    process (request, response) {
        // Etape 1 : récupérer les information de l'utilisateur (via son email)
        console.log(request.body);
        UserRepo.getUserByUsername(request.body.username).then(infosUser => {
            // Etape 2 : Vérifier si user existe
            if(infosUser) {
                // Etape 3 : Vérifier si mot de passe correct
                if(bcrypt.compareSync(request.body.password, infosUser.password)) {
                    console.log('Bon username + bon mdp');
                    
                    // request.flash("notify", "Vous êtes maintenant connecté.");
                    response.redirect('/');
                    return;
                }
            }
            response.render('authentication/index', {error : "Identifiants incorrects", email : request.body.email})
        }).catch((error) => {
            console.log(error)
        })
       
    }
}
export default new AuthController();