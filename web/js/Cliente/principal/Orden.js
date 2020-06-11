function ObtenerDatosOrden(plato){
    var adicionales =[];
     $("input[type=checkbox]:checked").each(function() {
         Adicional={
             id:$(this).attr("id")
         };
      adicionales.push(Adicional);
     });
    Orden_Plato={
       plato: plato,
       cantidad:$('#cantidad').val(),
       detalle:$('#comentario').val(),
       total: $('#totalP').val(),
       adicionales:adicionales
   };
  
   var obj = $.parseJSON(sessionStorage.getItem('orden'));
   var  ot = obj.total;
   var t = parseFloat(ot)+parseFloat(Orden_Plato.total);
   obj.total= t;
   obj.Orden_platos.push(Orden_Plato);
   ActualizarOrden(obj);
}

function ActualizarOrden(obj){
    sessionStorage.removeItem('orden');
    sessionStorage.setItem('orden',JSON.stringify(obj)); 
}

$(window).ready(function(){
     if(sessionStorage.getItem('orden')){
        CargarPlatosOrden();
     }else{
         Orden={
             total: 0.0,
             Entrega_recoje:true,
             fecha:"",
             estado:0,
             cliente:"",
             direccion:"",
             Orden_platos:[],
             formaPago:"Efectivo"             
         };
         sessionStorage.setItem('orden',JSON.stringify(Orden));
  
     }

     
     if(sessionStorage.getItem('cliente')){
        CargarDatosCliente();
     }else{
         Cliente={
             nombre:"Anibal", 
             apellidos:"Chaves Badilla",
             correo:"anibalchavesbadilla@hotmail.com",
             contraseña:"1509",
             telefono:"60193037",
             isAdmin:false,
             direcciones:[]
         };
         
         Direccion={
          id: 1,
          provincia : "Guanacaste",
          canton : "Abangares",
          distrito : "Las Juntas",
          exacta : "Barrio Santa lucia"
         };
         Cliente.direcciones.push(Direccion);
         sessionStorage.setItem('cliente',JSON.stringify(Cliente));
     }
     
     
     
     
});

$(window).unload(function(){
     localStorage.clear();
});

function CargarDatosCliente(){
     var cliente = $.parseJSON(sessionStorage.getItem('cliente'));
     var nom=$("#NombreC");
     nom.html(cliente.nombre+" "+cliente.apellidos);
}


function CargarPlatosOrden(){
    var obj = $.parseJSON(sessionStorage.getItem('orden'));
    if(obj.Orden_platos.length>0){
          var listado=$("#platosOrden");
          listado.html("");
          CargarPagoT(listado,obj);
          CargarEncabezado(listado,obj);
          var i = 0;
          obj.Orden_platos.forEach((op)=>{rowPO(listado,op,i);i++;});
          
    }else{
       var listado=$("#platosOrden");
       listado.html("");
    }
}


