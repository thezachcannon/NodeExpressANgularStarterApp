angular.module('app.blogHomeCtrl', [])
  .controller('blogHomeCtrl', ['$scope', 'services', function ($scope, services) {
    services.getBlogs().then(function(data){
      $scope.blogs = data;
    },function (){

    })
  }])