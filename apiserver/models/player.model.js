var Database = require("../config/database");

class PlayerModel extends Database {
    addPlayer(data, callback) {
        var sql = "INSERT INTO player(team_id,name,country_id,date_of_birth,batting_style,bowling_style,image) VALUES (?,?,?,?,?,?,?)";
        let cmd = this.db.prepare(sql);
        cmd.run([data.team_id, data.name, data.country_id, data.date_of_birth, data.batting_style, data.bowling_style, data.image], (err) => {
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
    updatePlayer(data, callback) {
        var sql = "UPDATE player SET team_id=?,name=?,country_id=?,date_of_birth=?,batting_style=?,bowling_style=?,image=? WHERE player_id=?";
        let cmd = this.db.prepare(sql);
        cmd.run([data.team_id, data.name, data.country_id, data.date_of_birth, data.batting_style, data.bowling_style, data.image, data.player_id], (err) => {
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
    deletePlayer(player_id, callback) {
        var sql = "DELETE FROM player WHERE player_id=?";
        let cmd = this.db.prepare(sql);
        cmd.run([player_id], (err) => {
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
    getAllPlayers(callback) {
        var sql = "SELECT * FROM player";
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
    getPlayerById(player_id, callback) {
        var sql = "SELECT * FROM player WHERE player_id=?";
        let cmd = this.db.prepare(sql);
        cmd.get([player_id], (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }
            cmd.finalize();
            callback(result);
            this.db.close();
        })
    }
    getPlayersPagewise(pageNo, callback) {
        if (!pageNo) {
            pageNo = 0;
        }
        let result = { "players": "", "pages": "" };
        this.getPagination("SELECT COUNT(*) AS total FROM player", (pages,records) => {
            result.pages = pages;
            result.records = records;
            var pageLimit = this.item_per_page * pageNo;
            var sql = "SELECT * FROM player limit " + pageLimit + "," + this.item_per_page;
            this.db.all(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                result.players = rows;
                this.db.close();
                callback(result);
            });
        });
    }
}

module.exports = PlayerModel;