function CargarEncabezado(listado,obj){
    var li =$("<li>");
    li.addClass("btn-group btn-group-toggle list-group-item");
    li.attr("data-toggle","buttons");
    li.html("<label  id='Lop1' class='btn btn-secondary w-50 '>"+
      "<input type='radio' name='options' autocomplete='off' > Recoge"+
      "</label>"+
      "<label id='Lop2' class='btn btn-secondary w-50 '>"+
       "<input type='radio' name='options' autocomplete='off'> Enviar"+
       "</label>");
    li.find("#Lop1").on("click",()=>{obj.Entrega_recoje=true;ActualizarOrden(obj);});
    li.find("#Lop2").on("click",()=>{obj.Entrega_recoje=false;ActualizarOrden(obj);});
    if(obj.Entrega_recoje){
        li.find("#Lop1").addClass("active"); 
        li.find("#Lop1").attr("checked");}
    else {li.find("#Lop2").addClass("active");
          li.find("#Lop2").attr("checked");}
    
   
    listado.append(li);  
    
}
function rowPO(listado,op,i){
    var li =$("<li>");
        li.addClass("list-group-item d-flex justify-content-between align-items-center ");
	li.html("<button id='delP' type='button' class='close' aria-label='Close'>"+
           "<small aria-hidden='true'>&times;</small> </button>"+
           "<small>"+op.plato.nombre+"</small>"+
          "<button class='btn btn-light btn2' id='Omenos' type='button'>-</button>"+
           "<span class='badge badge-primary badge-pill'>"+op.cantidad+"</span>"+
           "<button class='btn btn-light btn2' id='Omas' type='button'>+</button>"+
           "<span class='badge badge-primary badge-pill'>¢"+op.total+"</span>"
          );
  li.find("#delP").on("click",()=>{EliminarPdeLista(i,op);});
  li.find("#Omenos").on("click",()=>{RestarPlato(i,op);});
  li.find("#Omas").on("click",()=>{SumarPlato(i,op);});
  listado.append(li);  
}
function SumarPlato(i,op){
       var obj = $.parseJSON(sessionStorage.getItem('orden'));
       obj.Orden_platos[i].cantidad=parseInt(op.cantidad)+1;
       var precio = op.total/op.cantidad;
       obj.Orden_platos[i].total=precio*(parseInt(op.cantidad)+1);
       var  ot = obj.total;
       var t = parseFloat(ot)+parseFloat(precio);
       obj.total= t; 
       ActualizarOrden(obj);
       CargarPlatosOrden();
}
function RestarPlato(i,op){
    if(op.cantidad>1){
       var obj = $.parseJSON(sessionStorage.getItem('orden'));
       obj.Orden_platos[i].cantidad=op.cantidad-1;
       var precio = op.total/op.cantidad;
       obj.Orden_platos[i].total=precio*(op.cantidad-1);
       var  ot = obj.total;
       var t = parseFloat(ot)-parseFloat(precio);
       obj.total= t; 
       ActualizarOrden(obj);
       CargarPlatosOrden();
    }
}
function EliminarPdeLista(i,op){
    var obj = $.parseJSON(sessionStorage.getItem('orden'));
    obj.Orden_platos.splice(i,1);
    if(obj.Orden_platos.length>0){
    var  ot = obj.total;
    var t = parseFloat(ot)-parseFloat(op.total);
    obj.total= t; 
    }else{obj.total= 0; }
    ActualizarOrden(obj);
    CargarPlatosOrden();
}

 function CargarPagoT(listado,obj){
       var li =$("<li>");
    li.addClass("list-group-item d-flex justify-content-between align-items-center");
    li.html("<button  id='pagar' type='submit' class='btn btn-primary btn-block' data-attach-loading=''>"+
       "Pagar :<span id='totalO'>¢"+obj.total+"</span></button>");
    li.find("#pagar").on("click",()=>{ProcesoPago();});
    listado.append(li); 
 }
 
 
 /// PAGAR PROCESO 
 
 function ProcesoPago(){
      
 if(sessionStorage.getItem('cliente')){
      CargarDatosAOrden();
     }else{
         
         // aca lo redirijo al login 
     }
 }


 function CargarDatosAOrden(){
 
  var orden = $.parseJSON(sessionStorage.getItem('orden')); 
  var Cliente = $.parseJSON(sessionStorage.getItem('cliente'));
  popopDireccion(Cliente,orden);
 }

function popopDireccion(cliente,orden){
  var select = $("#Ldirecciones");
  if(!orden.Entrega_recoje){
   select.removeClass("hide");
   $("#AddDireccion").removeClass("hide");
      cliente.direcciones.forEach((d)=>{optionAdd(select,d);});
      
   }else{select.addClass("hide");$("#AddDireccion").addClass("hide");}
  $("#efectivo").on("click",()=>{orden.formaPago="Efectivo";ActualizarOrden(orden);});
  $("#tarjeta").on("click",()=>{orden.formaPago="Tarjeta";ActualizarOrden(orden);});
  $("#sinpe").on("click",()=>{orden.formaPago="SINPE Movil";ActualizarOrden(orden);});
  $("#Realizar").on("click",()=>{
      if(!orden.Entrega_recoje){
         orden.direccion=$('#Ldirecciones').find(":selected").val();    
      }
     
      orden.fecha = hoyFecha();
      orden.cliente = cliente.correo;
      ActualizarOrden(orden);
      RealizarYGuargarOrden();
  });
  $('#add-modal2').modal('show');
}
function optionAdd(select,d){
    var option = $('<option>');
    option.val(d.id);
    option.html(d.provincia+","+d.canton+","+d.distrito+","+d.exacta);
    select.append(option);
    
}


