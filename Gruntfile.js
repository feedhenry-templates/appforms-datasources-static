'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['gruntfile.js', 'application.js', 'lib/**/*.js', 'test/**/*.js'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['public/views/**', 'app/views/**'],
        options: {
          livereload: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'application.js',
        options: {
          args: [],
          ignore: ['public/**'],
          ext: 'js,html',
          nodeArgs: [],
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      serve: ['nodemon', 'watch'],
      debug: ['node-inspector', 'shell:debug', 'open:debug'],
      options: {
        logConcurrentOutput: true
      }
    },
    env : {
      options : {},
      // environment variables - see https://github.com/jsoverson/grunt-env for more information
      local: {
        FH_USE_LOCAL_DB: true
      }
    },
    'node-inspector': {
      dev: {}
    },
    shell: {
      debug: {
        options: {
          stdout: true
        },
        command: 'env NODE_PATH=. node --debug-brk application.js'
      },
      unit: {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'env NODE_PATH=. ./node_modules/.bin/mocha -A -u exports --recursive test/unit/'
      },
      coverage_unit: {
        options: {
          stdout: true,
          stderr: true
        },
        command: [
          'rm -rf coverage cov-unit',
          'env NODE_PATH=. ./node_modules/.bin/istanbul cover --dir cov-unit ./node_modules/.bin/_mocha -- -u exports -R spec ./test/unit/*.js'
        ].join('&&')
      }
    },
    open: {
      debug: {
        path: 'http://127.0.0.1:8080/debug?port=5858',
        app: 'Google Chrome'
      },
      platoReport: {
        path: './plato/index.html',
        app: 'Google Chrome'
      }
    },
    plato: {
      src: {
        options : {
          jshint : grunt.file.readJSON('.jshintrc')
        },
        files: {
          'plato': ['lib/**/*.js']
        }
      }
    },
    jshint: {
      files: ['*.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true
      }
    },
  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // Testing tasks
  grunt.registerTask('test', ['jshint', 'shell:unit']);

  // Coverate tasks
  grunt.registerTask('coverage', ['shell:coverage_unit']);

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  grunt.registerTask('analysis', ['plato:src', 'open:platoReport']);

  grunt.registerTask('serve', ['env:local', 'concurrent:serve']);
  grunt.registerTask('debug', ['env:local', 'concurrent:debug']);
  grunt.registerTask('default', ['serve']);
};
