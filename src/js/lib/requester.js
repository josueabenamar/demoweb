function getComponent(api, services, $http, alert)
{
	var component = {};


	var get_url = function(params)
	{
		var api_url = (!params.local) ? api : "resources";
		if(!params.role) params.role = "data";

		var service_path = "";
		if(services[params.role] && services[params.role][params.service])
			service_path = services[params.role][params.service];

		var url = api_url + service_path;

		if(params.subs)
		{
			var subs = params.subs;
			for(sub in subs)
			{
				var value = subs[sub];
				url = url.replace(sub, value);
			}
		}

		return url;
	}

	var request_get = function(params, callback, callback_error)
	{
		params.method = "get";

		request(params, callback, callback_error);
	}

	var request_post = function(params, callback, callback_error)
	{
		params.method = "post";

		request(params, callback, callback_error);
	}

	var request_file = function(params, callback, callback_error)
	{
		params.file = true;
		params.method = "post";

		request(params, callback, callback_error);
	}

	var request = function(params, callback, callback_error)
	{
		var url = get_url(params);

		var handler_success = function(response)
		{
			var data = response.data;
			callback(data);
		}

		var handler_error = function(error)
		{
			var data = error.data;
			var message = data ? (data.msg ? data.msg : "Servicio no encontrado") : "Servicio no disponible";

			if(callback_error) callback_error(message);
			else alert.error(message);
		}

		var headers = params.headers ? params.headers : {};
		var options =
		{
			headers: headers
		};

		if(params.file)
		{
			options.transformRequest = angular.identity;
			options.headers["Content-Type"] = undefined;
		}

		$http[params.method](url, params.data, options).then(handler_success, handler_error);
	}

	component.get = request_get;
	component.post = request_post;
	component.file = request_file;

	return component;
}

module.exports.get = getComponent;
