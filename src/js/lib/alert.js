function getComponent(toaster)
{
	var component = {};


	var show = function(message, type, time)
	{
		toaster.pop
		({
			body: message,
			type: type,
			timeout: time,
		});
		//showCloseButton: true
	}

	var success = function(message)
	{
		show(message, "alert", 5000);
	}

	var error = function(message)
	{
		show(message, "error", 5000);
	}

	component.show = show;
	component.success = success;
	component.error = error;

	return component;
}

module.exports.get = getComponent;
