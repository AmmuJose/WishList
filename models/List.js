var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
    title: {type: String},
    items: [{
        name: {type: String},
        description: {type: String}
    }],
    owner:{type: Schema.Types.ObjectId, ref: 'User'},
    shared_with: []
});

var List = mongoose.model("List", ListSchema);
module.exports = List;