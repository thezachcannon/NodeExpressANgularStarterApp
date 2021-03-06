angular.module('app.services', [])
  .factory('services', ['$http', function ($http) {
    return {
      getGitHubInfo: function () {
        return $http.get('http://thezachcannon.herokuapp.com/api/getgithubinfo')
      },
      getRepos: function () {
        return $http.get('http://thezachcannon.herokuapp.com/api/getrepos')
      },
      getBlogs: function (){
        return $http.get('http://thezachcannon.herokuapp.com/api/blogs')
      },
      login: function (body) {
        return $http.post('http://thezachcannon.herokuapp.com/api/authenticate', body)
      },
      getUsers: function () {
        return $http.get('http://thezachcannon.herokuapp.com/api/users');
      },
      deleteUser: function (user) {
        return $http.delete('http://thezachcannon.herokuapp.com/api/user/' + user._id)
      },
      addUser: function (user) {
        return $http.post('http://thezachcannon.herokuapp.com/api/user/', {
          username: user.username,
          password: user.password
        });
      },
      updateUser: function (user) {
        return $http.put('http://thezachcannon.herokuapp.com/api/user', user);
      },
      getAbout: function () {
        return $http.get('https://api.github.com/repos/thezachcannon/thezachcannon/contents/about.html', {
          "headers": {
            "accept": "application/vnd.github.VERSION.raw"
          }
        })
      }
    }
  }])
  .factory('AuthInterceptor', function ($window, $q, UserService) {
    return {
      request: function (config) {
        console.log('Interception')
        console.log(UserService.auth_token);
        config.params = config.param || {};
        if (UserService.auth_token) {
          config.params.token = UserService.auth_token;
        }
        console.log(config);
        return config || $q.when(config);
      }
    }
  })