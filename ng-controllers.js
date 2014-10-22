/*
|------------------------------------------------------------------------------
| Controllers                                                    controllers.js
|------------------------------------------------------------------------------
*/

/**
 * Create global App module
 * the App variable is accessible thoughout the application.
 */
var App = angular.module('bpsApp', ['ngRoute', 'ngResource', 'ngChartist']);
    
    
/**
 * Configure the application routes
 */
App.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    
   $routeProvider
        .when('/', {
           controller: 'ProjectListController',
           templateUrl: 'view-project-list.html'
        })
        .when('/project/:id', {
           controller: 'ProjectShowController',
           templateUrl: 'view-project-show.html'
        })
        .when('/total-user-rac/:id', {
            controller: 'TotalUserRacController',
            templateUrl: 'view-total-user-rac.html'
        })
        .when('/chartist/examples', {
            controller: 'ChartistExamplesController',
            templateUrl: 'view-chartist-examples.html'
        }).
        when('/404', {
            controller: 'ErrorController',
            templateUrl: 'view-error.html'
        }).
        otherwise({
            redirectTo: '/404'
        }); 
}]);


/**
 * Redirect to /404 when route change fails
 * @link http://stackoverflow.com/questions/12656226/angularjs-and-a-failed-templateurl/12669919#12669919
 */
App.run(['$rootScope', '$location', function ($rootScope, $location) {
    
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        
        $location.path('/404').replace();
    });
}]);


/**
 * The ProjectListController lists all the BOINC projects
 * Note: best practice is to use the inline array injection annotation for defining the module's dependencies.' (https://docs.angularjs.org/guide/di)
 */
App.controller('ProjectListController', ['$scope', 'Project', '$location', function ($scope, Project, $location) {
    
    var vm = this;
    vm.projects = Project.query();

    $scope.sort = function (field) {
        
        $scope.sort.field = field;
        $scope.sort.order = !$scope.sort.order;
    };
    
    $scope.sort.field = 'name';
    $scope.sort.order = true; // false orders descending, true orders ascending
    
    $scope.show= function (id) {
        
        $location.url('/project/' + id);
    };
}]);


/**
 * The ProjectController shows a single BOINC project
 */
App.controller('ProjectShowController', ['$scope', 'Project', '$routeParams', function ($scope, Project, $routeParams) {
    
    var vm = this;
    vm.project = Project.get({id: $routeParams.id});
}]);


/**
 * Total User RAC History
 */
App.controller('TotalUserRacController', ['$scope', 'TotalUserRac', function ($scope, TotalUserRac) {
    
    var vm = this;
    
    
    // line chart
    this.lineData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        series: [
            [0, 1, 2, 4, 7, 6, 9, 10, 8, 10, 14, 13, 16, 14, 17, 19, 20, 31, 32, 26, 36, 28, 31, 40, 26, 26, 43, 47, 55, 30],
            [0, 1, 2, 4, 4, 6, 6, 13, 9, 10, 16, 18, 21, 16, 16, 16, 31, 17, 27, 23, 31, 29, 35, 39, 30, 32, 26, 43, 51, 46],
            [0, 1, 3, 4, 6, 5, 11, 9, 11, 11, 13, 15, 14, 22, 20, 15, 31, 27, 25, 25, 36, 30, 37, 29, 29, 39, 40, 49, 34, 35],
            [0, 1, 3, 5, 7, 5, 9, 9, 10, 17, 13, 21, 14, 16, 23, 23, 25, 17, 24, 34, 27, 39, 33, 45, 47, 32, 40, 36, 49, 32],
            [0, 1, 3, 3, 7, 5, 8, 11, 12, 13, 16, 17, 20, 24, 27, 15, 22, 33, 35, 24, 32, 35, 41, 39, 24, 31, 51, 29, 45, 50]
        ]
    };

    this.lineOptions = {
        axisX: {
            labelInterpolationFnc: function(value) {
                return value;
            }
        }
    };
    
}]);


/**
 * Chartist Example Graphs
 * @link http://gionkunz.github.io/chartist-js/index.html
 */
App.controller('ChartistExamplesController', ['$scope', '$interval', function ($scope, $interval) {
    
    var vm = this;
    
    this.events = {
        draw: function() {
            console.log('called');
        }
    };

    // bar chart
    this.barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
            [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
        ]
    };

    this.barOptions = {
        seriesBarDistance: 15
    };

    this.barResponsiveOptions = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
            seriesBarDistance: 10,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value;
                }
            }
        }],
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function(value) {
                    return value[0];
                }
            }
        }]
    ];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // line chart
    this.lineData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        series: [
            [0, 1, 2, 4, 7, 6, 9, 10, 8, 10, 14, 13, 16, 14, 17, 19, 20, 31, 32, 26, 36, 28, 31, 40, 26, 26, 43, 47, 55, 30],
            [0, 1, 2, 4, 4, 6, 6, 13, 9, 10, 16, 18, 21, 16, 16, 16, 31, 17, 27, 23, 31, 29, 35, 39, 30, 32, 26, 43, 51, 46],
            [0, 1, 3, 4, 6, 5, 11, 9, 11, 11, 13, 15, 14, 22, 20, 15, 31, 27, 25, 25, 36, 30, 37, 29, 29, 39, 40, 49, 34, 35],
            [0, 1, 3, 5, 7, 5, 9, 9, 10, 17, 13, 21, 14, 16, 23, 23, 25, 17, 24, 34, 27, 39, 33, 45, 47, 32, 40, 36, 49, 32],
            [0, 1, 3, 3, 7, 5, 8, 11, 12, 13, 16, 17, 20, 24, 27, 15, 22, 33, 35, 24, 32, 35, 41, 39, 24, 31, 51, 29, 45, 50]
        ]
    };

    this.lineOptions = {
        axisX: {
            labelInterpolationFnc: function(value) {
                return value;
            }
        }
    };

    // pie chart
    this.pieData = {
        series: [20, 10, 30, 40]
    };

    // donut chart
    this.donutOptions = {
        donut: true
    };

    function pushLimit(arr, elem, limit) {
        arr.push(elem);
        if (arr.length > limit) {
            arr.splice(0, 1);
        }
    }

    // Use $interval to update bar chart data
    var barUpdatePromise = $interval(function() {
        var time = new Date();

        pushLimit(this.barData.labels, [
            time.getHours(),
            time.getMinutes(),
            time.getSeconds()
        ].join(':'), 12);

        this.barData.series.forEach(function(series) {
            pushLimit(series, getRandomInt(0, 10), 12);
        });
    }.bind(this), 1000);

    // Cancel interval once scope is destroyed
    $scope.$on('$destroy', function() {
        $interval.cancel(barUpdatePromise);
    });
    
    
}]);


/**
 * Error Controller
 *
 */
App.controller('ErrorController', ['$scope', function ($scope) {
    
}]);
