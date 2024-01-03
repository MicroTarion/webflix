import fetch from 'node-fetch';

export function details (req, res){
    const promises = [];
    const url = 'https://api.themoviedb.org/3/movie/'+req.params.id;
    const urlcast = 'https://api.themoviedb.org/3/movie/'+req.params.id+'/credits';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    };

    
    promises[promises.length] = fetch(url, options)
        .then(res => res.json())
        //.then(json => json.results.map(movie => { return {vote_average: movie.vote_average, release_date: movie.release_date, title: movie.title, poster_path: movie.poster_path,overview: movie.overview } }))
        .catch(err => console.error('error:' + err));
 
    promises[promises.length] = fetch(urlcast, options)
        .then(res => res.json())
        .then(json => json.cast.filter((cast) => cast.known_for_department=='Acting' && cast.order<=10))
    //     .catch(err => console.error('error:' + err));

    Promise.all(promises).then((values) => {
        //console.log(values)
        res.render('movie',{movie :values[0],cast: values[1]})
    })
    
    //.then(movie => res.render('movie', {movie}))
}
export function saveInBddMovie(req, res) {
    if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
        details(req,res).then(movie => {
            console.log(movie)
            //addMovie(movie);
        })
    } else {
        res.redirect('/admin')
    }   
}