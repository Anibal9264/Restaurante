 function loaded(){
    $('#add-modal').load("detalles.html");
    $('#add-modal2').load("Direcciones.html");
    GetCategorias();
 }
$(loaded);

$(window).ready(function(){
     if(sessionStorage.getItem('orden')){
        CargarPlatosOrden();
     }else{
      sessionStorage.setItem('orden',JSON.stringify(OrdenRender()));
     }

     
     if(sessionStorage.getItem('cliente')){
        CargarDatosCliente();
     }else{
         quitarDatos();
     }
     
     if(sessionStorage.getItem('categoria')){GetListPlatos(sessionStorage.getItem('categoria'));}
     
});

$(window).unload(function(){
     localStorage.clear();
});

function CargarDatosCliente(){
     var cliente = $.parseJSON(sessionStorage.getItem('cliente'));
     var nom=$("#Login");
     nom.html(cliente.nombre+" "+cliente.apellidos);
     $('#Logout').removeClass("hide");
     $('#Login').attr("href","#");
}

function quitarDatos(){
     $('#Logout').addClass("hide");
     $("#Login").html("Login");
     $('#Login').attr("href","/Restaurante/com/Cliente/login/view.html");
}


