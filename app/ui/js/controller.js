/**
 * Created by kc on 22.07.16.
 */

const $ = require('jquery');
const _ = require('lodash');

var surveyApp = angular.module('surveyApp', ['ngSanitize', 'ngCsv']);
surveyApp.controller('surveyCtrl', ['$scope', ($scope) => {
  var networkPool = core.getNetworkPool();
  $scope.settings = settings;

  function updateNetworks() {
    $scope.zigBeeNetworks = _.sortBy(networkPool.getNetworks(), 'extendedPanId');
    console.log('networks found: ', $scope.zigBeeNetworks);
    $scope.$apply();
    // Create charts after $apply, otherwise the element is not available!
    createNetworkCharts($scope.zigBeeNetworks, $scope);
  }

  // Wait for changes in the wireless networks
  core.on('networks', () => {
    updateNetworks();
  });

  $(document).ready(() => {
    console.log('document ready');
    updateNetworks();
  });

}]);