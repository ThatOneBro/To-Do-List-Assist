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
                alarm: 'off',
                completed: false,
                alert: []
            });
        };
        
        $scope.updateItem = function(item, newDetails, newDeadline, newAlarm){
			item.details = newDetails;
			item.deadline = newDeadline;
			item.alarm = newAlarm;
			$scope.addAlert(item, 'success', 'Update successful.');
        };
		
		$scope.addAlert = function(item, alertType, alertMsg){
            if(item.alert){
                item.alert = [];
            }
			item.alert.push({type: alertType, msg: alertMsg});
		};
		
		$scope.closeAlert = function(item, index){
			item.alert.splice(index, 1);
		};
    });
    
})();
