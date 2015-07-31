function appNewComment($timeout, store){

    return {

      restrict: '',
      scope: {
        replyto: '=replyto',
        count: '=count',
        model: '=model'
      },
      link: function(scope, element, attributes){

        // on new comment submit
        element.on('click', function(){

          // assemble new comment object
          var newComment = {},
              inputEl = element.parent(),
              inputElement = inputEl.find('textarea');
          newComment.id = parseInt(scope.count, 10) + 1;
          newComment.parentid = scope.replyto.id;
          newComment.author = "Guest User";
          newComment.depth = parseInt(scope.replyto.depth, 10) + 1;
          newComment.topic = scope.replyto.topic;
          newComment.posttext= inputElement.val();
          newComment.theseComments = undefined;

          // recursive function to find parent in model
          function checkComment(newCom, checkCom){
            // check this comment
            if (newCom.parentid === checkCom.id){
              // add to existing comments
              if (checkCom.theseComments){
                checkCom.theseComments.push(newCom);
              } else {
                // create comments object and add
                checkCom['theseComments'] = [];
                checkCom.theseComments.push(newCom);
              }
            } else {
              // if not this comment && this comment has replies, check them recursively
              if (checkCom.theseComments){
                var numComReply = checkCom.theseComments.length;
                while(numComReply--){
                  var thisReply = checkCom.theseComments[numComReply];
                  checkComment(newCom, thisReply);
                }
              }
            }
          }

          // start by check main topic comments
          var thisTopic = scope.model[newComment.topic].id;
          if (thisTopic ===  newComment.parentid){
            if (thisTopic.theseComments){
              // push to topic existing comments array
              scope.model[newComment.topic].theseComments.push(newComment);
            } else {
              // make new array and push to that
              scope.model[newComment.topic]['theseComments']= [];
              scope.model[newComment.topic].theseComments.push(newComment);
            }
          } else {
            // check replies recursively
            var numTopicReply = scope.model[newComment.topic].theseComments.length;
            while (numTopicReply--){
              var thisComment = scope.model[newComment.topic].theseComments[numTopicReply];
              checkComment(newComment, thisComment);
            }
          }

          // update model : increment total
          scope.count = newComment.id;

          // push model updates to DOM
          scope.$apply();

          // update local storage
          store.home = scope.model;

          // close/clear ui
          inputElement.val('');
          // comment clicks
          $(inputEl).parent().find('.cancel').toggleClass('cancel').next('.comment-reply-block').toggleClass('open');

        });

      } // end link block
    } // end return block
  } // end lvscSliderBlock definition

  angular.module('app')
    .directive('appNewComment', appNewComment );
