function appNewComment($timeout){

    return {

      restrict: '',
      scope: {
        replyto: '=replyto',
        count: '=count'
      },
      link: function(scope, element, attributes){

        element.on('click', function(){
          console.log('=============================');
          // assemble new object
          var newComment = {};

          newComment.id = parseInt(scope.count, 10) + 1;
          newComment.parentid = scope.replyto.id;
          newComment.author = "Guest User";
          newComment.depth = parseInt(scope.replyto.depth, 10) + 1;
          newComment.posttext = '';
          newComment.theseComments = undefined;

          var inputEl = element.parent(); //.find('textarea').value();
          var inputElement = inputEl.find('textarea');

          newComment.posttext= inputElement.val();

          // update model
          scope.count = newComment.id;
            console.log(newComment);



          console.log('=============================');
          scope.$apply();

        });

      } // end link block
    } // end return block
  } // end lvscSliderBlock definition

  angular.module('app')
    .directive('appNewComment', appNewComment );
