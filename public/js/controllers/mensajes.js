myMsg.controller("mensajesController" , function($scope , $http){


$scope.mensajes

$scope.getCarsMsg = function(){
	var protocol = location.protocol;
	var host = location.host;

	$http({
	  method: 'GET',
	  url: protocol + '//' + host + '/mensajes'   // externa o a api ( http://localhost:8080/home/api)
	}).then(function successCallback(response) {
		$scope.mensajes = response.data;
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
}
})	
