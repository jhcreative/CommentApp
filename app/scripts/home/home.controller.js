// comment_app home controller 'appHome'

angular.module('appHome', [{
  files: [
    // '/css/home.css',
  ]
}])
  .controller('HomeController',
    ['appComments', 'store', function(appComments, store) {

      // controller as
      var home = this;
      // init model
      appComments.getItems().then(function(data) {
        // what we'll work with
        home.comments = data;
        // for cross-module potential
        store.home = home.comments;
      });

}]);
