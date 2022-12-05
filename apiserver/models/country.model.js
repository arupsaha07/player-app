var Database = require("../config/database");

class CountryModel extends Database {
    addCountry(data, callback) {
        if (data.status == 'true' || data.status == '1')
            data.status = 1;
        else
            data.status = 0;

        var sql = "INSERT INTO country(country_code,name,status) VALUES (?,?,?)";
        let cmd = this.db.prepare(sql);
        cmd.run([data.country_code, data.name, data.status], (err) => {
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
    updateCountry(data, callback) {
        if (data.status == 'true' || data.status == '1')
            data.status = 1;
        else
            data.status = 0;
        var sql = "UPDATE country SET country_code=?,name=?,status=? WHERE country_id=?";
        let cmd = this.db.prepare(sql);
        cmd.run([data.country_code, data.name, data.status, data.country_id], (err) => {
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
    deleteCountry(country_id, callback) {
        var sql = "DELETE FROM country WHERE country_id=?";
        let cmd = this.db.prepare(sql);
        cmd.run([country_id], (err) => {
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
    getAllCountries(callback) {
        var sql = "SELECT * FROM country";
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
    getCountryById(country_id, callback) {
        var sql = "SELECT * FROM country WHERE country_id=?";
        let cmd = this.db.prepare(sql);
        cmd.get([country_id], (err, result) => {
            if (err) {
                console.log(err);
                throw err;
            }
            cmd.finalize();
            callback(result);
            this.db.close();
        })
    }
    getCountriesPagewise(pageNo, callback) {
        if (!pageNo) {
            pageNo = 0;
        }
        let result = { "countries": "", "pages": "" };
        this.getPagination("SELECT COUNT(*) AS total FROM country", (pages,records) => {
            result.pages = pages;
            result.records = records;
            var pageLimit = this.item_per_page * pageNo;
            var sql = "SELECT * FROM country limit " + pageLimit + "," + this.item_per_page;
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
                result.countries = data;
                this.db.close();
                callback(result);
            });
        });
    }
}

module.exports = CountryModel;