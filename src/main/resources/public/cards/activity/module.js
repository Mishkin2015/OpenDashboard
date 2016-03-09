/*******************************************************************************
 * Copyright 2015 Unicon (R) Licensed under the
 * Educational Community License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 * http://www.osedu.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS"
 * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *******************************************************************************/
(function(angular, Math, moment) {
'use strict';
    
angular
.module('od.cards.activity', ['OpenDashboardRegistry', 'OpenDashboardAPI'])
 .config(function(registryProvider){
    registryProvider.register('activity',{
        title: 'Activity',
        description: '',
        imgUrl: '',
        cardType: 'activity',
        styleClasses: 'od-card col-xs-12',
	    config: [],
	    requires: ['ROSTER'],
	    uses: ['EVENT','MODELOUTPUT']
    });
 })
 .controller('ActivityController', function($scope, $translate, $translatePartialLoader, $log, _, SessionService, EventService, RosterService) {
	 
//	$translatePartialLoader.addPart('roster-card');
//    $translate.refresh();

$scope.labels = [];
$scope.data = [[]];
$scope.events = [];
for (var i = 0; i < 1000; i++) {
	
    var ts = "2016-02-" + Math.floor(Math.random()*(18-12+1)+12) + "T11:05:01.000Z";

    var obj = {
        "sourceId":i,
        "actor":"actor" + Math.floor(Math.random() * 6) + 1 ,
        "verb":"verb" + Math.floor(Math.random() * 6) + 1 ,
        "object":"object" + Math.floor(Math.random() * 6) + 1 ,
        "objectType":"objectType1",
        "context":"13",
        "organization":"org1",
        "timestamp": moment(ts, moment.ISO_8601).toDate()
    };
    
    $scope.events.push(obj);
}

var countByActor = function(event) { return event.actor; };
var countByVerb = function(event) { return event.verb; };

$scope.eventsByActor = _.chain($scope.events)
                        .countBy(countByActor)
                        .pairs().sortBy(1).reverse()
                        .value();
$scope.eventsByVerb = _.chain($scope.events)
						.countBy(countByVerb)
						.pairs().sortBy(1).reverse()
						.value();
   
   var occurrenceDay = function(occurrence){
    return moment(occurrence.timestamp).startOf('day').format();
   };

	var groupToDay = function(group, day){
	    return {
	        dt: {day:moment(day).format('MMM D'),d:moment(day)},
	        count: group.length
	    }
	};
	
	

	var result = _.chain($scope.events)
	    .groupBy(occurrenceDay)
	    .map(groupToDay)
	    .sortBy('dt.d')
	    .value();
	
	$scope.series = ['Events over time'];
	_.forEach(result,function(o){
	  $scope.labels.push(o.dt.day);
	  $scope.data[0].push(o.count);
	});
	   
	   $scope.refreshActivityStream = function() {
		   
	   };
	   
	   
	   
	});

})(angular, Math, moment);
