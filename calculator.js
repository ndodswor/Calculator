//initialize price / plan object
var getPrices = function() {
  return JSON.parse('{"direct":{"month":{"mobile":9.99,"responsive":19,"responsive_100":29,"responsive_2500":46},"year":{"mobile":86.4,"responsive":171,"responsive_100":270,"responsive_2500":441},"lifetime":{"mobile":159,"responsive":299}},"reseller":{"month":{"mobile":6,"responsive":13,"responsive_100":21,"responsive_2500":35},"year":{"mobile":60,"responsive":117,"responsive_100":204,"responsive_2500":348},"lifetime":{"mobile":159,"responsive":299}},"pro":249}');
};

var getModel = function(period, type) {
	return period + '_' + type;
}
//controller for profit calculator
var myRevenueController = function($scope) {
  $scope.chargeToBuild = 500;
  $scope.chargeToMaintain = 50;
  $scope.saleNumbers = [1, 2, 3, 4, 5, 10, 15];
  $scope.prices = getPrices();
};

//controller for cost calculator
var myCostController = function($scope) {
  //initialize base prices
  $scope.prices = getPrices();
  $scope.checkbox = {reseller: 'direct'};
  $scope.plans = angular.copy($scope.prices['direct']);
  var total = {
    month: 0,
    year: 0,
    lifetime: 0
  };
  //initialize all base input variables
  for (var Period in $scope.plans) {
    for (var Type in $scope.plans[Period]) {
      $scope.plans[Period][Type] = 0;
    }
  }
  
  //function to generate periodic subtotals
  $scope.subTotal = function(period) {
    var subTotal = 0;
    var periodPrices = $scope.prices[$scope.checkbox.reseller][period];
    console.log(periodPrices);
    for (var siteType in periodPrices) {
      subTotal += $scope.plans[period][siteType] * periodPrices[siteType];
    }
    //adjust yearly if they're a reseller
    if (period === 'year' && $scope.checkbox.reseller == 'reseller') {
      subTotal += $scope.prices.pro;
    }
    return subTotal;
  };
};

//hook angular into DOM
var myApp = angular.module('myApp', []);
myApp.controller('myRevenueController', ['$scope', myRevenueController])
myApp.controller('myCostController', ['$scope', myCostController]);
