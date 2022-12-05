var Database = require("../config/database");

class UserModel extends Database {
    authenticate(username, password, callback) {
        var sql = "SELECT * FROM users WHERE username=? and password=?";
        let cmd = this.db.prepare(sql);
        cmd.all([username, password], (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }
            cmd.finalize();
            callback(result);
            this.db.close();
        });
    }
    addUser(data, callback) {
        if (data.status == 'true' || data.status == '1')
            data.status = 1;
        else
            data.status = 0;
        var sql = "INSERT INTO users (firstName,lastName,username,password,status) VALUES (?,?,?,?,?)";
        let cmd = this.db.prepare(sql);
        cmd.run([data.firstName, data.lastName, data.username, data.password,data.status], (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        cmd.finalize();
        var message = { "success": "Saved Successfully" };
        callback(message);
        this.db.close();
    }
    updateUser(data, callback) {
        if (data.status == 'true' || data.status == '1')
            data.status = 1;
        else
            data.status = 0;
        var sql = "UPDATE users SET firstName=?, lastName=?, username=?, password=?, status=? WHERE id=?";
        let cmd = this.db.prepare(sql);
        cmd.run([data.firstName, data.lastName, data.username, data.password, data.status, data.id], (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        cmd.finalize();
        var message = { "success": "Saved Successfully" };
        callback(message);
        this.db.close();
    }
    getUsersPagewise(pageNo, callback) {
        if (!pageNo) {
            pageNo = 0;
        }
        let result = { "users": "", "pages": "" };
        this.getPagination("SELECT COUNT(*) AS total FROM users", (pages,records) => {
            result.pages = pages;
            result.records = records;
            var pageLimit = this.item_per_page * pageNo;
            var sql = "SELECT * FROM users limit " + pageLimit + "," + this.item_per_page;
            this.db.all(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                var counter = rows.length;
                let data = [];
                for (var i = 0; i < counter; i++) {
                    data[i] = rows[i];
                    if (data[i].status == 1)
                        data[i].status = true;
                    else
                        data[i].status = false;
                }
                result.users = data;
                this.db.close();
                callback(result);
            });
        });
    }

    getUserById(id,callback){
        var sql = "SELECT * FROM users WHERE id=?";
        let cmd = this.db.prepare(sql);
        cmd.get([id],(err,result)=>{
            if(err){
                console.log(err);
                throw err;
            }
            cmd.finalize();
            callback(result);
            this.db.close();
        })
    }
    getAllUsers(callback){
        var sql ="SELECT * FROM users";
        let cmd = this.db.prepare(sql);
        cmd.all((err,result)=>{
            if(err){
                console.log(err);
                throw err;
            }
            cmd.finalize();
            callback(result);
            this.db.close();
        });
    }
    deleteUser(id, callback) {
        var sql = "DELETE FROM users WHERE id=?";
        let cmd = this.db.prepare(sql);
        cmd.run([id], (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        cmd.finalize();
        var message = { "success": "Deleted Successfully" };
        callback(message);
        this.db.close();
    }
}

module.exports = UserModel;