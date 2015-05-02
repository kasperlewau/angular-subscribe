(function() {
    "use strict";
    function config($provide) {
        $provide.decorator("$rootScope", function($delegate) {
            Object.defineProperty($delegate.constructor.prototype, "$subscribe", {
                value: function(name, callback) {
                    var unsub = $delegate.$on(name, callback);
                    this.$on("$destroy", unsub);
                    return unsub;
                }
            });
            return $delegate;
        });
    }
    angular.module("angular-subscribe", []).config(config);
})();