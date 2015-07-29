var path = require('path');

exports.config = {
  // See docs at https://github.com/brunch/brunch/blob/master/docs/config.md
  modules: {
    definition: false,
    wrapper: false
  },

  paths: {
    'public': 'public',
    'watched': ['app']
  },

  files: {
    javascripts: {
      joinTo: {
        // application core
        'js/app.js': [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/lodash/dist/lodash.js',
          // sets jquery no-conflict & resize events
          'app/scripts/application/app-support/lvsc-jquery.js',
          // handle log events
          'app/scripts/application/app-support/general-weblogng.js',
          'app/scripts/application/app-support/angular-weblogng.js',
          // handle touch events
          'bower_components/fastclick/lib/fastclick.js',
          // angular & application dependencies
          'bower_components/angular/angular.js',
          'bower_components/a0-angular-storage/dist/angular-storage.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/oclazyload/dist/ocLazyLoad.min.js',
          // react & riot plugins
          'bower_components/react/react.js',
          'bower_components/ngReact/ngReact.js',
          'bower_components/riot/riot.js',
          'bower_components/angular-riot/angular-riot.js',
          // greensock
          'bower_components/gsap/src/uncompressed/TweenMax.js',
          'bower_components/gsap/src/uncompressed/jquery.gsap.js',
          'bower_components/gsap/src/uncompressed/plugins/ScrollToPlugin.js',
          // picturefill plugins for responsive images
          'bower_components/picturefill/external/matchmedia.js',
          'bower_components/picturefill/picturefill.js',
          'bower_components/angular-picturefill/angular-picturefill.js',
          //youtube plugin
          'bower_components/angular-youtube-mb/src/angular-youtube-embed.js',
          // application core
          'app/scripts/application/application.js'
        ],

        // home module
        'js/home.js': [
          'app/scripts/home/home.controller.js',
          'app/scripts/home/home.service.js'
        ]

      },
      order: {
        before: [
          // jquery
          'bower_components/jquery/jquery.js',

          // angular
          'bower_components/angular/angular.js'

        ]
      }
    },
    stylesheets: {
      joinTo: {
        'css/app.css': [
          'app/styles/app.scss'
        ]
      }
    }
  },
  plugins: {
    off: ['gzip'],
    ng_annotate: {
      pattern: /^app/
    },
    autoprefixer: {
      browsers: [
        'last 2 version',
        '> 1%', // browsers with > 1% usage
        'ie >= 9'
      ],
      cascade: false
    },
    uglify: {
      output: {
        semicolons: false
      }
    },
    sass: {
      options: {
        mode: 'native'
      }
      //allowCache: true
    }
  },

  server: {
    port: process.env.PORT || 3333
  },

  conventions: {
    assets: /app(\\|\/)assets(\\|\/)/
  },

  sourceMaps: true
};
