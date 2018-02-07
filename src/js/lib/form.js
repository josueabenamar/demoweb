function getComponent()
{
	var component = {};


	var params = function(form, required, optional)
	{
		var values = {};

		for(k in required)
		{
			var key = required[k];
			if(typeof form[key] == "undefined" || form[key] == null || form[key].length == 0)
			{
				console.log(key);
				return null;
			}
			values[key] = form[key];
		}

		if(optional)
		{
			for(k in optional)
			{
				var key = optional[k];
				if(typeof form[key] != "undefined" && form[key] != null)
				{
					values[key] = form[key];
				}
			}
		}

		return values;
	}

	var field = function(form, fieldname)
	{
		return !(typeof form[fieldname] == "undefined" || form[fieldname].length == 0);
	}

	var email = function(value)
	{
		var expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return expression.test(value);
	}

	var password = function(value, value_confirm)
	{
		return value.length > 0 && value_confirm.length > 0 && value == value_confirm;
	}

	component.params = params;
	component.field = field;
	component.email = email;
	component.password = password;

	return component;
}

module.exports.get = getComponent;
