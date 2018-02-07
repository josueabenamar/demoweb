window.app = angular.module("app", ["ngRoute", "ngStorage", "satellizer"]);

var config = require('./config');
var content = require('./content');
var directives = require('./directives');
var controllers = require('./controllers');

app.config(function($routeProvider)
{
	var navigation = require('./lib/navigation').get(content);
	navigation.create($routeProvider);
});
