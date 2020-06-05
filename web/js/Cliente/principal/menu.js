
function GetListPlatos(ID){
    $.ajax({type: "GET", url:"/Restaurante/api/menu?id="+ID,
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
        //CargarAdicionales(plato);
        $('#menos').on("click",()=>{CatidadP(0,plato.precio);});
        $('#cantidad').on("keyup",()=>{precio(plato.precio);});
        $('#mas').on("click",()=>{CatidadP(1,plato.precio);});
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
  }
  
  function precio(p){
    var c = $('#cantidad').val();  
    var t = p*c;
    $('#totalP').empty();
    $('#totalP').append(t);  
  }
  
  
  function CargarAdicionales(plato){
    $.ajax({type: "GET", url:"/Restaurante/api/menu?idP="+plato.id,
         contentType: "application/json"})
      .then( (Adicionales)=>{listAdicionales(Adicionales);},
             (error)=>{ alert(errorMessage(error.status));});      
  }
  function listAdicionales(Adicionales){
      var listado=$("#menu-options");
      listado.html("");
      Adicionales.forEach((a)=>{rowAD(listado,p);});
  }