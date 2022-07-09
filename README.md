# Bienvenidos al Sistema de Liquidación de Viáticos!!!

## Introducción

Mi nombre es Jonathan Ariel Bussaca, tengo 34 años y soy Contador Público Nacional recibido en la Facultad de Ciencias Económicas de la Universidad de Buenos Aires.

Hace algunos años trabajé como coordinador del área de Liquidaciones de Pagos en el Ministerio del Interior, Obras Públicas y Vivienda.

Entre las tareas que realizaba mi equipo de trabajo, una de ellas era liquidar los viáticos, una vez que el agente que realizó la comisión presentaba toda la documentación pertinente. Dicha liquidación se realizaba de manera manual, utilizando una base de datos Excel.

La idea de realizar este proyecto, surge de la necesidad de evitar errores al momento de calcular el monto a pagar de viáticos que le corresponde al agente.

El sistema permite que un usuario pueda loguearse a través de una contraseña asignada, y completar un formulario con la información del viaje realizado por un agente; pudiendo a través de un boton, calcular el monto que le corresponde cobrar (de acuerdo al día, el horario y la zona en que realiza la comisión de servicio). Una vez que los datos se validan, se habilita el botón imprimir. 

Al hacer click en el botón imprimir, se despliega la pantalla del "print" para que el usuario pueda imprimir y firmar el formulario que debe presentar al área de Tesorería junto con la demás documentación pertinente requerida para el pago. En caso de que el usuario cambie algún dato que influya en el cálculo del monto total a pagar, el botón imprimir se deshabilita. Se establece esta secuencia teniendo en cuenta que, si el usuario modifica algún dato relevante que cambie el valor del viático, el botón imprimir no se habilite hasta tanto el botón "Total a pagar" sea pulsado; para así evitar que haya un error en los datos cargados que arroja la impresión, en relación al monto que calcula el sistema.

Para la ejecución de este proyecto establecí los siguientes supuestos:
* Viajes en AVIÓN dentro de un mismo mes, incluyendo para el cálculo del pago los días sábados, domingos y feriados.
* Duración de la comisión hasta 5 días.
* Se ha asignó un usuario y contraseña a 3 personas (José, Marcelo y Jonathan), quienes serán los responsables de ejecutar y controlar las liquidaciones.

## Estructura del Código

|index.html| Archivo responsable de la estructura del proyecto. Es el punto de partida, desde el cual el agente puede operar con el simulador, validando su usuario para poder ir a la página que contiene el formulario con los datos a cargar para liquidar el viático.

|formulario.html| Archivo que contiene la estructura del formulario.

|README.md| Archivo con explicaciones e información acerca del proyecto (el que estás leyendo ahora).

### Carpeta styles

Contiene los archivos css responsables de los estilos y cómo se ve (estéticamente) el proyecto.

### Carpeta assets

Es el lugar donde se almacenan las imágenes, y un archivo .JSON que contiene un array de objetos con las regiones y sus valores, y las provincias que integran cada región. Estos valores suelen actualizarse de manera semestral.

### Carpeta scripts

Contiene los archivos JavaScript que hacen funcionar el proyecto, define el contenido y hace funcional la página html. 

Contiene 5 archivos:
|\|- clases.js|Contiene la declaración de la clase "User"|
|\|- data.js|Aquí se contruyen los objetos de la clase declarando una variable y asignando la referencia del objeto instanciado con "new"|
|\|- main.js|Es el archivo principal que recorre el código y le da dinamismo al archivo index.html|
|\|- form.js|Contiene el código JavaScript (variables, funciones y objetos) que da dinamismo al archivo formulario.html|
|\|- utils.js|contiene la función de inicio que define las instrucciones para que el usuario se loguee. La misma es importada desde el main.js|

## Información Adicional

* Se utilizó la librería Sweet Alert que fue incorporada al proyecto a través de un CDN (https://cdn.jsdelivr.net/npm/sweetalert2@11.4.17/dist/sweetalert2.all.min.js).
* Se utilizó el Locale Storage para guardar la información del archivo .JSON y obtener los objetos desde el Storage para luego utilizarlos en una función condicional.
* El código comentado (en clases.js y data.js) es una forma alternativa de crear los objetos principales (regiones) a través de una clase denominada "zona".


