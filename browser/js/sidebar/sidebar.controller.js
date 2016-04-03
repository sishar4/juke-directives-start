'use strict';

juke.controller('SidebarCtrl', function ($scope) {

});

juke.directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: '/js/sidebar/templates/sidebar.html'
  };
});
