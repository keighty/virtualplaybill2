var app = angular.module("playbillApp");

app.directive("imageupload", function() {
  return {
    restrict: "E",
    templateUrl: "/views/image_upload_form.html",
    link: function($scope, element, attrs) {
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
              status_elem.innerHTML = 'Upload completed.';
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
    }
  };
});