import {search, details, detailsMax} from "../services/themoviebdService.js";
import {addMovie} from "../repository/Movie.js";

export function searchMovie(req, res) {
    if(req.query.q !== undefined && req.query.q != "") {
        search(req.query.q).then(movies => {  
            res.render('admin', {q:req.query.q,  movies })
        });
    }
    else {
        res.render('admin');
    }
}


export function saveMovie(req, res) {
    if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
        details(req.params.id).then(movie => {
            // console.log(movie);
            res.render('admin/save', {movie});
        })
    } else {
        res.redirect('/admin')
    }   
}

export function saveInBddMovie(req, res) {
    if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
        details(req.params.id).then(movie => {
            console.log(movie)
            addMovie({
                tmdb_id: movie.tmdb_id, 
                title: movie.title, 
                year: movie.release_date,
                synopsis: movie.overview,
                note: movie.vote_average, 
                picture: movie.poster_path,
                user_id: req.user_id
                });
            req.flash("notify", `Le film a bien été enregistré !`)
            res.redirect('/admin/movie/'+req.params.id)
        })
    } else {
        res.redirect('/admin')
    }   
}