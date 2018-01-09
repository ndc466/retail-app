/**
 * Created by YPANSHIN on 2017-02-08.
 */
module.exports = function (grunt) {
    var date = new Date();
    var year = date.getFullYear();
    var pkg = grunt.file.readJSON('package.json');
    var baseVersion = pkg.version;

    // Import dependencies
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ['./build'],
            lib: ['./dist/lib'],
            blank: ['./dist/Blank'],
            workBetter: ['./dist/JETWorkBetter'],
            templates: ['./templates'],
            sourceMap: ['./dist/lib/ochat-widget.js.map']
        },
        copy: { // copy static files ot output directory
            idx:{
                expand: true,
                src: [
                    './test/examples/index.html'
                ],
                dest: './dist/',
                flatten: true,
                filter: 'isFile'
            },
            blank:{
                expand: true,
                src: [
                    './test/examples/Blank/*.*',
                    './dist/lib/ochat-widget.js'
                ],
                dest: './dist/Blank',
                flatten: true,
                filter: 'isFile'
            },
            workBetter:{
                expand: true,
                cwd: './test/examples/JETWorkBetter',
                src: [
                    '**/*.*'
                ],
                dest: './dist/JETWorkBetter',
                filter: 'isFile'
            }
        },
        serve: {
            path: './dist',
            options: {
                port: 8089
            }
        },
        ts: {
            lib: { // <-- compile all the files in ../ to PROJECT.js
                src: ['./templates/**/*.ts', './src/**/*.ts'],
                outDir: './build/es6/',
                options: {
                    rootDir: './',
                    target: 'es6',
                    sourceMaps: false,
                    declaration: true,
                    removeComments: false
                }
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            dist: {
                files: [{ expand: true,
                    cwd: './build/es6',
                    src: '**/*.js',
                    dest: './build/es5' }]
            }
        },
        browserify: {
            'ochat-widget': {
                files: {'./dist/lib/ochat-widget.js': ['./build/es5/src/main.js']},
                options: {
                    exclude: []
                }
            }
        },
        watch: {
            lib: { // <-- Watch for changes on the library and rebuild both
                files: ['./src/**/**.*'],
                tasks: ['clean:lib','clean:templates', 'string-replace', 'ts:lib', 'clean:sourceMap']
            }
        },
        open: { // <--- Launch index.html in browser when you run grunt
            blank: {
                path: 'http://localhost:8089/Blank/index.html'
            },
            workBetter: {
                path: 'http://localhost:8089/JETWorkBetter/index.html'
            }
        },
        'string-replace': { // convert html templates to typescript modules
            htm2js:{
                files: [{
                    expand: true,
                    src: './src/**/*.html',
                    ext: '.thml.ts',
                    dest: './templates',
                    extDot: 'last',
                    // rename: function (dest, src) {          // The `dest` and `src` values can be passed into the function
                    //     return src; // The `src` is being renamed; the `dest` remains the same
                    // }
                }],
                options: {
                    replacements: [{
                        pattern: /'/g,
                        replacement: '"'
                    }, {
                        pattern: /\r\n?|\n/ig,
                        replacement: '\'+\r\n\''
                    }, {
                        pattern: /<!-- \/(.*?) -->/ig,
                        replacement: '\';'
                    }, {
                        pattern: /<!-- (.*?) -->/ig,
                        replacement: function(match, p1){
                            return 'export const ' + p1 + ' = \'';
                        }
                    }]
                }
            },
            settings:{
                files: [{
                    expand: true,
                    src: './src/Settings.ts',
                    dest: './templates'
                }],
                options: {
                    replacements: [{
                        pattern: '{version}',
                        replacement: '<%= pkg.version %>'
                    }, {
                        pattern: '{name}',
                        replacement: '<%= pkg.name %>'
                    }]
                }
            }
        },
        uglify: {
            'ochat-widget': {
                options: {
                    stripBanners: true,
                    banner: '/**\n' +
                    '* Copyright (c) ' + year + ', Oracle and/or its affiliates. All rights reserved.\n ' +
                    '* Oracle OChat widget - Oracle bot chat client example, Release: ' + baseVersion + '\n' +
                    '*/\n\n\n'
                },
                files: {
                    './dist/lib/ochat-widget.min.js': './dist/lib/ochat-widget.js'
                }
            }
        }
    });

    // Register the default tasks to run when you run grunt
    grunt.registerTask('default', ['clean:build', 'clean:lib','clean:blank','clean:templates', 'string-replace', 'ts', 'babel', 'browserify', 'uglify','clean:sourceMap', 'copy:blank', 'serve']);
    //grunt.registerTask('serve', ['clean:lib','clean:blank','clean:templates', 'string-replace', 'ts','clean:sourceMap', 'copy:blank', 'serve' ]);
    grunt.registerTask('work-better', ['clean:lib','clean:workBetter','clean:templates', 'string-replace', 'ts','clean:sourceMap', 'copy:workBetter', 'connect', 'open:workBetter', 'watch']);
    grunt.registerTask('build', ['clean:lib','clean:blank','clean:workBetter','clean:templates', 'string-replace', 'ts','clean:sourceMap', 'copy:blank', 'copy:idx']);
};