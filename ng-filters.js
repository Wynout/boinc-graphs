/*
|------------------------------------------------------------------------------
| Filters                                                            filters.js
|------------------------------------------------------------------------------
*/

/**
 * Convert "camelCase" to "Camel Case"
 */
App.filter('labelCase', [function () {
    
    return function (input) {
        
        input = input.replace(/([A-Z])/g, ' $1');
        return input[0].toUpperCase() + input.slice(1);
    };
}]);
