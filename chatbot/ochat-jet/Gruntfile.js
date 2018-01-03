/**
  Copyright (c) 2015, 2016, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

module.exports = function (grunt) {

    // Import dependencies
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['./dist']
        },
        copy: { // copy static files ot output directory
            src:{
                expand: true,
                src: [
                    '**/*.*'
                ],
                cwd: './src',
                dest: './dist',
                filter: 'isFile'
            },
            lib:{
                expand: true,
                src: ['**/*.*'],
                cwd: './bower_components',
                dest: './dist/js/libs',
                filter: 'isFile'
            }
        },
        connect: {
            server: {  // <--- Run a local server on :8089
                options: {
                    keepalive: true,
                    open: true,
                    port: 8090,
                    base: './dist'
                }
            }
        }
    });

    // Register the default tasks to run when you run grunt
    grunt.registerTask('default', ['clean:dist', 'copy', 'connect']);
};
