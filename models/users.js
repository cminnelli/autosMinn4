
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema =  new Schema({
	tipoConsulta:String,
	auto:String,
	usuario:String,
	mail:String,
	mensaje:String,
	telefono:Number,
	fecha:{ type: Date, default: Date.now },
	

}, {collection:"usuarios"});

var usuarios = mongoose.model("usuarios" , userSchema)

module.exports = usuarios;