admin.controller("adminController" , function($scope , $http){
	var mainImgRoute = "/imagenes/autos/";

$scope.autos;
$scope.servicios =[{"nombre":"Venta de autos","descripcion":"Vendemos autos, que estan buenisimo","imgUrl":"/imagenes/icons/venta.png","referencia":"autos"},
{"nombre":"Compra de autos","descripcion":"Compramos autos que tambien estan buenisimos","imgUrl":"/imagenes/icons/compra.png","referencia":"compra"},
{"nombre":"Gestoria","descripcion":"Gestionamos la documentacion de tu auto, ya sea..","imgUrl":"/imagenes/icons/gestoria.png","referencia":"gestoria"}]
	
	$scope.makeRuta = function(patente , ind){
		var index = ind;
		return mainImgRoute + patente +"_" + index + ".jpg";
	}

$scope.getCars = function(){
	var protocol = location.protocol;
	var host = location.host;

	$http({
	  method: 'GET',
	  url: protocol + '//' + host +'/api'   // se adapta al entorno
	}).then(function successCallback(response) {
		$scope.autos = response.data;
		console.log("Autos en stock cargados")
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
}
})	
