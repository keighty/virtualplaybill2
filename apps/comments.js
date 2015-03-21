var app = angular.module("playbillApp");

app.directive("comments", function() {
  return {
    restrict: "E",
    templateUrl: "/views/comments_form.html",
    controller: "CommentsController"
  };
});

app.controller('CommentsController', ['$rootScope', '$scope', '$http', '$routeParams',
  function($rootScope, $scope, $http, $routeParams){

    var commentsUrl = '/post_comments/' + $routeParams.postId;
    $http.get(commentsUrl).
      success(function(data) {
        $scope.comments = data;
      }).
      error(function(data, status, headers, config) {
        $scope.comments = {};
      });

    $scope.addComment = function(text) {
      var postId = $rootScope.show._id,
          postComment = {
            postId: postId,
            content: text,
            userId: $rootScope.user._id,
            username: $rootScope.user.username,
            submitted: new Date().getTime()
          };

      var commentUrl = '/post/' + postId + "/new_comment";
      $http.post(commentUrl, postComment)
        .success(function(err, res) {
          $scope.comments.push(postComment);
          $scope.comment = null;
        });
    };

  }

]);