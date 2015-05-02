(function () {

  'use strict';

  describe('subscribe', function () {
    var $scope, $root, cb;

    beforeEach(function () {
      module('angular-subscribe');

      inject(function ($rootScope) {
        $root  = $rootScope;
        $scope = $root.$new();
      });

      cb = sinon.stub();
    });

    context('$subscibe', function () {
      var spy;

      beforeEach(function () {
        spy = sinon.spy($root, '$on');
      });

      it('is defined on the $scope proto', function () {
        expect($scope.constructor.prototype).to.have.property('$subscribe')
          .that.is.a('function');
      });

      it('calls $on twice', function () {
        $scope.$subscribe('event', angular.noop);
        expect(spy).to.have.been.calledTwice;
      });

      it('sets up a listener for the passed event on $rootScope', function () {
        $scope.$subscribe('xyz', angular.noop);
        expect($root.$$listeners).to.include.keys('xyz');
      });

      it('sets up a listener for the $destroy event on $scope', function () {
        $scope.$subscribe('event', angular.noop);
        expect($scope.$$listeners).to.include.keys('$destroy');
      });

      it('deregisters on $destroy', function () {
        $scope.$subscribe('xyz', angular.noop);
        $scope.$destroy();
        expect($root.$$listeners.xyz[0]).to.be.null;
      });

      it('returns a regular unsubscribe function', function () {
        var fn = $scope.$subscribe('xyz', angular.noop);
        fn();
        expect($root.$$listeners.xyz[0]).to.be.null;
      });

      it('runs the callback on $root.$broadcast', function () {
        var cb = sinon.stub();
        $scope.$subscribe('xyz', cb);
        $root.$broadcast('xyz');
        expect(cb).to.have.been.calledOnce;
      });

      it('runs the callback on $root.$emit', function () {
        var cb = sinon.stub();
        $scope.$subscribe('xyz', cb);
        $root.$emit('xyz');
        expect(cb).to.have.been.calledOnce;
      });

      it('does not run the callback on $scope.$broadcast', function () {
        var cb = sinon.stub();
        $scope.$subscribe('xyz', cb);
        $scope.$broadcast('xyz');
        expect(cb).to.not.have.been.called;
      });

      it('runs the callback on $scope.$emit', function () {
        var cb = sinon.stub();
        $scope.$subscribe('xyz', cb);
        $scope.$emit('xyz');
        expect(cb).to.have.been.calledOnce;
      });
    });
  });

}());
