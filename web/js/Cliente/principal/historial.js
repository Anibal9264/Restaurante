function Historialshow(){
    $("#Contenido").html("");
    $("#Contenido").load("com/Cliente/principal/historial.html");
    setTimeout(
     function() 
     {ObtenerOrdenes();},500);
}
function ObtenerOrdenes(){
     $.ajax({type: "GET", url:"api/historial",contentType: "application/json"})
      .then((Ordenes)=>{CargarRows(Ordenes);},(error)=>{ alert(errorMessage(error.status));});    
}

function CargarRows(Ordenes){
   
     var Tbody =$("#rows");
     Tbody.html("");
     Ordenes.forEach((O)=>{rowO(Tbody,O);});
}

function rowO(Tbody,O){
     var tr =$("<tr>");
     tr.html("<td>"+O.fecha+"</td>"+
             "<td>"+estadoR(O.estado)+"</td>"+
             "<td>"+tipoR(O.entrega_recoge)+"</td>"+
             "<td>"+O.formaPago+"</td>"+
             "<td>"+O.total+"</td>");
     
     Tbody.append(tr);  
}

function estadoR(estado){
     if(estado===0) return "preparacion";
     if(estado===1) return "Listo";   
     if(estado===2) return "Entregado";         
}

function tipoR(t){
     if(t) return "Recoje";
     return "Envio";       
}
