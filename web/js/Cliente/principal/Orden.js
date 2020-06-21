function ObtenerDatosOrden(plato){

    Orden_Plato={
       plato: plato,
       cantidad:$('#cantidad').val(),
       detalle:$('#comentario').val(),
       total: $('#totalP').val(),
       adicionales:ObtenerSel()
   };
  
   var obj = $.parseJSON(sessionStorage.getItem('orden'));
   var  ot = obj.total;
   var t = parseFloat(ot)+parseFloat(Orden_Plato.total);
   obj.total= t;
   obj.orden_platos.push(Orden_Plato);
   ActualizarOrden(obj);
}

function ObtenerSel(){
       var adicionales =[];
     $("input[type=checkbox]:checked").each(function() {
         Adicional={
             id:$(this).attr("id")
         };
      adicionales.push(Adicional);
     }); 
     
      $("input[type=radio]:checked").each(function() {
         Adicional={
             id:$(this).attr("id")
         };
      adicionales.push(Adicional);
     });
     
     return adicionales;
}


function ActualizarOrden(obj){
    sessionStorage.removeItem('orden');
    sessionStorage.setItem('orden',JSON.stringify(obj)); 
}

function CargarPlatosOrden(){
    var obj = $.parseJSON(sessionStorage.getItem('orden'));
    
    if(obj.orden_platos.length>0){
          var listado=$("#platosOrden");
          listado.html("");
          CargarPagoT(listado,obj);
          CargarEncabezado(listado,obj);
          var i = 0;
          obj.orden_platos.forEach((op)=>{rowPO(listado,op,i);i++;});
          
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
    li.find("#Lop1").on("click",()=>{obj.entrega_recoge=true;ActualizarOrden(obj);});
    li.find("#Lop2").on("click",()=>{obj.entrega_recoge=false;ActualizarOrden(obj);});
    if(obj.entrega_recoge){
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
       obj.orden_platos[i].cantidad=parseInt(op.cantidad)+1;
       var precio = op.total/op.cantidad;
       obj.orden_platos[i].total=precio*(parseInt(op.cantidad)+1);
       var  ot = obj.total;
       var t = parseFloat(ot)+parseFloat(precio);
       obj.total= t; 
       ActualizarOrden(obj);
       CargarPlatosOrden();
}
function RestarPlato(i,op){
    if(op.cantidad>1){
       var obj = $.parseJSON(sessionStorage.getItem('orden'));
       obj.orden_platos[i].cantidad=op.cantidad-1;
       var precio = op.total/op.cantidad;
       obj.orden_platos[i].total=precio*(op.cantidad-1);
       var  ot = obj.total;
       var t = parseFloat(ot)-parseFloat(precio);
       obj.total= t; 
       ActualizarOrden(obj);
       CargarPlatosOrden();
    }
}
function EliminarPdeLista(i,op){
    var obj = $.parseJSON(sessionStorage.getItem('orden'));
    obj.orden_platos.splice(i,1);
    if(obj.orden_platos.length>0){
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
      cargarlogin(); 
     }
 }


 function CargarDatosAOrden(){
  var orden = $.parseJSON(sessionStorage.getItem('orden')); 
  var Cliente = $.parseJSON(sessionStorage.getItem('cliente'));
  pop(Cliente,orden);
 }

function pop(cliente,orden){
  var select = $("#Ldirecciones");
  if(!orden.entrega_recoge){
   select.removeClass("hide");
   $("#AddDireccion").removeClass("hide");
   $("#AddDireccion").on("click",()=>{$('#direccion-modal').modal('show');});
   $("#AddD").on("click",()=>{$('#direccion-modal').modal('hide');
     addDireccion();
   });
    cliente.direcciones.forEach((d)=>{optionAdd(select,d);});  
   }else{select.addClass("hide");$("#AddDireccion").addClass("hide");}
  $("#efectivo").on("click",()=>{orden.formaPago="Efectivo";ActualizarOrden(orden);});
  $("#tarjeta").on("click",()=>{orden.formaPago="Tarjeta";ActualizarOrden(orden);});
  $("#sinpe").on("click",()=>{orden.formaPago="SINPE Movil";ActualizarOrden(orden);});
  $("#Realizar").on("click",()=>{
      if(!orden.entrega_recoge){
         orden.direccion=$('#Ldirecciones').find(":selected").val();    
      }
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

 function addDireccion(){
   var select;
   $("#boton").click(function () {	 
       select = $('input:radio[name=options]:checked').val();
    });
		
   Direccion={
       provincia:$("#provincia").val(),
       canton:$("#canton").val(),
       distrito:$("#distrito").val(),
       exacta:$("#exacta").val(),
       formaPago:select
   };
   $.ajax({type: "POST", url:"api/direccion",
      data: JSON.stringify(Direccion),contentType: "application/json"})
      .then((persona)=>{
          persona.correo="";
          persona.contraseña="";
          CargarCliente(persona);}); 
 }

 function RealizarYGuargarOrden(){
      $.ajax({type: "POST", url:"api/realizar",
                data: sessionStorage.getItem('orden'),contentType: "application/json"})
      .then(()=>{Realizada();},
      (error)=>{ alert(errorMessage(error.status));});
           
 }
 
 function Realizada(){
     sessionStorage.setItem('orden',JSON.stringify(OrdenRender()));
     $("#add-modal2").modal("hide");
     $("#comparRealizada").modal("show");
     CargarPlatosOrden();
     setTimeout(
     function() 
     {
      $("#comparRealizada").modal("hide");
     }, 2000);
 }
 
 function OrdenRender(){
     Orden={
             total: 0.0,
             entrega_recoge:true,
             fecha:"",
             estado:0,
             cliente:"",
             direccion:"",
             orden_platos:[],
             formaPago:"Efectivo"             
         };
         return Orden;
 }
 

