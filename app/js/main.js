/* global angular, console, _ */

var app = angular.module('app', ['ui.bootstrap']);

app.controller('appCtrl', function($scope, $http) {
  $scope._ = _;
  $scope.Clicks = 0;
  $scope.Impression = 0;
  $scope.json = null;

  $scope.onSelect = function ($item, $model, $label) {
    $scope.searchInJson($item);
  };

  $scope.searchInJson = function(e) {
    return $http.get('./data.json').then(function(response) {
      $scope.json = response.data;
      var reduceIt = false;
      var inputValue = e;

      var channels = [];
      var campaigns = [];
      var clicks = [];
      var impressions = [];

      $scope._.each($scope.json, function(val, i) {
        if($scope._.contains(val.channel.toLowerCase(), inputValue.toLowerCase()) === true) {
          channels.push(val.channel);
        }
        if($scope._.contains(val.campaign.toLowerCase(), inputValue.toLowerCase()) === true) {
          campaigns.push(val.campaign);
        }
        if(val.channel === inputValue) {
          reduceIt = true;
          clicks.push(val.clicks);
          impressions.push(val.impressions);
        } else if(val.campaign === inputValue) {
          reduceIt = true;
          clicks.push(val.clicks);
          impressions.push(val.impressions);
        }
      });
      if(reduceIt === true) {
        $scope.Clicks = clicks.reduce(function(total, n) {
          return parseInt(total) + parseInt(n);
        });
        $scope.Impression = impressions.reduce(function(total, n) {
          return parseInt(total) + parseInt(n);
        });
      } else {
        $scope.Clicks = 0;
        $scope.Impression = 0;
      }
      var mergedRes = channels.concat(campaigns);
      return $scope._.uniq(mergedRes);
    }, function(err) {
      console.log('Error happend');
    });
  };
});