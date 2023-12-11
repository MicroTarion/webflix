
import con from '../../app/database_sql.js';

 class UserRepository {

    async add(user) {
        await con.promise().query('INSERT INTO `user` SET ?', user);
    }

    async getUserByUsername(username){
        return await con.promise().query('SELECT * FROM `user` WHERE ?', { username }).then((result) => { 
            return (result[0].length > 0 ? result[0][0] : null);
        });
    }
    // async getUserById(id) {
    //     return await con.promise().query('SELECT * FROM `users` WHERE ?', { id }).then((result) => { 
    //         return (result[0].length > 0 ? result[0][0] : null);
    //     });
    // }

    // async getAllUsers() {
    //     return await con.promise().query('SELECT * FROM `users`').then((result) => { 
    //         return (result[0].length > 0 ? result[0] : null);
    //     });
    // }
    // async deleteUser(id){
    //     return await con.promise().query('DELETE FROM `users` WHERE ?', { id });
    // }
    // async updateUser(user, id){
    //     return await con.promise().query('UPDATE `users` SET `email` = ?,`civility` = ?,`lastname` = ?, `firstname` = ?, `phone` = ? WHERE `users`.`id`=?', 
    //         [user.email,user.civility,user.lastname,user.firstname,user.phone,id]
    //     );
    // }

}
export default new UserRepository();