function loaded(){
 viewGrafica();
$('#addPlato').on("click",()=>{viewNPlato();});
$('#view-Platos').on("click",()=>{viewPlatos();});
$('#addCategoria').on("click",()=>{viewNCategoria();});
$('#view-Categorias').on("click",()=>{viewCategorias();});
$('#addAdicionales').on("click",()=>{viewNAdicionales();});
$('#view-Adicionales').on("click",()=>{viewAdicionales();});
$('#addAdicional').on("click",()=>{viewNAdicional();});
$('#view-Adicional').on("click",()=>{viewAdicional();});
$('#view-Ordenes').on("click",()=>{Ordenesshow();});
 CargarDatosdelAdmin();
}
$(loaded);

function CargarDatosdelAdmin(){
     var admin = $.parseJSON(sessionStorage.getItem('Admin'));
     var nom=$("#nomb");
     nom.html(admin.nombre+" "+admin.apellidos);
     $('#Logout').on("click",()=>{Logout();});
}
  
