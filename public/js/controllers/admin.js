admin.service("adminService" ,  function(){
	this.checkBoxGet  = function(clase){
		var checkboxes = document.getElementsByClassName(clase);
		var equipamientoSelect = [];
		for (i = 0 ; i<checkboxes.length ; i++){
			var cb = checkboxes[i];
			if (cb.checked === true){
			 equipamientoSelect.push(cb.value);
			}
		}
		$("#caracteristicas").val(equipamientoSelect.toString());
		$("#caracteristicas").css({
			animation: 'rubberBand 1s',
			transition: '1s'
		});
		console.log(equipamientoSelect)
	}

	this.checkAll = function(clase){
		var checkboxes = document.getElementsByClassName(clase);
		for (i = 0 ; i<checkboxes.length ; i++){
			checkboxes[i].checked = "true";
		}
	}
})


admin.controller("adminController" , function($scope , $http, adminService){

$scope.autos;
$scope.equipamiento =  ["Airbag",  "Aire Acondicionado", "Cierre centralizado" , "Cierre con comando a distancia", "Cinturones Inerciales", "Climatizador automático", "Computadora de abordo" , "Control velocidad crucero", "Dirección Asistida",  "Espejos exteriores eléctricos", "Faros antiniebla delanteros",  "Faros regulables", "Frenos ABS",  "Limpia/lavafaros", "Radio-CD" ,  "Radio-Pasacassette",  "Sistema de alarma",  "Tapizado de cuero",  "Techo corredizo",   "Volante regulable" , "Todos"]
$scope.servicios =[{"nombre":"Venta de autos","descripcion":"Vendemos autos, que estan buenisimo","imgUrl":"/imagenes/icons/venta.png","referencia":"autos"},
{"nombre":"Compra de autos","descripcion":"Compramos autos que tambien estan buenisimos","imgUrl":"/imagenes/icons/compra.png","referencia":"compra"},
{"nombre":"Gestoria","descripcion":"Gestionamos la documentacion de tu auto, ya sea..","imgUrl":"/imagenes/icons/gestoria.png","referencia":"gestoria"}]


$scope.check = function(){
	adminService.checkBoxGet("equipamiento");
}

$scope.eraseCar = function(patente){
	var pat =  patente;
	window.location = "eliminar/" + pat;
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

