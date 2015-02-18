var playbills = angular.module("playbillApp", ['ngRoute', 'ui.bootstrap']);

playbills.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $routeProvider.
      when('/post/:postId', {
        templateUrl: '/views/post.html',
        controller: 'PostController'
      }).
      when('/add_post', {
        templateUrl: '/views/post_form.html',
        controller: 'PostController'
      }).
      when('/signin', {
        templateUrl: '/views/signin.html',
        controller: 'UserController'
      }).
      when('/signup', {
        templateUrl: '/views/signup.html',
        controller: 'UserController'
      }).
      when('/logout', {
        templateUrl: '/views/signin.html',
        controller: function() {
          window.location.reload();
        }
      }).
      when('/', {
        templateUrl: 'views/index.html',
        controller: 'PlaybillController'
      });
  }
]);

playbills.controller('PlaybillController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $http.get('/playbills').success(function(data) {
      $scope.playbills = data;
      $scope.playbillRows = partition(data, 3);
    }).error(function(res) {
      console.log(res);
    });

    function partition(input, size) {
      var rows = [];
      for (var i=0; i < input.length; i+=size) {
        rows.push(input.slice(i, i+size));
      }
      return rows;
    }
  }
]);

playbills.controller('UserController', ['$scope', '$http',
  function($scope, $http) {
    $http.get('/user/profile').success(function(data) {
      $scope.user = data;
      $scope.error = "";
    }).error(function(data) {
      $scope.user = {};
      $scope.error = data;
    });
  }
]);

playbills.controller('PostController', ['$scope', '$routeParams', '$http', '$location',
  function($scope, $routeParams, $http, $location) {
    $scope.templates =
      [ { name: 'post_show.html', url: '/views/post_show.html' },
        { name: 'post_edit.html', url: '/views/post_form.html' } ];

    // retrieve the post
    $http.get('playbill/' + $routeParams.postId).success(function(data) {
      $scope.show = data[0];
      $scope.template = $scope.templates[0];
    });

    // edit the post
    $scope.editShow = function() {
      $scope.editing = true;
      $scope.template = $scope.templates[1];
    };

    $scope.addPlaybill = function(show) {
      $http.post('/new_post', show)
        .success(function(err, res) {
          $location.path('/');
          // TODO always redirect to index
          // TODO handle errors
        });
    };

    $scope.s3_upload = function(stuff){
      var status_elem = document.getElementById("status");
      var url_elem = document.getElementById("image_url");
      var preview_elem = document.getElementById("preview");
      var s3upload = new S3Upload({
          file_dom_selector: 'image',
          s3_sign_put_url: '/sign_s3',
          onProgress: function(percent, message) {
              status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
          },
          onFinishS3Put: function(public_url) {
              status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
              url_elem.value = public_url;
              preview_elem.innerHTML = '<img src="'+ public_url +'" style="width:300px;" />';
          },
          onError: function(status) {
              status_elem.innerHTML = 'Upload error: ' + status;
          }
      });
    };

    $scope.editPlaybill = function(show) {
      var editUrl = '/edit_post';
      $http.post(editUrl, show)
        .success(function(err, res) {
          $scope.editing = false;
          $scope.template = { name: 'post_show.html', url: '/views/post_show.html' };
        });
    };

    // delete the post
    $scope.deleteShow = function(show) {
      var deleteUrl = '/delete_post';
      $http.post(deleteUrl, show)
        .success(function(err, res) {
          $scope.editing = false;
          $location.path('/');
        });
    };
  }
]);
