'use strict';

var expect              = require('chai').expect;
var InstallationChecker = require('../../../lib/models/installation-checker');
var path                = require('path');

describe.only('Installation Checker', function() {
  var installationChecker;

  function fixturePath(pathToFile) {
    return path.resolve(path.join(__dirname, '..', '..', 'fixtures'), pathToFile);
  }

  function checkInstallations() {
    installationChecker.checkInstallations();
  }

  describe('bower', function() {

    it('works when installation directory exist', function() {
      var project = {
        root: fixturePath('installation-checker/valid-bower-installation'),
        bowerDirectory: fixturePath('installation-checker/valid-bower-installation/bower_components')
      };
      installationChecker = new InstallationChecker({ project: project });

      expect(checkInstallations).to.not.throw(/No dependencies installed/);
    });

    it('fails when installation directory doesn\'t exist', function() {
      var project = {
        root: fixturePath('installation-checker/invalid-bower-installation'),
        bowerDirectory: fixturePath('installation-checker/invalid-bower-installation/bower_components')
      };
      installationChecker = new InstallationChecker({ project: project });

      expect(checkInstallations).to.throw('No dependencies installed. Run `bower install` to install missing dependencies.');
    });

  });

  describe('npm', function() {

    it('works when installation directory exist', function() {
      var project = {
        root: fixturePath('installation-checker/valid-npm-installation'),
        nodeModulesPath: fixturePath('installation-checker/valid-npm-installation/node_modules')
      };
      installationChecker = new InstallationChecker({ project: project });

      expect(checkInstallations).to.not.throw(/No dependencies installed/);
    });

    it('fails when installation directory doesn\'t exist', function() {
      var project = {
        root: fixturePath('installation-checker/invalid-npm-installation'),
        nodeModulesPath: fixturePath('installation-checker/invalid-npm-installation/node_modules')
      };
      installationChecker = new InstallationChecker({ project: project });

      expect(checkInstallations).to.throw('No dependencies installed. Run `npm install` to install missing dependencies.');
    });

  });

  describe('npm and bower', function() {

    it('fails reporting both dependencies', function() {
      var project = {
        root: fixturePath('installation-checker/invalid-bower-and-npm'),
        bowerDirectory: fixturePath('installation-checker/invalid-bower-and-npm/bower_components'),
        nodeModulesPath: fixturePath('installation-checker/invalid-bower-and-npm/node_modules')
      };
      installationChecker = new InstallationChecker({ project: project });

      expect(checkInstallations).to.throw('No dependencies installed. Run `npm install` and `bower install` to install missing dependencies.');
    });

    it('ignores directories without bower.js and package.json files', function() {
      var project = {
        root: fixturePath('installation-checker/empty'),
        bowerDirectory: fixturePath('installation-checker/empty/bower_components'),
        nodeModulesPath: fixturePath('installation-checker/empty/node_modules')
      };
      installationChecker = new InstallationChecker({ project: project });

      expect(checkInstallations).to.not.throw('/No dependencies installed/');
    });

  });
});