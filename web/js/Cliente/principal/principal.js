 function loaded(){
    $('#Contenido').load("com/Cliente/principal/ini.html");
    $('#add-modal').load("com/Cliente/principal/detalles.html");
    $('#add-modal2').load("com/Cliente/principal/PyD.html");
    $('#direccion-modal').load("com/Cliente/principal/direccion.html");
    $('#modalRegistro').load("com/Cliente/principal/registro.html");
  
    setTimeout(
     function() 
     {
    $("#Login").on("click",()=>{cargarlogin();});
    $("#Logout").on("click",()=>{Logout();});
    $("#histo").on("click",()=>{Historialshow();});
    GetCategorias();
    ordenL();
     },500);
 }
$(loaded);

function ordenL(){
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
     
}

$(window).unload(function(){
     localStorage.clear();
});




