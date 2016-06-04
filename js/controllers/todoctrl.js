(function() {
    'use strict';
    
    angular.module('todoCtrl', [])
    
    .controller('todoCtrl', ['$scope', '$interval', function($scope, $interval){
        
		$scope.data = {
            orderBy: 'entry',
            todoItems: [],
			counter: 0
        };
        
        $scope.addItem = function(item){
            if(!item){
                return;
            }
            else {
                $scope.data.todoItems.push({
                    name: item.name,
                    details: 'No details given',
                    deadline: 'No deadline given',
                    alarm: false,
                    completed: false,
                    isCollapsed: true,
                    origIndex: $scope.data.counter,
                    updateAlert: []
                });
                $scope.data.counter++;
                item.name = null;
            }
        };
        
        $scope.updateItem = function(item, newDetails, newDeadline, newAlarm){
			if(newDetails){
                item.details = newDetails;
            }
            
            if(newDeadline){
                item.deadline = newDeadline;
                item.alarm = newAlarm;
                if(newAlarm){
                    $scope.addAlarm(item);
                }
            }
            else {
                removeAlarm(item.name);
                item.alarm = false;
            }
            
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
		
		$scope.closeAllItems = function(){			
			for(var i = 0; i < $scope.data.todoItems.length; i++){
				$scope.data.todoItems[i].isCollapsed = true;
			}
		};
        
        $scope.removeItem = function(item, index){
            $scope.data.todoItems.splice(index, 1);
            $scope.removeAlarm(item.name);
        };
        
        $scope.markAllItems = function(marked){
            if(marked){
                for(var i = 0; i < $scope.data.todoItems.length; i++){
                    $scope.data.todoItems[i].completed = true;
                }
            }
            else{
                for(var i = 0; i < $scope.data.todoItems.length; i++){
                    $scope.data.todoItems[i].completed = false;
                }
            }
        };
        
        /////////////////
        //Alarm section//
        /////////////////
        $scope.currentTime = { time : new Date() };

        $scope.goneOff = false;

        $scope.alarmAlerts = [];

        var alarm = document.getElementById("alarm-audio");

        // play alarm sound
        function playAlarm() {
            alarm.play();
        }

        // stop alarm sound
        function pauseAlarm() {
            alarm.pause();
        }

        // update the time every second, also check if any of the any of the alarms have been passed. If so, set alert.
        $scope.getTime = function() {

            $scope.currentTime = { time : new Date() };

        };

        $interval(function(){
            $scope.getTime();
            angular.forEach($scope.alarms, function(alarm, index){
                if(alarm.goneOff){
                    return;
                }
                else{
                    if(alarm.time <= $scope.currentTime.time) {
                        alarm.goneOff = true;
                        $scope.goneOff = true;
                        $scope.addAlarmAlert(alarm.forItem);
                        playAlarm();
                        return;
                    }
                }
            });
        }, 1000); 

        // Store alarms
        $scope.alarms = [];

        // when user clicks "X" button, remove alarm object from array
        $scope.removeAlarm = function(index) {
            var itemName = $scope.alarmAlerts[index].forItem;
            var alarm;

            for(var i = 0; i < $scope.alarms.length; i++){
                if($scope.alarms[i].forItem == itemName){
                    alarm = $scope.alarms[i];
                    $scope.alarms.splice(i, 1);
                    break;
                }
            }
            alarm.goneOff = false;
            $scope.goneOff = false;
            $scope.removeAlarmAlert(index);
            pauseAlarm();
        };

        // Input returns absolute datetime
        $scope.addAlarm = function(item) {
            $scope.alarms.push({time: item.deadline, goneOff: false, forItem: item.name});
        };

        $scope.addAlarmAlert = function(itemName) {
            $scope.alarmAlerts.push({msg: itemName + ' is due!', forItem: itemName});
        };

        $scope.removeAlarmAlert = function(index) {
            $scope.alarmAlerts.splice(index, 1);
        };
    }]); 
})();