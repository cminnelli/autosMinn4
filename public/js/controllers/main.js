app.controller("mainController" , function($scope , $http){
	var imgRoute = "imagenes/autos/";

$scope.autos;
$scope.viewAuto;
$scope.servicios =[{"nombre":"Venta de autos","descripcion":"Mira todos nuestros autos en stock!","imgUrl":"/imagenes/icons/venta.png","referencia":"autos"},
{"nombre":"Cotizá tu auto","descripcion":"Compramos autos de terceros. Si estas vendiendo tu auto, pedinos cotización!." , "imgUrl":"/imagenes/icons/compra.png","referencia":"contacto"},
{"nombre":"Gestoria","descripcion":"Gestión de transferencia , libre deuda, alta/bajas de patentes. Para más información contactanos","imgUrl":"/imagenes/icons/gestoria.png","referencia":"contacto"},
{"nombre":"Contactanos!","descripcion":"Ubicanos en el mapa y dejanos tu mensaje!","imgUrl":"/imagenes/icons/ubicacion.png","referencia":"contacto"}]	
	
$scope.seePhoto = function(obj){
	$scope.viewAuto = obj;
	 return $scope.viewAuto; 
}

$scope.consultar  = function(auto){
	$("#auto").val(auto.nombre);
	$(".tipoConsulta").val('venta');
	window.location = "#contacto"
}

$scope.contacto = function(nombre){
	if (nombre ==="Venta de autos"){
	window.location = "/#autos"
		
	}else {
		window.location = "/#contacto"
		$("#tipoConsulta").val(nombre);
	}
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


/*MATERIALIZE Y OTROS*/

$(document).ready(function() {
  $('select').material_select();
  $('.carousel').carousel();
  $('.materialboxed').materialbox();
  $('.carousel.carousel-slider').carousel({fullWidth: true});
  $('.collapsible').collapsible();




 })



