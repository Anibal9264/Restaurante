
function GetListPlatos(ID){
    $.ajax({type: "GET", url:"api/menu?id="+ID,
         contentType: "application/json"})
      .then( (platos)=>{listplatos(platos);},
             (error)=>{ alert(errorMessage(error.status));});    
}
  
function listplatos(platos){
    var listado=$("#platoslist");
    listado.html("");
    platos.forEach((p)=>{row(listado,p);});	
}

function row(listado,plato){
	var div =$("<div>");
        div.addClass("col-lg-4 col-md-6 mb-4");
	div.html(
                 "<div class='card h-100'>"+
               "<img class='card-img-top' src="+plato.imagen+" alt="+""+">"+
                "<div class='card-body'>"+
                "<h4 class='card-title'>"+plato.nombre+"</h4>"+
                "<h5>"+"¢"+plato.precio+"</h5>"+
                "<p class='card-text'>"+plato.detalle+"</p>"+
              "</div><button id='deta' type='button' class='btn-dark'>Agregar</button>"+
              "</div>"
               );  
        div.find("#deta").on("click",()=>{show(plato);});
	listado.append(div);         
  } 
  
  function show(plato){
        limpiar();
        $('#Dimg').attr("src",plato.imagen);
        $('#Dnombre').append(plato.nombre);
        $('#Ddetalle').append(plato.detalle);
        CargarAdicionales(plato);
        $('#menos').on("click",()=>{CatidadP(0,plato.precio);});
        $('#cantidad').on("keyup",()=>{precio(plato.precio);});
        $('#mas').on("click",()=>{CatidadP(1,plato.precio);});
        $('#AddOrden').on("click",()=>{ObtenerDatosOrden(plato);});
        $('#totalP').val(plato.precio);
        $('#totalP').append(plato.precio);
        $('#add-modal').modal('show');
  }

  
  function limpiar(){
       $('#Dnombre').empty();
       $('#Ddetalle').empty();
       $('#totalP').empty();
       $('#cantidad').val(1);
       $('#mas').off("click");
       $('#menos').off("click");
       $('#cantidad').off("keyup");
  }
  
  function CatidadP(n,p){
     var c = $('#cantidad').val();
     if(n)c++;
     if(!n && c>1)c--;
     $('#cantidad').val(c);
     var t = p*c;
     $('#totalP').empty();
     $('#totalP').append(t);
     $('#totalP').val(t);
  }
  
  function precio(p){
    var c = $('#cantidad').val();  
    var t = p*c;
    $('#totalP').empty();
    $('#totalP').append(t); 
    $('#totalP').val(t);
  }
  
  function sumarAdicional(p){
      var c = $('#totalP').val();
      var t = parseInt(c)+ parseInt(p);
     $('#totalP').empty();
     $('#totalP').append(t);
     $('#totalP').val(t);
  }
   function restarAdicional(p){
      var c = $('#totalP').val();
      var t = parseInt(c)- parseInt(p);
     $('#totalP').empty();
     $('#totalP').append(t);
      $('#totalP').val(t);
  }
  
  
  function CargarAdicionales(plato){
       listAdicionales(plato.adicionales); 
  }
  function listAdicionales(Adicionales){
      var listado=$("#menu-options");
      listado.html("");
      Adicionales.forEach((a)=>{rowAD(listado,a);});
       $('input[type="checkbox"]').click(function(){
            if($(this).is(":checked")){
               sumarAdicional($(this).val());
            }
            else if($(this).is(":not(:checked)")){
               restarAdicional($(this).val());
              
            }
      });

  }
  
  function rowAD(listado,a){  
       var h5 =$("<h5/>");
       h5.html(a.nombre);
       listado.append(h5);   
      if(!a.tipo)a.listAdicionales.forEach((b)=>{chekbox(listado,b);});
      if(a.tipo)a.listAdicionales.forEach((b)=>{radio(listado,b);});
      var h5 =$("<h5/>");
      listado.append(h5); 
  }
  
  function chekbox(listado,b){
  var div =$("<div/>");
   div.html(
   "<input id='"+b.id+"' type='checkbox' class='form-check-input'"+
    "value='"+b.precio+"'"+
    "<label class='form-check-label' for='materialChecked2'>"+b.detalle+"     ¢"+
    b.precio+"</label>"
    );
   div.addClass("form-check");
   listado.append(div);         
  }
  
  function radio(listado,b){
     var div =$("<div/>");
   div.html(
   "<input id='"+b.id+"' class='form-check-input' type='radio' name='exampleRadios'"+
   "id='exampleRadios2' value='option2'>"+
   "<label class='form-check-label' for='exampleRadios2'>"+b.detalle+"</label>"
    );
   div.addClass("form-check");
   listado.append(div);   
  }
  
  
  
