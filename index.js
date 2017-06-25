
var express = require("express");
var app = express();
const port = process.env.PORT || 3000  
var path = require("path");
var fs = require("fs");
var nodemailer = require('./public/js/otros/nodeMailer.js');
var multer = require("nodemailer");
var multer = require("multer");
var upload = multer({dest:"public/imagenes/autos/"});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imagenes/autos/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.patente + '-' + Date.now() + ".jpg")
  }
})

var upload = multer({ storage: storage })

/*MONGO Y MONGOOSE*/
var mongoose = require("mongoose");
mongoose.connect("mongodb://cminnelli:alaska88@ds157499.mlab.com:57499/autos"); //MODO REMOTO MLAB
/*mongoose.connect("mongodb://localhost:27017/autos");  MODO LOCAL  */

/*MODELOS DE MONGOOSE*/
var autos = require("./models/auto.js")
var usuarios = require("./models/users.js")

/*CLOUDINARY*/
var cloudinary = require("cloudinary")
cloudinary.config({ 
  cloud_name: 'dr8t3qbki', 
  api_key: '271889835451273', 
  api_secret: 'kw2EUv5xS7JWdWLqBkM5pOi9BFQ' 
})

var uploadCloud = require("./public/js/otros/cloudinary.js")

/*BODY PARSER MIDDLEWARE*/
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*SERVE STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, function(req , res){
	console.log("listening in port: " + port);
})

app.get("/" , function(req,res){
	res.sendFile(path.join(__dirname ,"index.html"));
})

app.get("/admin" , function(req,res){
	res.sendFile((path.join(__dirname ,"myadmin.html")));
})

app.post("/log" , function(req,res){
	var userLog = req.body.user;
	var userPass = req.body.password;

	var users = [{user:"cminnelli" , pass:"880min.." , imgUrl:"daniimg" }, {user:"dminnelli" , pass:"880min.." , imgUr:"daniimg" } , {user:"gminnelli" , pass:"880min.." , imgUrl:"daniimg" }]

	var searchUser = users.find(function(item){
	return 	item.user === userLog && item.pass === userPass ;
	})

		if (searchUser){
			res.redirect("/admin" );
		}else{
			res.send("no existis")
		}

})



app.post("/newContactUser" , function(req , res){
	var newUser = new usuarios({
		tipoConsulta:req.body.tipoConsulta,
		auto:req.body.auto,
		usuario:req.body.user,
		mensaje:req.body.mensaje,
		mail:req.body.mail,
		telefono:req.body.telefono,
	})

	newUser.save(function(err , user){
		if (err){
			res.send(err);
		}else{
		res.send("<h1>Tu mensaje se envio Correctamente </h1> <br> <h2>Gracias por contactarnos</h2>")
		}
	})

})

app.post("/newCar", upload.any(), function(req,res){
	var archivos = req.files;// se obtiene con multer - los guarda en autos como temp
	
	uploadCloud.loadImages(archivos , req.body.patente)
	
	var newAuto = new autos ({
		nombre: req.body.nombre,
		patente:req.body.patente,
		marca:req.body.marca,
		year:req.body.year,
		precio:req.body.precio,
		color:req.body.color,
		combustible:req.body.combustible,
		km:req.body.km,
		caracteristicas:req.body.caracteristicas,
		comentarios:req.body.comentarios,
	})


	for (i = 0 ; i < archivos.length ; i++){
		newAuto.imgUrl.push(archivos[i].filename);
	}

	newAuto.save(function(err, auto){
	if (err){
		res.send(err);
	}else{
	res.sendFile(path.join(__dirname , "myadmin.html"))
	}
})
})

app.post("/eliminar" , function(req , res){
	var pat = req.body.patente;
	autos.remove({patente:pat}, function(err, response){
		if (err){
			throw err;
		} else if (response === null){
			res.send("No existe patente");
		}else{
			res.sendFile(path.join(__dirname , "myadmin.html"))
		}
	})
})


app.post("/modificarEstado" , function(req , res){
	var pat = req.body.patente;
	var pre = req.body.precio;

	autos.findOneAndUpdate({patente:pat},{$set:{precio:pre}}, function(err, response){
		if (err){
			throw err;
		} else if (response === null){
			res.send("No existe registro");
		}else{
			res.sendFile(path.join(__dirname , "myadmin.html"))
		}
	})
	

})




	app.get("/comentarios" , function(req , res){
		res.sendFile(path.join(__dirname , "mensajes.html"))
	})

		app.get("/login" , function(req , res){
		res.sendFile(path.join(__dirname , "login.html"))
	})


	app.get("/mensajes" , function(req , res){
		usuarios.find({}, function(err , us){
			if (err){
				console.log(err);
			}else{
				res.send(us)
				return us
			}
		})
	})
	

	app.get("/api", function(req, res){

		autos.find({} , function(err,autos){
			if (err){
				console.log(err);
			}else{
				res.send(autos);
				return autos;
			}
		})
	})
