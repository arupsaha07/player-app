var Database = require("../config/database");

class MatchModel extends Database {
    addMatch(data, callback) {
        var sql = "INSERT INTO `match` (descr,team_id_1,team_id_2,date1,time1,stadium) VALUES (?,?,?,?,?,?)";
        let cmd = this.db.prepare(sql);
        cmd.run([data.descr, data.team_id_1, data.team_id_2, data.date1, data.time1, data.stadium], (err) => {
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
    updateMatch(data, callback) {
        console.log(data);
        var sql = "UPDATE `match` SET descr=?, team_id_1=?, team_id_2=?, date1=?, time1=?, stadium=? WHERE match_id=?";
        let cmd = this.db.prepare(sql);
        cmd.run([data.descr, data.team_id_1, data.team_id_2, data.date1, data.time1, data.stadium, data.match_id], (err) => {
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
    deleteMatch(match_id, callback) {
        var sql = "DELETE FROM `match` WHERE match_id=?";
        let cmd = this.db.prepare(sql);
        cmd.run([match_id], (err) => {
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
    getAllMatches(callback) {
        var sql = "SELECT * FROM `match`";
        let cmd = this.db.prepare(sql);
        cmd.all((err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }
            cmd.finalize();
            callback(result);
            this.db.close();
        })
    }
    getMatchById(match_id, callback) {
        var sql = "SELECT * FROM `match` WHERE match_id=?";
        let cmd = this.db.prepare(sql);
        cmd.get([match_id], (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }
            cmd.finalize();
            callback(result);
            this.db.close();
        })
    }
    getMatchesPagewise(pageNo, callback) {
        if (!pageNo) {
            pageNo = 0;
        }
        let result = { "matches": "", "pages": "" };
        this.getPagination("SELECT COUNT(*) AS total FROM `match`", (pages,records) => {
            result.pages = pages;
            result.records = records;
            var pageLimit = this.item_per_page * pageNo;
            var sql = "SELECT * FROM `match` limit " + pageLimit + "," + this.item_per_page;
            this.db.all(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                
                result.matches = rows;
                this.db.close();
                callback(result);
            });
        });
    }
}

module.exports = MatchModel;