var Database = require("../config/database");

class TeamModel extends Database {
    addTeam(data, callback) {
        if (data.status == 'true' || data.status == '1')
            data.status = 1;
        else
            data.status = 0;
        var sql = "INSERT INTO team(name,code,status,image) VALUES (?,?,?,?)";
        let cmd = this.db.prepare(sql);
        cmd.run([data.name, data.code, data.status, data.image], (err) => {
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
    updateTeam(data, callback) {
        if (data.status == 'true' || data.status == '1')
            data.status = 1;
        else
            data.status = 0;
        var sql = "UPDATE team SET name=?,code=?,status=?,image=? WHERE team_id=?";
        let cmd = this.db.prepare(sql);
        cmd.run([data.name, data.code, data.status, data.image,data.team_id], (err) => {
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
    deleteTeam(team_id, callback) {
        var sql = "DELETE FROM team WHERE team_id=?";
        let cmd = this.db.prepare(sql);
        cmd.run([team_id], (err) => {
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
    getAllTeams(callback) {
        var sql = "SELECT * FROM team";
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
    getTeamById(team_id, callback) {
        var sql = "SELECT * FROM team WHERE team_id=?";
        let cmd = this.db.prepare(sql);
        cmd.get([team_id], (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }
            cmd.finalize();
            callback(result);
            this.db.close();
        })
    }
    getTeamPagewise(pageNo, callback) {
        if (!pageNo) {
            pageNo = 0;
        }
        let result = { "teams": "", "pages": "" };
        this.getPagination("SELECT COUNT(*) AS total FROM team", (pages,records) => {
            result.pages = pages;
            result.records = records;
            var pageLimit = this.item_per_page * pageNo;
            var sql = "SELECT * FROM team limit " + pageLimit + "," + this.item_per_page;
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
                result.teams = data;
                this.db.close();
                callback(result);
            });
        });
    }
}

module.exports = TeamModel;