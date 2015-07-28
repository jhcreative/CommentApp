# Single Page Application example
## John Hiemstra, "Mastering SASS"


### Callouts ###
* Uses [AngularJS](http://angularjs.org) for client-side application and [Brunch](http://brunch.io) as a Node build tool inplace of Grunt/Gulp
* Brunch.io codebase derived from [skeleton](https://github.com/ocombe/angular-brunch-seed-no-fuss) by [Olivier Combe](https://github.com/ocombe)
* Fully responsive web application includes responsive image handling using [Picturefill](http://scottjehl.github.io/picturefill/) + Tina's [angular-picturefill](https://github.com/tinacious/angular-picturefill) directive-as-adapter
* Images/icons are stored in this codebase at app/assets/images
* Brunch compiles production ready flat HTML & optimized CSS/JS with 'brunch build --production' command
* Production-ready file concatenation/optimization strategy for app is built into project - view/edit in config.js
* Full jQuery object is available with $jQ prefix, but use native wherever possible for faster performance
* Uses .editorconfig file to enforce minimum styles across all IDE's


### Install for Mac: ###
* no frills Node.js source code: http://nodejs.org/download/ install however you like
* requires npm & bower installed globally
* download/clone this repo
* run 'npm install' to install Brunch, package.json & bower.json (look here for install error resolution).
* run 'npm start' as equivalent to 'middleman' or 'middleman server'command
* navigate to http://localhost:3333 - this is default port setting, can change in config
* see socialcast-api codebase for MongoDB install and Strongloop CLI instructions



### Workflow: ###
* All work is done in 'app' directory, which compiles automatically to 'public' directory
* Compile settings are in config.js
* Watch the Node server in the window where you ran 'npm start' for compile error, syntax errors, etc.
* SASS files are split by feature and concat into CSS files also split by feature for lazy loading - setting also in config.js
* Lazy load settings begin in application.js where ui.router is set, all data & services resolve in this file via $state.
* Uses Greensock Animation Platform - GSAP.js - for animations/transitions
* Uses fastclick.js for improved touch events


### Links: ###
* [Brunch](http://brunch.io/) ([FAQ](https://github.com/brunch/brunch/blob/master/docs/faq.md))
* [Greensock](https://github.com/greensock/GreenSock-JS/)
* [Fastclick](https://github.com/ftlabs/fastclick/)
* [Strongloop](http://strongloop.com)

## Sources
* [Olivier Combe](https://github.com/ocombe)
* [Todd Motto](http://toddmotto.com)
* [John Papa](http://johnpapa.net)
* [Jurgen Van de Moere](http://www.jvandemo.com/)
