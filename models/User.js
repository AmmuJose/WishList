
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String, default: ''},
    email: {type: String}
});

var User = mongoose.model("User", UserSchema);
module.exports = User;