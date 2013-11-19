'use strict';

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        //Add package.json reference
        pkg: grunt.file.readJSON('package.json'),

        //Watch files
        watch: {
            sass: {
                files: ['app/sass/*.scss'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    'app/*.html',
                    'app/css/styles.css',
                    'app/js/*.js',
                    'app/img/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                options: {
                  livereload: true
                }
            }
        },
        
        //Connect server
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: 'app',
                    livereload: true,
                    // change this to '0.0.0.0' to access the server from outside
                    hostname: 'localhost'
                }
            }
        },

        //Open browser
        open: {
            server: {
                path: 'http://localhost:<%= connect.server.options.port %>'
            }
        },

        //Compass
        compass: {
            dev: { 
                options: {
                    config: 'config.rb'
                }
            }
        },

        //JS hint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: 'app/js/plugins.js'
            },
            js: {
                src: ['app/js/*.js']
            }
            
        },

        //Clean
        clean: ["build/css/app.css", "build/js/app.js"],

        //Concat
        concat: {
            js: {
                src: ['app/js/*.js'],
                dest: 'build/js/app.js'
            },
            css: {
                src: ['app/css/*.css'],
                dest: 'build/css/app.css'
            }
        },

        //Minify using yui
        min: {
            'dist': {
                'src': ['build/js/app.js'],
                'dest': 'build/js/app.min.js'
            }
        },
        cssmin: {
            'dist': {
                'src': ['build/css/app.css'],
                'dest': 'build/css/app.min.css'
            }
        },

        //Copy html files
        copy: {
            main: {
                expand: true,
                flatten: true,
                src: 'app/*.html',
                dest: 'build/',
            }
        },

        useref: {
            // specify which files contain the build blocks
            html: 'build/*.html',
            // explicitly specify the temp directory you are working in
            // this is the the base of your links ( "/" )
            temp: ''
        }
        
    });


    /*--
    Grunt tasks registration
    --*/

    //Server task
    grunt.registerTask('server', function (target) {
        grunt.task.run([
            'connect',
            'open',
            'watch'
        ]);
    });

    //JS lint task
    grunt.registerTask('jslint', function (target) {
        grunt.task.run(['jshint']);
    });

    //Build task
    grunt.registerTask('build', ['concat', 'min', 'cssmin', 'copy', 'clean', 'useref']);
};