(function () {

  'use strict';

  /**
   * Add $subscribe method to the $rootScope prototype.
   * Sets up a $rootScope.$on listener and handles
   * de-registration on the $scope.$destroy event automatically.
   */
  function config ($provide) {
    $provide.decorator('$rootScope', function ($delegate) {

      Object.defineProperty($delegate.constructor.prototype, '$subscribe', {
        value: function (name, callback) {
          var unsub = $delegate.$on(name, callback);
          this.$on('$destroy', unsub);
          return unsub;
        }
      });

      return $delegate;
    });
  }

  angular
    .module('angular-subscribe', [])
    .config(config);

}());
