function viewGrafica(){
   $('#A-Contenido').load("com/Admin/principal/estadistica.html");
   $("#MostrarOrden").load("com/Admin/principal/OrdenDetalles.html");
    setTimeout(
function() { 
      cargargraficas();
      ObtenerOrdenesP();
      CargarPlatosmas();
    },300);
}


function cargargraficas(){
   $.ajax({type: "GET", url:"api/admin/ordenesDia",contentType: "application/json"})
      .then((Ordenes)=>{cargarDia(Ordenes);},(error)=>{ alert(errorMessage(error.status));}); 
   $.ajax({type: "GET", url:"api/admin/ordenesMes",contentType: "application/json"})
      .then((Ordenes)=>{cargarMes(Ordenes);},(error)=>{ alert(errorMessage(error.status));}); 
    $.ajax({type: "GET", url:"api/admin/ordenesAño",contentType: "application/json"})
      .then((Ordenes)=>{cargarAño(Ordenes);},(error)=>{ alert(errorMessage(error.status));}); 
}

function cargarDia(Ordenes){

 var total = 0;
 Ordenes.forEach((o)=>{total+=o.total;});
 $("#ventasdia").html("₡"+total);
}
function cargarMes(Ordenes){
var total = 0;
 Ordenes.forEach( (o)=>{total+=o.total;});
 $("#ventasmes").html("₡"+total);
}
function cargarAño(Ordenes){
 var total = 0;
 Ordenes.forEach( (o)=>{total+=o.total;});
 $("#ventasanual").html("₡"+total); 
}

function ObtenerOrdenesP(){
     $.ajax({type: "GET", url:"api/admin/ordenesP",contentType: "application/json"})
      .then((Ordenes)=>{CargarRows(Ordenes);},(error)=>{errorMessage(error.status,$("#ErrorDiv"));});    
}

function CargarPlatosmas(){
     $.ajax({type: "GET", url:"api/admin/ordenPMas",contentType: "application/json"})
      .then((platosmas)=>{cargarGrafica(platosmas);},(error)=>{errorMessage(error.status,$("#ErrorDiv"));});
}

function cargarGrafica(platosmas){
     var body =$("#bodyPla");
     body.html("");
     var n = 0;
     platosmas.forEach((OP)=>{if(n<6){GraficRow(body,OP,platosmas,n);n++;}});  
}

function GraficRow(body,OP,platosmas,n){
    var div =$("<div>");
    var clor = ["bg-success","bg-info","","bg-warning","bg-danger"];
    div.html("<h4 class='small font-weight-bold'>"+
    OP.plato.nombre+"<span class='float-right'>"+Obtenerporcentaje(platosmas,OP)+"%</span></h4>"+
    "<div class='progress'>"+
    "<div class='progress-bar "+clor[n]+"' role='progressbar'"+
    "style='width:"+Obtenerporcentaje(platosmas,OP)+"%' "+
    "aria-valuenow="+Obtenerporcentaje(platosmas,OP)+" aria-valuemin='0' "+
    "aria-valuemax="+Obtenerporcentaje(platosmas,OP)+"></div>"+
    "</div>");
    body.append(div); 
}

function Obtenerporcentaje(platosmas,OP){
    var total = 0;
    platosmas.forEach((OP)=>{total+=OP.cantidad;});
    var v = total/100.00;
    var final = (OP.cantidad*v)*100;
    return  parseInt(final);
}