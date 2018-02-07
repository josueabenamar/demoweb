function getComponent(api, services, $http, alert)
{
	var component = {};


	var get = function(type, role, service, subs)
	{
		var ws = api[type] + services[role][service];

		if(subs != null)
		{
			for(sub in subs)
			{
				var value = subs[sub];
				ws = ws.replace(sub, value);
			}
		}
		return ws;
	}

	var call = function(type, role, service, subs, params, method, callback, callback_error)
	{
		var url = get(type, role, service, subs);

		call_url(url, params, method, callback, callback_error);
	}

	var call_url = function(url, params, method, callback, callback_error)
	{
		var handler = function(response)
		{
			var data = response.data;
			callback(data);
		};

		var handler_error = function(error)
		{
			var data = error.data;
			var message = data ? (data.msg ? data.msg : "Servicio no encontrado") : "Servicio no disponible";

			if(callback_error) callback_error(message);
			else alert.error(message);
		};

		$http[method](url, params).then(handler, handler_error);
	}

	var multipart = function(type, role, service, subs, formdata, callback, callback_error)
	{
		var url = get(type, role, service, subs);

		multipart_url(url, formdata, callback, callback_error);
	}

	var multipart_url = function(url, formdata, callback, callback_error)
	{
		var handler = function(response)
		{
			var data = response.data;
			callback(data);
		};

		var handler_error = callback_error ? callback_error : function(error)
		{
			var data = error.data;
			var message = data ? (data.msg ? data.msg : "Servicio no encontrado") : "Servicio no disponible";
			alert.error(message);
		};

		var options =
		{
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		};

		$http.post(url, formdata, options).then(handler, handler_error);
	}

	component.get = get;
	component.call = call;
	component.call_url = call_url;
	component.multipart = multipart;
	component.multipart_url = multipart_url;

	return component;
}

module.exports.get = getComponent;
