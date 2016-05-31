(function() {
    'use strict';
    
    angular.module('todoCtrl', ['ui.bootstrap'])
    
    .controller('todoCtrl', function($scope){
        $scope.data = {
            orderBy: 'entry',
            todoItems: []
        };
        
        $scope.addItem = function(item){
            $scope.data.todoItems.push({
                name: item.name,
                isCollapsed: true,
                details: '',
                deadline: '',
                alarm: 'off'
            });
        };
        
        $scope.updateItem = function(item){
            
        };
    });
    
})();
