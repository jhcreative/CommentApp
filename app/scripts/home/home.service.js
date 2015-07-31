// comment_app home service

angular.module('appHome')
  .factory('appComments', ['$http', '$q', function($http, $q) {
    return {
      getItems: function() {

        var deferred = $q.defer();
        $http.get('/api/thread.json')
          .success(function(data) {
            var theseResults = data,
                lastId = 0;

            // convert topic array into keyed object
            var raw = theseResults.topics,
                numTopics = raw.length;
            theseResults.model = {};

            for (tI = 0; tI < numTopics; tI++) {
              var thisTopic = raw[tI],
                  thisKey = 'topic_' + tI;
              theseResults.model[thisKey] = {};

              var thisObject = theseResults.model[thisKey],
                  numResponses = thisTopic.responses.length;



              // set topic title & initial content
              thisObject.id = thisTopic.responses[0].id;
              thisObject.displaytitle = thisTopic.topictitle;
              thisObject.displaycontent = thisTopic.responses[0].posttext.substring(3, (thisTopic.responses[0].posttext.length - 4));
              thisObject.byparent = {};

               // increment lastId
              if (lastId < thisObject.id) {
                lastId = thisObject.id;
                console.log('topic', lastId);
              }

              // organize this topic's comments by parent
              for (rI = 0; rI < numResponses; rI++) {

                var thisResponse = thisTopic.responses[rI],
                    thisParentKey = thisResponse.parentid,
                    thisContentSplit = thisResponse.posttext.split('p>'),
                    thisSecondSplit = thisContentSplit[1].split('</');
                thisResponse.posttext = thisSecondSplit[0];

                if (thisParentKey !== 0) {
                  if (thisObject.byparent[thisParentKey]) {
                    // push to existing array
                    thisObject.byparent[thisParentKey].push(thisResponse);
                  } else {
                    // make new array
                    thisObject.byparent[thisParentKey] = [];
                    // add first element
                    thisObject.byparent[thisParentKey].push(thisResponse);
                  }
                  // increment lastId
                  if (lastId < thisResponse.id) {
                    lastId = thisObject.id;
                    console.log( 'topic response', lastId);
                  }
                }

              }

              // recursive function to nest comments
              function matchComments(byParent, parentId) {
                var theseComments = byParent[parentId];
                if (theseComments !== undefined) {
                  // check for sub comments - recursive
                  var num = theseComments.length;

                  for (i = 0; i < num; i++) {
                    thisComment = theseComments[i];
                    if (byParent[thisComment.id]) {
                      thisComment.theseComments = matchComments(byParent, thisComment.id);
                    }
                    // increment lastId
                    if (lastId < thisResponse.id) {
                      lastId = thisResponse.id;
                      console.log('recursive', lastId);
                    }
                  }
                }
                return theseComments;
              }

              // recursive function to nest comments
              thisObject.theseComments = matchComments(thisObject.byparent, thisObject.id);

              // add processed topic to model
              theseResults.model[thisKey] = thisObject;
              theseResults['count'] = lastId;

            }// end for loop


            deferred.resolve(theseResults);
          });

        return deferred.promise;

      }
    };
  }]);
