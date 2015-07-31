// state setup directive  : 'app-state-setup'

function appStateSetup($timeout){

    return {

      restrict: '',
      scope: {
        load: '=data'
      },
      link: function(scope, element, attributes){

        // dynamic layout
        var windowWidth = window.innerWidth;

        if (windowWidth < 1024){
          var currentHeight = window.innerHeight,
              headerHeight = document.getElementById('app_header').clientHeight,
              footerHeight = document.getElementById('app_footer').clientHeight;
          document.getElementById('app_body').style.height = (currentHeight - (headerHeight + footerHeight)) + 'px';
        } else {
          document.getElementById('app_body').style.height = '900px'; // magic number is placeholder
        }

        // initial current item & navigation clicks
        // better to do this as callback when data loaded, not magic number timeout
        $timeout(function(){
          var navItems = document.getElementsByClassName('nav-link'),
              contentItems = document.getElementsByClassName('content-list-item'),
              numNav = navItems.length;

          //set initial
          navItems[0].classList.add('current');
          contentItems[0].classList.add('current');


          // mobile menu click
          document.getElementById('mobile-menu').onclick = function(){
            this.classList.toggle('open');
            document.getElementById('topic-nav').classList.toggle('open');
          }


          // navigation clicks
          while(numNav--){
            navItems[numNav].onclick = function(){

              // size at time of click
              var thisWindow = window.innerWidth;

              if(this.classList.contains('current')){
                // do nothing
              } else {
                // hide current controls & content
                $('.current').removeClass('current');
                // highlight new control
                this.classList.add('current');
                // reveal new content
                var thisTarget = this.getAttribute('data-target');
                $('.' + thisTarget).addClass('current');
                // hide mobile controls
                if(thisWindow < 1024){
                  document.getElementById('mobile-menu').classList.toggle('open');
                  document.getElementById('topic-nav').classList.toggle('open');
                }

              }

            }
          }

          // comment clicks
          $('.comment-reply-button').on('click', function(){
            $(this).toggleClass('cancel').next('.comment-reply-block').toggleClass('open');
          });


        }, 100);


      } // end link block
    } // end return block
  } // end lvscSliderBlock definition

  angular.module('app')
    .directive('appStateSetup', appStateSetup );
