var config = require('./package.json');

module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      meteor: ['.build.*', 'versions.json', 'package.js', 'bundle.js']
    },
    exec: {
      'meteor-init': {
        command: [
          // Make sure Meteor is installed, per https://meteor.com/install.
          // The curl'ed script is safe; takes 2 minutes to read source & check.
          'type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }',
          // Meteor expects package.js to be in the root directory of
          // the checkout, so copy it there temporarily and
          // replace version variable from package.json
          'sed \'s/PACKAGE_VERSION/'+ config.version +'/g\' meteor/package.js > package.js'
        ].join(';')
      },
      // !- only add this if there was no "clean" task
      'meteor-cleanup': {
        // remove build files and package.js
        command: 'rm -rf .build.* versions.json package.js bundle.js'
      },
      'meteor-test': {
        command: 'node_modules/spacejam/bin/spacejam --mongo-url mongodb:// test-packages ./'
      },
      'meteor-publish': {
        command: 'meteor publish --create'
      }
    },
    browserify: {
      all:{
        src: 'money.js',
        dest: 'bundle.js',
        options:{
          browserifyOptions:{
            standalone:'Money'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('meteor-init', ['browserify:all', 'exec:meteor-init']);

  grunt.registerTask('meteor-test', ['meteor-init', 'exec:meteor-test', 'exec:meteor-cleanup']);
  grunt.registerTask('meteor-publish', ['meteor-init', 'exec:meteor-publish', 'exec:meteor-cleanup']);
  grunt.registerTask('meteor', ['meteor-init', 'exec:meteor-test', 'exec:meteor-publish', 'exec:meteor-cleanup']);

};
