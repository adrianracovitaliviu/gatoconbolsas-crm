const codeMessage = {
  200: 'El servidor ha devuelto los datos correctamente. ',
  201: 'Creación o modificación de datos exitosa. ',
  202: 'La petición se ha puesto a la cola. ',
  204: 'Datos eliminados con éxito. ',
  400: 'Ha ocurrido un error en la petición, el servidor no ha realizado cambios. ',
  401: 'No tiene permisos, pruebe a iniciar sesión de nuevo. ',
  403: 'Está autorizado, pero el acceso al componente está prohibido. ',
  404: 'La petición solicitada no existe en el servidor. ',
  406: 'el formato solicitado no está disponible. ',
  410: 'El recurso que solicita ha sido eliminado y ya no existe en el servidor. ',
  422: 'Error de validación. ',
  500: 'Error de servidor, por favor revise la configuración. ',
  502: 'Gateway error. ',
  503: 'Servicio no disponible, servidor caído o en mantenimiento. ',
  504: 'Gateway time out. ',
};

export default codeMessage;
