/*
|------------------------------------------------------------------------------
| Resources                                                        resources.js
|------------------------------------------------------------------------------
*/

/**
 * Project
 */
App.factory('Project', ['$resource', function ($resource) {
    
    return $resource('http://bps-api.wynout.nl/projects/:id', {id: '@id'}, {'update': {method: 'PUT'}});
}]);


/**
 * TotalUserRac
 */
App.factory('TotalUserRac', ['$resource', function ($resource) {
    
    return $resource('http://bps-api.wynout.nl/project/total/user/rac/histories/:id', {id: '@id'}, {
            query: {isArray: false},
            'update': {method: 'PUT'}
        });
}]);


/*
App.factory('ProjectGraph', function ($resource) {
    
    return $resource('http://bps-api.wynout.nl/project/total/user/rac/histories/:id', {id: '@id'}, {'update': {method: 'PUT'}});
});
*/