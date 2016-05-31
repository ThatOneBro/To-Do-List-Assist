(function() {
    'use strict';
    
    angular.module('todoCtrl', ['ui.bootstrap'])
    
    .controller('todoCtrl', function($scope){
        $scope.alerts = [];
		
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
        
        $scope.updateItem = function(item, newDetails, newDeadline, newAlarm){
			item.details = newDetails;
			item.deadline = newDeadline;
			item.alarm = newAlarm;
			$scope.addAlert('success', 'Update successful.');
        };
		
		$scope.addAlert = function(alertType, alertMsg){
			$scope.alerts.push({type: alertType, msg: alertMsg});
		};
		
		$scope.closeAlert = function(index){
			$scope.alerts.splice(index, 1);
		};
    });
    
})();
