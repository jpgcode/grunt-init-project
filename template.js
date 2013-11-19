/*
 * grunt-init-project
 * https://jpgcode.com
 *
 * Copyright (c) 2013 Jose Pablo Granados
 * Licensed under the MIT license.
 */

'use strict';

exports.description = 'Create a nice html/css/sass/js project.';

exports.notes = 'Ohhh yeah! Cool!';

exports.after = 'Now you need to install project and dev dependencies by running:' +
  '\n\n' +
  'npm install';

exports.warnOn = '*';

exports.template = function(grunt, init, done){

  init.process({ type: 'html'}, [
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('author_name'),
    init.prompt('version', '0.0.0'),
  ], function(err, props){
    props.keywords = [];
    props.devDependencies = {
      "grunt": "~0.4.1",
      "matchdep": "~0.3.0",
      "grunt-open": "~0.2.2",
      "grunt-contrib-connect": "~0.5.0",
      "grunt-contrib-watch": "~0.5.3",
      "grunt-contrib-compass": "~0.6.0",
      "grunt-contrib-jshint": "~0.7.1",
      "grunt-contrib-concat": "~0.3.0",
      "grunt-yui-compressor": "~0.3.0",
      "grunt-contrib-copy": "~0.4.1",
      "grunt-contrib-clean": "~0.5.0",
      "grunt-useref": "0.0.16"
    };

    var files = init.filesToCopy(props);

    init.copyAndProcess(files, props);

    init.writePackageJSON('package.json', props);

    done();
  });
};