function hoyFecha(){
    
    var hoy = new Date();
        var dd = hoy.getDay();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        var hh = hoy.getHours();
        var mn = hoy.getMinutes();
        var ss = hoy.getSeconds();
        return yyyy+'-'+mm+'-'+dd+' '+hh+':'+mn+':'+ss;
}


 function RealizarYGuargarOrden(){
      $.ajax({type: "POST", url:"/Restaurante/api/realizar",
                data: sessionStorage.getItem('orden'),contentType: "application/json"})
      .then( 
             (error)=>{ alert(errorMessage(error.status));});  
 }
   Orden_plato={
       Plato: plato,
       cantidad:$('#cantidad').val(),
       detalle:$('#comentario').val(),
       total: $('#totalP').val(),
       adicionales:[]  // me falta esto
   };
  
   var obj = $.parseJSON(sessionStorage.getItem('orden'));
   var  ot = obj.total;
   var t = parseFloat(ot)+parseFloat(Orden_plato.total);
   obj.total= t;
   obj.Orden_platos.push(Orden_plato);
   ActualizarOrden(obj);

function ActualizarOrden(obj){
    sessionStorage.removeItem('orden');
   sessionStorage.setItem('orden',JSON.stringify(obj)); 
}

$(window).ready(function(){
     if(sessionStorage.getItem('orden')){
        CargarPlatosOrden();
     }else{
         Orden={
             total: 0.0,
             Entrega_recoje:true,
             estado:0,
             Orden_platos:[]
         };
         sessionStorage.setItem('orden',JSON.stringify(Orden));
  
     }

     
     if(sessionStorage.getItem('cliente')){
        CargarDatosCliente();
     }else{
         Cliente={
             nombre:"Anibal", 
             apellidos:"Chaves Badilla",
             correo:"anibalchavesbadilla@hotmail.com",
             contraseña:"1509",
             telefono:"60193037",
             isAdmin:false,
             direcciones:[]
         };
         
         Direccion={
          id: 1,
          provincia : "Guanacaste",
          canton : "Abangares",
          distrito : "Las Juntas",
          exacta : "Barrio Santa lucia"
         };
         Cliente.direcciones.push(Direccion);
         sessionStorage.setItem('cliente',JSON.stringify(Cliente));
     }
     
     
     
     
});

$(window).unload(function(){
     localStorage.clear();
});

function CargarDatosCliente(){
     var cliente = $.parseJSON(sessionStorage.getItem('cliente'));
     var nom=$("#NombreC");
     nom.html(cliente.nombre+" "+cliente.apellidos);
}


function CargarPlatosOrden(){
    var obj = $.parseJSON(sessionStorage.getItem('orden'));
    if(obj.Orden_platos.length>0){
          var listado=$("#platosOrden");
          listado.html("");
          CargarPagoT(listado,obj);
          CargarEncabezado(listado,obj);
          var i = 0;
          obj.Orden_platos.forEach((op)=>{rowPO(listado,op,i);i++;});
          
    }else{
       var listado=$("#platosOrden");
       listado.html("");
    }
}


