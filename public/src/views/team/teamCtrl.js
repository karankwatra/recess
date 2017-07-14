angular.module("app").controller("teamCtrl", function($scope, $state, teamService, $timeout, $compile, uiCalendarConfig) {

	$(document).ready(function() {
		$('.team-nav-buttons').on('click', function() {
			$('.team-nav-buttons').removeClass('active');
			$(this).addClass('active');
		});

			if($(window).width() <=760) $('#team-sidebar').removeClass("visible");
			else $('#team-sidebar').addClass("visible");
	});

	$('#from-time').calendar({
		onChange: function (date,text) {
			$scope.fromTime = moment.tz(date, 'UTC').format();
		}
	});

	$('#to-time').calendar({
		onChange: function (date,text) {
			$scope.toTime = moment.tz(date, 'UTC').format();
		}
	});



	$scope.triggerLocationModal = function(){
		$('#enter-location-modal')
			.modal({
				blurring: true
			})
			.modal('show');
	}

	$scope.triggerReservationModal = function(){
		$('#reservation-error-modal')
			.modal({
				inverted: true
			})
			.modal('show');
	}



	$scope.id = $state.params.id;
	$scope.name = "";
	$scope.events = [];
	var events = [];
	var socket = io.connect();

	$scope.sendMessage = function(message) {
		console.log(message);
		console.log(new Date());
		var time = moment().tz('UTC').format();
		console.log(time);
		socket.emit("newMessage", {message, username: $scope.name, room: $scope.activeLocation.location_id, time: time })
		teamService.sendMessage($scope.activeLocation.location_id, message, $scope.name).then(function(response){
			console.log(response);
		});
		return false;
	}

	socket.on('connect', function(){
		console.log("Connected")
	});

	socket.on('newRoomMessage', function(msg){
		console.log(msg);
		var time = moment(msg.time).tz(moment.tz.guess()).calendar();
		$scope.$apply(function () {
			$scope.messages.push({location_id: msg.room, message: msg.message, message_time: time, sender: msg.username})
    	});
	});

	teamService.getName().then(function(response){
		if(response.data.user){
			$scope.name = response.data.user;
		}
	})

	setTimeout(function(){
		if(!$scope.name){
			$('#enter-name-modal')
			.modal({
				blurring: true,
				inverted: true
			})
			.modal('setting', 'closable', false)
			.modal('show');
		}
	}, 10);

	teamService.getTeamName($scope.id).then(function(response) {
		$scope.teamName = response.team_name;
	})

	teamService.getTeamLocations($scope.id).then(function(response) {
		$scope.locations = response;
		$scope.locationName = response[0].location_name;
		$scope.activeLocation = response[0];
		socket.emit('room', {leaving: null, joining: response[0].location_id})

		teamService.getMessages(response[0].location_id).then(function(response){
			$scope.messages = response.data;
		})
		teamService.getCheckIns(response[0].location_id).then(function(response){
			$scope.checkIns = response.data;
		});
	});


	$scope.getName = function(user) {
		teamService.findUser(user).then(function(response){
			console.log(response);
			if(response.loggedIn){
				console.log("logged in");
				$('#recess-team-logo-img')
				.transition('horizontal flip')
				;
				$('#recess-team-logo-img')
				.transition('horizontal flip')
				;

				$scope.name = user.username;
				$scope.getReservations();

				teamService.startUserSession(user.username).then(function(response){
					console.log(response);
				})
			}
		})
	}

	$scope.pullOutSidebar = function(){
		$('#team-sidebar')
		.sidebar('setting', 'transition', 'overlay')
		.sidebar('toggle')
		var pusher = document.querySelector('.pusher')
		pusher.style.overflow = "auto"
		setTimeout(function(){$('#recess-team-logo-img').removeClass("hidden");},700)
	}

	$scope.changeLocation = function(location) {
		if($(window).width() <=760){	
			$('#team-sidebar')
			.sidebar('toggle')
		}

		socket.emit("room", {leaving: $scope.activeLocation.location_id, joining: location.location_id})
		$('.location')
  		.transition('scale')
		;
		$('.location')
		.transition('scale')
		;
		$scope.activeLocation = location;
		$timeout(function(){		$scope.locationName = location.location_name;
									teamService.getCheckIns(location.location_id).then(function(response){
										$scope.checkIns = response.data;
									});
									$scope.getReservations();
									teamService.getMessages(location.location_id).then(function(response){
										$scope.messages = response.data;
										console.log($scope.messages);
									})
		}, 190)
	}

	$scope.getReservations = function(){
		teamService.getReservations($scope.activeLocation.location_id).then(function(response){
			$scope.events.slice(0,$scope.events.length);
			events = [];
			for(var reservation of response){
				var title = "";
				if(reservation.title){
					title = reservation.reserver + " - " + reservation.title;
				}
				else{
					title = reservation.reserver
				}
				$scope.events.push({title:title, start:reservation.from_time, end:reservation.to_time});
				events.push(reservation);
			}
			uiCalendarConfig.calendars['locationCalendar'].fullCalendar('refetchEvents');
			$scope.reservations = [];
			for(var i = 0; i < events.length; i++){
				if(events[i].reserver === $scope.name){
					$scope.reservations.push(events[i]);
				}
			}
			for(var i = 0; i < $scope.reservations.length; i++){
				$scope.reservations[i].from_time = moment($scope.reservations[i].from_time).format('lll');
				$scope.reservations[i].to_time = moment($scope.reservations[i].to_time).format('lll');
			}
		})
	}

	$scope.addLocation = function(location_name){
		if(location_name){
			teamService.addLocation(location_name, $scope.id).then(function(response){
				teamService.getTeamLocations($scope.id).then(function(response){
					$scope.locations = response;
				})
			});
		}
	}

	$scope.checkInOutUser = function(){

		teamService.checkInOutUser($scope.id, $scope.activeLocation, $scope.name).then(function(response){
			teamService.getCheckIns($scope.activeLocation.location_id).then(function(response){
				$scope.checkIns = response.data;
				console.log(response.data);
			})
		});
	}

	$scope.deleteReservation = function(reservation_id){
		teamService.deleteReservation(reservation_id).then(function(response){
			$scope.getReservations();
		})
	}

	$scope.reserveLocation = function(reservationTitle){
		var valid = true;
		//make sure there are times and from time < to time
		if(!($scope.fromTime && $scope.toTime && moment($scope.fromTime).isBefore($scope.toTime))){
			valid = false;
		}
		if(valid){
			for(var i = 0; i < events.length; i++){
				//check if event starts or ends before another event
				if((moment($scope.fromTime).isBetween(events[i].from_time, events[i].to_time) || moment($scope.fromTime).isBetween(events[i].from_time, events[i].to_time))){
					valid = false;
				}
				//check if another event starts or ends at schedule attempt
				if((moment(events[i].from_time).isBetween($scope.fromTime, $scope.toTime) || moment(events[i].to_time).isBetween($scope.fromTime, $scope.toTime))){
					valid = false;
				}
				//check if event starts at same time as other event
				if(events[i].from_time == $scope.fromTime){
					valid = false;
				}
			}
		}
		if(!valid){
			$scope.triggerReservationModal();
		}
		else{
			teamService.reserveLocation(reservationTitle, $scope.name, $scope.activeLocation.location_id, $scope.fromTime, $scope.toTime).then(function(response){
				$scope.getReservations();
			})
		}

	}


	//Angular Calendar info
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: moment.tz.guess() // an option!
    };

    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
		defaultView: 'agendaDay',
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];


})
