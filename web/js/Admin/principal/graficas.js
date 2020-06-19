function viewGrafica(){
   $('#A-Contenido').load("com/Admin/principal/estadistica.html");
    setTimeout(
function() { 
      cargargraficas();
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