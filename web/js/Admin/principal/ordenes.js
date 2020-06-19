function Ordenesshow(){
    $("#A-Contenido").load("com/Admin/principal/lista-ordenes.html");
    setTimeout(
     function() 
     {ObtenerOrdenes();},500);
}
function ObtenerOrdenes(){
     $.ajax({type: "GET", url:"api/admin/ordenes",contentType: "application/json"})
      .then((Ordenes)=>{CargarRows(Ordenes);},(error)=>{ alert(errorMessage(error.status));});    
}

function CargarRows(Ordenes){
   
     var Tbody =$("#rows");
     Tbody.html("");
     Ordenes.forEach((O)=>{rowO(Tbody,O);});
}

function rowO(Tbody,O){
     var tr =$("<tr>");
     var td = $("<td>");
     O.orden_platos.forEach((OP)=>{Rowplato(td,OP);});
     tr.html("<td>"+O.cliente+"</td>"+
             "<td>"+O.fecha+"</td>"+
             "<td>"+estadoR(O.estado)+"</td>"+
             "<td>"+tipoR(O.entrega_recoge)+"</td>"+
             "<td>"+O.formaPago+"</td>"+
             "<td>"+O.total+"</td>");
     tr.append(td);
     Tbody.append(tr);  
}
 function Rowplato(td,OP){
 var span = $("<span>");
span.addClass("label  row");
span.html(OP.plato.nombre);
td.append(span);    
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


