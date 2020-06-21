function Ordenesshow(){
    $("#A-Contenido").load("com/Admin/principal/lista-ordenes.html");
    $("#MostrarModal").load("com/Admin/principal/OrdenDetalles.html");
    setTimeout(
     function() 
     {ObtenerOrdenes();},500);
}
function ObtenerOrdenes(){
     $.ajax({type: "GET", url:"api/admin/ordenes",contentType: "application/json"})
      .then((Ordenes)=>{CargarRows(Ordenes,true);},(error)=>{errorMessage(error.status,$("#ErrorDiv"));});    
}

function CargarRows(Ordenes,n){
   
     var Tbody =$("#rows");
     Tbody.html("");
     Ordenes.forEach((O)=>{rowO(Tbody,O,n);});
}

function rowO(Tbody,O,n){
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
     tr.find('td').on("click",()=>{MostrarDetallado(O,n);});
     Tbody.append(tr);  
}

function MostrarDetallado(O,n){
   var Tbody =$("#D_table");
   Tbody.html("");
   $("#D_cliente").val(O.cliente);
   $("#D_fecha").val(O.fecha);
   CargarEstado(O.estado);
   O.orden_platos.forEach((OP)=>{RowplatoDetallados(Tbody,OP);});
   $("#D_tipo").val(tipoR(O.entrega_recoge));
   $("#D_fp").val(O.formaPago);
   $("#D_total").val("₡"+O.total);
   $("#Cambiar").off("click");
   $("#Cambiar").on("click",()=>{cambiarestado(O,n);});
   $("#MostrarModal").modal("show");
}

function CargarEstado(estado){
     if(estado===0) $("#e-0").attr('selected', 'selected'); 
     
     if(estado===1) $("#e-1").attr('selected', 'selected');  
     
     if(estado===2) $("#e-2").attr('selected', 'selected');       
}

function cambiarestado(Orden,n){
   var estaddoN = $('#D_estado').find(":selected").val();
   $('#Cambiar').html("");
   $('#Cambiar').html("<span class='spinner-border spinner-border-sm mr-2'></span>Actulizando..");
   Orden.estado=estaddoN;
    $.ajax({type:"POST", url:"api/admin/orden",
       data: JSON.stringify(Orden),contentType: "application/json"})
   .then( ()=>{UpdateSuccess(n);},
     (error)=>{ errorMessage(error.status,$("#ErrorDiv"));});              
}
 
function UpdateSuccess(n){
 $('#Cambiar').html("Actulizado!!");
 setTimeout(function(){$('#Cambiar').html("Actualizar");
     if(n){ObtenerOrdenes();}
     else{ObtenerOrdenesP();}
 },500);    
}


 function Rowplato(td,OP){
 var span = $("<span>");
span.addClass("label  row");
span.html(OP.plato.nombre);
td.append(span);    
 }



 function RowplatoDetallados(Tbody,OP){
var tr =$("<tr>");     
tr.html("<td>"+OP.plato.nombre+"</td>"+
         "<td>"+OP.cantidad+"</td>"+
         "<td>"+OP.detalle+"</td>"); 
 var td =$("<td>");
 OP.adicionales.forEach((a)=>{Rowadicionales(td,a);});
 tr.append(td);
 var td2 =$("<td>");
 td2.html(OP.total);
 tr.append(td2);
 Tbody.append(tr);
 }
 
 function Rowadicionales(td,a){
 var span = $("<span>");
 span.addClass("label  row");
 span.html(a.detalle);
 td.append(span);    
 }

function estadoR(estado){
     if(estado===0) return "Preparacion";
     if(estado===1) return "Listo";   
     if(estado===2) return "Entregado";         
}

function tipoR(t){
     if(t) return "Recoje";
     return "Envio";       
}


