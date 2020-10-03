const connection = require("./connection");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + " = " + 1);
        }
    }
    return arr.toString();
}

const orm = {
    selectAll: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
        
        queryString += " (" + cols.toString() + ") ";
        queryString += "VALUES (" + printQuestionMarks(vals.length) + ")";

        console.log(queryString);

        connection.query(queryString, vals, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    updateOne: function (tableInput, objColVals, condition, cb) {
        let queryString = "UPDATE " + tableInput;
        
        queryString += " SET " + objToSql(objColVals);
        queryString += " WHERE " + condition;

        console.log(queryString);

        connection.query(queryString, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    }
};

module.exports = orm;