function getComponent(content)
{
	var component = {};

	var site = content.site;
	var home = site.home ? site.home : "/";
	var login = site.login ? site.login : "/login";


	var resolver = {};

	resolver.default = function($q, $location, $auth)
	{
		console.log("default");

		var deferred = $q.defer();
		deferred.resolve();

		return deferred.promise;
	};

	resolver.login_required = function($q, $location, $auth)
	{
		console.log("login");
		var deferred = $q.defer();
		if($auth.isAuthenticated()) { deferred.resolve(); }
		else { $location.path(login); }

		return deferred.promise;
	};

	resolver.skip_if_logged = function($q, $location, $auth)
	{
		console.log("skip");
		var deferred = $q.defer();
		if($auth.isAuthenticated()) { $location.path(home); }
		else { deferred.resolve(); }

		return deferred.promise;
	};

	var createNavigation = function(router)
	{
		var navigation = site.navigation;

		for(n in navigation)
		{
			var nav = navigation[n];
			var view =
			{
				templateUrl: 'templates/' + nav.template,
				controller: nav.controller,
				resolve: { resolve: resolver[nav.resolve] }
			};

			router.when(nav.url, view);
		}

		router.otherwise({ redirectTo: home });
	}

	component.create = createNavigation;

	return component;
};

module.exports.get = getComponent;
