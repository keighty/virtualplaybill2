var app = angular.module("playbillApp");

app.controller('AllPlaybillsController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $http.get('/playbills').success(function(data) {
      $scope.playbills = data;
    }).error(function(res) {
      console.log(res);
    });

  }
]);

app.controller('PostController', ['$rootScope', '$scope', '$routeParams', '$http', '$location',
  function($rootScope, $scope, $routeParams, $http, $location) {
    $scope.templates =
      [ { name: 'post_show.html', url: '/views/post_show.html' },
        { name: 'post_edit.html', url: '/views/post_form.html' } ];

    // retrieve the post
    $http.get('playbill/' + $routeParams.postId).
      success(function(data) {
        $rootScope.show = data[0];
        $scope.template = $scope.templates[0];
      }).
      error(function(data, status, headers, config) {
        $scope.show = { cast: [] };
      });

    // edit the post
    $scope.editShow = function() {
      $scope.editing = true;
      $scope.template = $scope.templates[1];
    };

    $scope.s3Upload = function(stuff){
      var status_elem = document.getElementById("status");
      var preview_elem = document.getElementById("preview");
      var s3upload = new S3Upload({
          s3_object_name: showImageIdentifier(),
          file_dom_selector: 'image',
          s3_sign_put_url: '/sign_s3',
          onProgress: function(percent, message) {
            status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
          },
          onFinishS3Put: function(public_url) {
            $scope.show.imageUrl = public_url;
            status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
            preview_elem.innerHTML = '<img class="playbill-image" src="'+ public_url +'" />';
          },
          onError: function(status) {
            status_elem.innerHTML = 'Upload error: ' + status;
          }
      });
    };

    function showImageIdentifier() {
      var showTitle = $scope.show.title;
      if(showTitle) {
        showTitle = showTitle.replace(/[^\w\s]|_/g, " ") .replace(/\s+/g, "_");
      }
      var dateId = Date.now().toString();
      return [dateId, showTitle].join('_');
    }

    $scope.addPlaybill = function(show) {
      $http.post('/new_post', show)
        .success(function(err, res) {
          $location.path('/');
          // TODO always redirect to index
          // TODO handle errors
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