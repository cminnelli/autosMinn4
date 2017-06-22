var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var autoSchema = new Schema({
	nombre: String,
	patente:String,
	marca:String,
	year:Number,
	precio:Number,
	combustible:String,
	color:String,
	km:Number,
	caracteristicas:String,
	comentarios: String,
	imgUrl:Array
}, {collection:"stockAutos_"})

var autos = mongoose.model("autos" , autoSchema)

module.exports = autos;