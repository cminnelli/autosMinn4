
var cloudinary = require('cloudinary');

var cargarImagenes = function(array , nameFile){
	
	for (i=0 ; i<array.length ; i++){
		cloudinary.uploader.upload(array[i].path, function(result) { 
			  console.log(result) 
		} , { public_id: nameFile + "-" + i});

	}
}

exports.loadImages = cargarImagenes;