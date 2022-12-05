var sqlite3 = require("sqlite3").verbose();
class Database {
    constructor() {
        
        this.item_per_page = 10;
        this.db = new sqlite3.Database(__dirname.replace("config","")+'ipl.sqlite', (err) => {
            if (err) {
                console.log(err.message);
                throw err;
            }
        });
    }

    getPagination(sql, callback) {
        this.db.get(sql, (err, row) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            let count = row["total"];
            let paginationCount = Math.ceil(count / this.item_per_page);
            callback(paginationCount,count);
        });
    }
}

module.exports = Database;
