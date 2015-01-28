// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl' }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function($injector) {
    console.log("othewise : called");
    var tab = "dash";
    $injector.invoke(function(clickState) {
      if (clickState.clicked()) {
        console.log("otherwise : got clicked, going to friends.");
        tab = "friends"
      }
    });
    return '/tab/' + tab;
  });

})

.factory("clickState", function($ionicPlatform, $state, $window) {
  console.log("clickState : initializing");
  var gotClicked = false
  var isReady = false;

  $ionicPlatform.ready(function() {
    console.log("clickState : Platform is ready");

    function addNotif() {
      var now = new Date();
      now.setSeconds(now.getSeconds() + 10);
      var friendId = Math.floor(Math.random * 5);

      $window.plugin.notification.local.add({
        id: now.getTime().toString(),
        title: "Friend notif",
        autoCancel: true,
        date: now,
        json: {friendId : friendId}
      });
    }

    addNotif();
    $window.plugin.notification.local.onclick = function(id, state, json) {
      addNotif();
      console.log("clickState: got clicked : state is '" + state + "'");
      if (isReady) {
        console.log("clickState : got clicked : going to tab friends");
        $state.go("tab.friends");
      } else {
        console.log("clickState : got cliecked : Setting the state to clicked.");
        gotClicked = true;
      }
    };

  });

  return {
    clicked : function() {
      console.log("clickeState : The system is now ready as it checks for a click");
      isReady = true;
      var tmp = gotClicked;
      gotClicked = false;
      return tmp;
    }
  };

});

document.addEventListener("pause", function() { console.log("pause"); }, false);
document.addEventListener("resume", function() { console.log("resume"); }, false);
