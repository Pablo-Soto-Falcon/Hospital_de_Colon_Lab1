Este proyecto tiene como objetivo la creación de una página web para el Hospital Español de Colón. La web está diseñada para mostrar el equipo médico, permitir la reserva de citas y ofrecer información de contacto. A continuación, se detallan los aspectos clave de la implementación, incluyendo la integración de prompts, validación de datos, uso de variables y manejo de errores.

<!-- Descripción de la integración de prompts y validación de datos -->
En este proyecto, se han utilizado prompts para interactuar con el usuario y permitirle realizar acciones como filtrar el equipo médico según especialidad y experiencia, o ingresar información en formularios de contacto. Los formularios requieren que el usuario complete ciertos campos, como nombre, correo electrónico, teléfono y mensaje. Estos datos son validados utilizando el atributo required en los formularios HTML, asegurando que el usuario no envíe información incompleta.

<!-- Validación adicional de datos con JavaScript -->
Para asegurarnos de que los datos ingresados sean válidos, implementamos validaciones adicionales con JavaScript. Por ejemplo:

Correo electrónico: Se valida que el formato del correo electrónico sea correcto antes de permitir el envío del formulario.
Teléfono: Se valida que el número de teléfono esté en el formato adecuado utilizando expresiones regulares.
La validación se realiza cuando el usuario intenta enviar el formulario, y si alguna de las validaciones falla, el formulario no se enviará hasta que se corrija el error.

<!-- Scope de variables y uso de operadores -->
En el código JavaScript, hemos manejado diferentes tipos de variables con alcance global y local. A continuación, se detalla el uso de estas:

Variables de ámbito global:

Las variables utilizadas para manejar la información de los formularios, como el nombre, correo electrónico, teléfono y mensaje, son globales en el contexto del script que maneja los formularios de contacto.
Variables de ámbito local:

Las variables usadas para almacenar los filtros seleccionados por el usuario (como especialidad y experiencia) están definidas dentro de la función de manejo de eventos para el filtrado dinámico del equipo médico. Esto garantiza que solo estén disponibles durante la ejecución de esa función.
Operadores utilizados:
Operadores lógicos (&&, ||): Se utilizan para evaluar múltiples condiciones en las validaciones de los formularios.
Operadores de comparación (==, ===): Se utilizan para comparar los valores de los campos ingresados por el usuario con los valores esperados, como en las comparaciones de los filtros.
Uso del debugger y manejo de errores con try/catch
En el desarrollo de este proyecto, hemos integrado la capacidad de depurar errores utilizando la herramienta console.log() y el uso del debugger de los navegadores web.

<!-- Depuración: -->
Consola de JavaScript:
Para verificar el valor de las variables y el flujo del código, usamos console.log() en diversas partes del código, especialmente al manejar los datos ingresados por el usuario y antes de realizar las validaciones.
Debugger:
También se utiliza la instrucción debugger; en el código cuando necesitamos hacer una pausa en la ejecución del programa y examinar las variables y su estado en tiempo real.
Manejo de errores:
Para prevenir que el código falle en caso de que algo inesperado ocurra, hemos utilizado bloques try/catch. Estos bloques permiten manejar posibles errores durante la ejecución del código y evitar que el script se detenga abruptamente.

Por ejemplo, al manejar los formularios, envolvemos la lógica de envío de datos en un bloque try/catch para capturar cualquier error inesperado:

Esto asegura que, incluso si ocurre un error, el usuario recibirá un mensaje de advertencia apropiado y el sistema continuará funcionando correctamente.

<!-- Instrucciones de uso -->
Para comenzar a utilizar el proyecto, sigue estos pasos:

Clona el repositorio o descarga los archivos.
Abre el archivo index.html en un navegador web.
Navega por las diferentes secciones:
En la sección de "Equipo Médico", puedes filtrar los médicos por especialidad y años de experiencia.
En la sección de "Contacto", puedes llenar el formulario para comunicarte con el hospital. Asegúrate de completar todos los campos correctamente antes de enviarlo.