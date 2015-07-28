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
      appComments.getItems().then(function(data){
        // what we'll work with
        home.comments = data;
        // for cross-module potential
        store.home = home.comments;
      });

}]);

// comment_app home service

angular.module('appHome')
  .factory('appComments', [ '$http', '$q', function ($http, $q){
    return {
      getItems: function(){

        var deferred = $q.defer();
        $http.get('/api/thread.json')
          .success(function(data){
            var theseResults = data;
            console.log('RAW: ', theseResults);

            // virtual sort
            var raw = theseResults.topics,
                numTopics = raw.length;
            theseResults.model = {};

            // loop through topics
            for (tI = 0; tI < numTopics; tI++ ) {

              var thisTopic = raw[tI],
                  thisKey = 'topic_' + tI;

              // make new object
              theseResults.model[thisKey] = {};

              var thisObject = theseResults.model[thisKey],
                  numResponses = thisTopic.responses.length;

              // set title & initial content
              thisObject.id = thisTopic.responses[0].id;
              thisObject.displaytitle = thisTopic.topictitle;
              thisObject.displaycontent = thisTopic.responses[0].posttext;
              thisObject.byparent = {};

              // loop through/group responses
              for (rI = 0; rI < numResponses; rI++ ) {

                var thisResponse = thisTopic.responses[rI],
                    thisParentKey = thisResponse.parentid;

                if (thisParentKey !== 0){
                  if(thisObject.byparent[thisParentKey]){
                    // push to existing array
                    thisObject.byparent[thisParentKey].push(thisResponse);
                  } else {
                    // make new array
                    thisObject.byparent[thisParentKey] = [];
                    // add first element
                    thisObject.byparent[thisParentKey].push(thisResponse);
                  }
                }

              }

              theseResults.model[thisKey] = thisObject;
            }

            console.log('PROCESSED: ', theseResults);
            deferred.resolve(theseResults);
          });

        return deferred.promise;

      }
    }
  }]);


//# sourceMappingURL=home.js.map