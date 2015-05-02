![travisci](https://travis-ci.org/kasperlewau/angular-subscribe.svg?branch=master)
## angular-subscribe
Adds a `$subscribe` method to the `$scope` prototype.
Works just like `$on`, but handles `$destroy` cleanup automatically.

#### Installation::Bower
```js
  bower install angular-subscribe --save

  <script src="path/to/angular-subscribe/dist/angular-subscribe.js">
```

#### Installation::JSPM
```js
  jspm install angular-subscribe --save

  import 'angular-subscribe';
```

```js
angular.module('your_module_name', [ 'angular-subscribe' ]);
```

### Example usage
```js
  $scope.$subscribe('event', callbackFn);
```

**becomes:**

```js
  var unsub = $rootScope.$on('event', callbackFn);
  $scope.$on('$destroy', unsub);
```

### Running tests
`npm install; npm test`

### License
MIT
