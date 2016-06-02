(function() {
    'use strict';
    
    angular.module('todoCtrl', ['ui.bootstrap'])
    
    .controller('todoCtrl', function($scope){
        
		$scope.data = {
            orderBy: 'entry',
            todoItems: [],
			counter: 0
        };
        
        $scope.addItem = function(item){
            $scope.data.todoItems.push({
                name: item.name,
                details: 'No details given.',
                deadline: 'No deadline given.',
                alarm: false,
                completed: false,
				isCollapsed: true,
				origIndex: $scope.data.counter,
				updateAlert: []
            });
			
			$scope.data.counter++;
        };
        
        $scope.updateItem = function(item, newDetails, newDeadline, newAlarm){
			item.details = newDetails;
			item.deadline = newDeadline;
			item.alarm = newAlarm;
			$scope.addAlert(item, 'success', 'Update successful.');
        };
		
		$scope.addAlert = function(item, alertType, alertMsg){
            if(item.updateAlert){
                item.updateAlert = [];
            }
			item.updateAlert.push({type: alertType, msg: alertMsg});
		};
		
		$scope.closeAlert = function(item, index){
			item.updateAlert.splice(index, 1);
		};
		
		$scope.orderChange = function(){
			if($scope.data.orderBy == 'entry'){
				
			}
			
			else if($scope.data.orderBy == 'deadline'){
				
			}
		}
    });
    
})();
