function getComponent(content, $auth, $storage, $location, requester)
{
	var component = {};

	var site = content.site;
	var home = site.home ? site.home : "#";
	var account = site.account ? site.account : "/account";


	var login = function(role, service, data)
	{
		var ws_params =
		{
			role: role,
			service: service,
			data: data
		};

		requester.post(ws_params, function(response)
		{
			$auth.setToken(response.token);

			$storage.id = response._id;
			$storage.role = role;
			$storage.user = response;
			$storage.active = response.activo ? response.activo : false;

			$location.path(account);
		});
	}

	var logout = function()
	{
		$auth.logout();

		$storage.role = null;
		$storage.user = null;
		$storage.active = null;

		$location.path(home);
	}

	var session = $auth.isAuthenticated;

	var id = function()
	{
		return $storage.id;
	}

	var role = function()
	{
		return $storage.role;
	}

	var user = function()
	{
		return $storage.user;
	}

	var active = function(active)
	{
		if(typeof active == "undefined") return $storage.active;
		else $storage.active = active;
	}

	var check = function(role)
	{
		if(content.roles.indexOf(role) < 0)
		{
			$location.path(home);
			return;
		}

		if($storage.role)
		{
			if($storage.role != role) $location.path(account);
		}
	}

	component.login = login;
	component.logout = logout;
	component.session = session;
	component.id = id;
	component.role = role;
	component.user = user;
	component.active = active;
	component.check = check;

	return component;
}

module.exports.get = getComponent;
