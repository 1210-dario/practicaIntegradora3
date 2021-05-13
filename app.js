const { iniciar } = require('./tareas/funcionesDeTareas');

let accion = process.argv[2];

iniciar(accion);

/* 
   +++++++++++++++++++++++++++++++++++++++++
    ASI FUNCIONA LA LISTA DE TAREAS
   +++++++++++++++++++++++++++++++++++++++++

   Por La terminal se podra acceder a la aplicación.
   1. LISTAR
   node app.js listar 
   Te devuleve la lista de tareas guardadas en la db o archivo Json.
   
   2. CREAR
   node app.js crear Limpiar,toda,la,casa

   Esta accion agrega una tarea a la lista de Tareas. Notar 2 cosas, en caso de que la accion o titulo de la tarea sea mas de 1 palabra, las siguiente palabras deberan ingresarse con comas (,) de lo contrario si la Accion consiste en 1 sola palabra debera ingresarse solo esa palabra. Por default el estado de la tarea es Pendiente. Para cambiar el estado de la tarea se utilizara el metodo actualizar.El id lo setea automaticamente. Una vez finalizado el agregado de la Tarea se te devolvera el listado de tareas.

   3. ACTUALIZAR
   node app.js actualizar id estado 

   En este caso el id a ingresar debe ser el que vos quieras actualizar y el estado es el parametro que puedes cambiar.Solo se puede cambiar a Pendiente, En progreso o Terminado.
   Ej:
   node app.js actualizar 1 Terminado

   4. ELIMINAR
   node app.js eliminar id

   En este caso el id a ingresar debe ser el correspondiente a la tarea que deseamos eliminar. Este metodo elimina dicha tarea y te devuelve la nueva lista de tareas.
   Ej:
   node app.js eliminar 1

   5. FILTRAR LA LISTA 
   node app.js filtrar estado

   Te devuelve una lista de tareas con el estado a buscar (Pendiente,En progreso o Terminada). En el caso de escribir En Progreso es necesario utilizar "".
   Ej:
   node app.js filtrar "En progreso"

   6. UNDEFINED
   node app.js 

   Te devuelve: Atención! - Tienes que pasar una acción

   7. OPCION QUE NO EXISTE
   node app.js BokitaElMasGrande

   Te devuelve : No entiendo que quieres hacer

*/