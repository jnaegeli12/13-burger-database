const router = require('express').Router();
const burger = require("../models/burger");

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function (result) {
        res.json({ id: result.insertId });
    });
    console.log(req.body.name);
    console.log(req.body.devoured);
});

router.put("/api/burgers/:id", function (req, res) {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;