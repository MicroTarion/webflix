class HomeController {

    index (request, response) {
        response.render('home')
    }
    

};
const database_sql = require('../../app/database_sql')
database_sql.query()
con.promise().query("SELECT 'connexion SQL OK'").then(([rows]) => {
    console.log(Object.values(rows[0]));
    process.exit();
});


module.exports = new HomeController();