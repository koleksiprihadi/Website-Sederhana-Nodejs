app.controller('MainController', ['$scope', function($scope){  
    $scope.database = [];
    $scope.addDatabase = function(){
        $scope.database.push($scope.form);
        $scope.form = {};
    } 
    $scope.remove=function(database){ 
        var index=$scope.databases.indexOf(database)
        $scope.databases.splice(index,1);     
    }
}]);