var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var dns = require("dns");
var opn = require("opn");
var dataHelper = require("./dataHelpper");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/shorturl/new", function (req, res) {
    var url = req.body.url;
    url = url.slice(url.indexOf(":") + 3);
    dataHelper.Add({ original: url }).then(function (response) {
        dns.lookup(url, (err, address, family) => {
            if (!err) {
                return res.json({ "original_url": response.original, "short_url": response._id });
            } else {
                return res.json({ "error": "invalid URL" });
            }
        });
    }).catch(function (error) {
        return res.json({ "error": "Data not profiled" + error });
    });

});

app.get("/api/shorturl/:id", function (req, res) {
    var url_string = "";
    dataHelper.Get(req.params.id).then(function (status) {
        url_string = status.original;
        opn("http://" + status.original);
        res.json({ "original_url": status.original, "short_url": status._id });
    });

});

app.listen(3000, function () {
    console.log("App running on PORT => 3000");
});