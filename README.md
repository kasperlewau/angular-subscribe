## angular-subscribe [![travisci](https://travis-ci.org/kasperlewau/angular-subscribe.svg?branch=master)](https://travis-ci.org/kasperlewau/angular-subscribe)
> Adds a `$subscribe` method to the `$scope` prototype. $on listeners with automagic de-registration.

### installation
```js
  /** with bower **/
  bower install angular-subscribe --save
  <script src="path/to/angular-subscribe/dist/angular-subscribe.js"></script>

  /** with jspm **/
  jspm install angular-subscribe --save
  import 'angular-subscribe';
```
### usage
```js
  angular.module('your_module_name', [ 'angular-subscribe' ]);
```
```js
  $scope.$subscribe('event', callbackFn);
  /** becomes **/
  var unsub = $rootScope.$on('event', callbackFn);
  $scope.$on('$destroy', unsub);
```

### testing
`npm install; npm test`

### License
MIT © [Kasper Lewau](github.com/kasperlewau)
