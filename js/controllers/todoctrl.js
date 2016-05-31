(function() {
    'use strict';
    
    angular.module('todoCtrl', [])
    
    .controller('todoCtrl', function($scope){
        $scope.data = {
            orderBy: 'entry',
            todoItems: []
        };
        
        $scope.addItem = function(item){
            $scope.data.todoItems.push({
                name: item.name,
                details: item.details,
                deadline: item.deadline,
                alarm: item.alarm
            });
        };
    });
    
})();