function CargarEncabezado(listado,obj){
    var li =$("<li>");
    li.addClass("btn-group btn-group-toggle list-group-item");
    li.attr("data-toggle","buttons");
    li.html("<label  id='Loption1' class='btn btn-secondary w-50 '>"+
      "<input type='radio' name='options' id='option1' autocomplete='off' > Recoge"+
      "</label>"+
      "<label id='Loption2' class='btn btn-secondary w-50 '>"+
       "<input type='radio' name='options' id='option2' autocomplete='off'> Enviar"+
       "</label>");
       
    if(obj.Entrega_recoje){li.find("#Loption1").addClass("active"); 
        li.find("#option1").attr("checked");}
    else {li.find("#Loption2").addClass("active");
        li.find("#option2").attr("checked");}
    
    li.find("#Loption1").on("click",()=>{obj.Entrega_recoje=true;ActulizarOrden(obj);});
    li.find("#Loption2").on("click",()=>{obj.Entrega_recoje=false;ActulizarOrden(obj);});
    listado.append(li);  
    
}
function rowPO(listado,op,i){
    var li =$("<li>");
        li.addClass("list-group-item d-flex justify-content-between align-items-center ");
	li.html("<button id='delP' type='button' class='close' aria-label='Close'>"+
           "<small aria-hidden='true'>&times;</small> </button>"+
           "<small>"+op.Plato.nombre+"</small>"+
          "<button class='btn btn-light btn2' id='Omenos' type='button'>-</button>"+
           "<span class='badge badge-primary badge-pill'>"+op.cantidad+"</span>"+
           "<button class='btn btn-light btn2' id='Omas' type='button'>+</button>"+
           "<span class='badge badge-primary badge-pill'>¢"+op.total+"</span>"
          );
  li.find("#delP").on("click",()=>{EliminarPdeLista(i,op);});
  li.find("#Omenos").on("click",()=>{RestarPlato(i,op);});
  li.find("#Omas").on("click",()=>{SumarPlato(i,op);});
  listado.append(li);  
}
function SumarPlato(i,op){
       var obj = $.parseJSON(sessionStorage.getItem('orden'));
       obj.Orden_platos[i].cantidad=parseInt(op.cantidad)+1;
       var precio = op.total/op.cantidad;
       obj.Orden_platos[i].total=precio*(parseInt(op.cantidad)+1);
       var  ot = obj.total;
       var t = parseFloat(ot)+parseFloat(precio);
       obj.total= t; 
       ActualizarOrden(obj);
       CargarPlatosOrden();
}
function RestarPlato(i,op){
    if(op.cantidad>1){
       var obj = $.parseJSON(sessionStorage.getItem('orden'));
       obj.Orden_platos[i].cantidad=op.cantidad-1;
       var precio = op.total/op.cantidad;
       obj.Orden_platos[i].total=precio*(op.cantidad-1);
       var  ot = obj.total;
       var t = parseFloat(ot)-parseFloat(precio);
       obj.total= t; 
       ActualizarOrden(obj);
       CargarPlatosOrden();
    }
}
function EliminarPdeLista(i,op){
    var obj = $.parseJSON(sessionStorage.getItem('orden'));
    obj.Orden_platos.splice(i,1);
    if(obj.Orden_platos.length>0){
    var  ot = obj.total;
    var t = parseFloat(ot)-parseFloat(op.total);
    obj.total= t; 
    }else{obj.total= 0; }
    ActualizarOrden(obj);
    CargarPlatosOrden();
}

 function CargarPagoT(listado,obj){
       var li =$("<li>");
    li.addClass("list-group-item d-flex justify-content-between align-items-center");
    li.html("<button  id='pagar' type='submit' class='btn btn-primary btn-block' data-attach-loading=''>"+
       "Pagar :<span id='totalO'>¢"+obj.total+"</span></button>");
    li.find("#pagar").on("click",()=>{ProcesoPago();});
    listado.append(li); 
 }
 
 
 /// PAGAR PROCESO 
 
 function ProcesoPago(){
      
 if(sessionStorage.getItem('cliente')){
      CargarDatosAOrden();
     }else{
         
         // aca lo redirijo al login 
     }
 }


 function CargarDatosAOrden(){
 
  //var orden = $.parseJSON(sessionStorage.getItem('orden')); 
  var Cliente = $.parseJSON(sessionStorage.getItem('cliente'));
  popopDireccion(Cliente);
  //obtener direccion
  //Fecha
  //Estado
 }

function popopDireccion(cliente){
  var select = $("#Ldirecciones");
  cliente.direcciones.forEach((d)=>{optionAdd(select,d);});
  $("#AddDireccion").on("click",()=>{alert("add dierccion");});
  $("#Continuar").on("click",()=>{alert("forma de pago");});
  $('#add-modal2').modal('show');
}
function optionAdd(select,d){
    var option = $('<option>');
    option.val(d.id);
    option.html(d.provincia+","+d.canton+","+d.distrito+","+d.exacta);
    select.append(option);
}
