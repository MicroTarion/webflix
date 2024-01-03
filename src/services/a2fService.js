import { enableA2FByUsername } from '../repository/User.js'
import QRCode from 'qrcode';
import { authenticator }from 'otplib';
//console.log(authenticator.generateSecret());


export function enable(req, res) {   
    QRCode.toDataURL(authenticator.keyuri(req.user, 'WebFlix', process.env.SECRET_2FA), (err, url) => {
        if (err) res.redirect('/');
        res.render('2fa-qrcode', { 
            qr: url, 
            account: `WebFlix`,
            key: process.env.SECRET_2FA
        });
        // passe le statut A2F à true en BDD pour l'utilisateur
        enableA2FByUsername(req.user);
    }); 
}

export function form(req, res) { 
    if(req.session.a2f != undefined && req.session.a2f) {
        return res.redirect('/admin')
    }
    res.render('2fa-form'); 
}

export function valid(req, res) {
    try {
        const isValid = authenticator.check(req.body.number_2fa, process.env.SECRET_2FA);
        // si c'est valide, on peut connecter l'utilisateur
        if(isValid) {
            req.session.a2f = true;
            res.redirect('/admin')
        } else {
            // si non valide, recharger la page du formulaire 2FA
            res.render('2fa-form', {statut: 'error'});
        }
    } catch (err) {
        res.render('2fa-form', {statut: 'error'});
    }
}