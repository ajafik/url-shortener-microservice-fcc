const mongoose = require("mongoose");
var autoIncrement = require("mongodb-autoincrement");

const Schema = mongoose.Schema;
const db = require("./db");

const urlSchema = new Schema(
  {
    _id: Number,
    original: String,
    short_url: String
  },
  { _id: false }
);

urlSchema.plugin(autoIncrement.mongoosePlugin);

const UrlModel = mongoose.model("Shortenned_URL", urlSchema);

const Url = {
  Add: function (data) {
    return new Promise(function (resolve, reject) {
      const url = new UrlModel(data);
      url.save(function(error, response){
        if(error) {reject(error);} else {
          resolve(response);}
      });
    });

  },
  Get: function (id) {
    return new Promise(function (resolve, reject) {
      UrlModel.findOne({ _id: id }, function (error, data) {
        if(error) {return reject(error);} else {
          return resolve(data);
        }
      });
    });

  }
};

module.exports = Url;