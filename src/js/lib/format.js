function getComponent()
{
	var component = {};


	var notificacion = function(notificacion)
	{
		var notificacion_header = {};

		var type = notificacion.type;
		var link = "";
		var titulo = "";

		switch(type)
		{
			case "cotizacion_ring":
				link = "propuestas/" + notificacion._id;
				titulo = "Has recibido una nueva cotización para tu proyecto en el ring " + notificacion.propuesta;
				break;

			case "cotizacion_1vs1":
				link = "propuestas/" + notificacion._id;
				titulo = "Has recibido respuesta a tu proyecto en el 1 vs 1 de " + notificacion.luchador;
				break;

			case "proyecto_entrega":
				link = "dashboard/" + notificacion._id;
				titulo = "El proyecto " + notificacion.proyecto + " ha sido entregado. Por favor confirma que todo esté bien.";
				break;

			case "solicitud_nueva":
				link = "solicitudes/" + notificacion._id;
				titulo = "Has recibido una nueva solicitud de 1 vs 1 de " + notificacion.cliente;
				break;

			case "proyecto_nuevo":
				link = "dashboard";
				titulo = "¡Felicidades! Ya comenzó el proyecto " + notificacion.proyecto;
				break;

			case "proyecto_terminado":
				link = "proyectos/terminados";
				titulo = "El proyecto " + notificacion.proyecto + " fue confirmado de entrega. No olvides evaluar.";
				break;
		}

		notificacion_header.link = link;
		notificacion_header.titulo = titulo;
		notificacion_header.fecha = notificacion.fecha;

		return notificacion_header;
	}

	var expiration = function(date_exp)
	{
		var expires = new Date(date_exp);
		var now = new Date();
		var diff = (expires.getTime() - now.getTime()) / 1000;

		var days = Math.floor(diff / (60 * 60 * 24));
		var hours = Math.floor(diff % (60 * 60 * 24) / (60 * 60));
		var minutes = Math.floor(diff % (60 * 60) / 60);

		var expiration_time = "";
		if(days > 0) expiration_time += "0" + days + " días ";
		if(hours > 0) expiration_time += (hours < 10 ? "0" : "") + hours + " horas";
		//expiration_time += (minutes < 10 ? "0" : "") + minutes;

		return expiration_time;
	}

	component.expiration = expiration;
	component.notificacion = notificacion;

	return component;
}

module.exports.get = getComponent;
