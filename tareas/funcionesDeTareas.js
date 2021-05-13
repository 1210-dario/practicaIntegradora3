const fs = require('fs');
const process = require('process');

//Json parseado para usarlo en las funciones
let tareaJson = JSON.parse(fs.readFileSync('./db/tareas.json','utf-8'));

//Objeto tareas que realiza las operaciones principales
let tareas = {
    //Función para mostrar la lista de tareas
    listar : ()=>{
        mostrarLista(tareaJson);
    },
    //Función para Agregar Tareas
    agregarTarea : (tarea)=>{
        tareaJson.push(tarea);
        guardar(tareaJson);
        console.log(`La tarea con id: ${tarea.id} y título ${tarea.titulo} ha sido creado/a correctamente`);
        tareas.listar();
    },
    //Función para Actualizar Tareas
    actualizarTarea : (id,estado)=>{
        let tareaAActualizar = tareaJson.filter(function(tarea){
            return tarea.id == id
        })
        tareaAActualizar[0].estado = estado;
        let listaSinActualizar = tareaJson.filter(function(tarea){
            return tarea.id != id
        })
        tareaJson = [...listaSinActualizar,...tareaAActualizar];
        guardar(tareaJson);
        console.log(`La tarea con id: ${id} ha sido actualizada al estado: ${estado}.`);
        tareas.listar();
    },
    //Función para borrar Tareas
    borrarTarea : (id)=>{
        tareaJson = tareaJson.filter(function(tarea){
            return tarea.id != id
        });
        guardar(tareaJson);
        console.log(`La tarea con id: ${id} se borrado correctamente.`);
        tareas.listar();          
    },
    //Función para listar Pendientes
    filtrarPorEstado : (filtro)=>{
        let nuevaLista = tareaJson.filter(function(elements){
            return elements.estado.toLocaleLowerCase() == filtro;
        });
        mostrarLista(nuevaLista);
    },
};

//Funcion donde se elije cual es el estado ingresado por el usuario para actualizar
const actualizar = (idIngresadoA, estadoIngresado)=>{
    if(process.argv[5]!=undefined){
        estadoIngresado = process.argv[4] + ' ' + process.argv[5];
        tareas.actualizarTarea(idIngresadoA,estadoIngresado);
    }else{
        estadoIngresado = process.argv[4];
        tareas.actualizarTarea(idIngresadoA,estadoIngresado);
    }; 
};

//Función donde Agrego el Titulo a la tarea
const agregarTitulo = (tareaTitulo)=>{

    let prueba = process.argv[3];
    let oracionSinComas= prueba.replace(/,/g, ' ');   
    tareaTitulo.titulo = oracionSinComas;
};

//Función para agregar un id en la tarea a agregar
const agregarID = (tarea)=>{
    if(tareaJson[0] == undefined){
        tarea.id = 1;
    }else{
        let ids = tareaJson.map(function(elements){
            return elements.id
        });
        let idMayor = ids[0];
        for (let i = 0; i < ids.length; i++) {
            if(ids[i] > idMayor){
                idMayor =ids[i]
            };        
        };
        tarea.id = idMayor+1;
    };
};

//Función para guardar en tareas.json
const guardar = (elemento)=>{
    fs.writeFileSync('./db/tareas.json',JSON.stringify(elemento,null,2),'utf-8');
};

//Función para mostrar una lista
const mostrarLista = (mostrar) =>{
    console.log('*************************Lista De Tareas**************************');
    mostrar.forEach(element => {
        console.log('------------------------------------------------------------------');
        console.log(`La tarea con id: ${element.id} es: ${element.titulo} y su estado es: ${element.estado}`);
        console.log('------------------------------------------------------------------');
    });
};

//Función para iniciar el Programa
const iniciar = (accion) => {
    switch (accion) {
        case 'listar':
            tareas.listar();        
            break;
        case 'crear':
            let tarea = {
                id : 0,
                titulo : '',
                estado : 'Pendiente', 
            };
            agregarID(tarea);
            agregarTitulo(tarea); 
            tareas.agregarTarea(tarea);
            break;
        case 'actualizar':
            let idIngresadoA = process.argv[3];
            let estadoIngresado;
            actualizar(idIngresadoA , estadoIngresado);   
            break;
        case 'eliminar':
            let idIngresadoE = process.argv[3];
            tareas.borrarTarea(idIngresadoE);
            break;
        case 'filtrar':
            let filtro = process.argv[3].toLocaleLowerCase();
            tareas.filtrarPorEstado(filtro);
            break;
        case undefined : 
            console.log('Atención! - Tienes que pasar una acción');
            break;
        default:
            console.log('No entiendo que quieres hacer');
            break;
    };    
};

module.exports = {
    iniciar,
};
