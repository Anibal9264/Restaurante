
 function loaded(){
  $("#login").on("click",()=>{Login();});
  $("#Logout").on("click",()=>{Logout();});
 }
$(loaded);


function Login(){
   if(!validar()) return; 
   persona={
     correo:$("#inputEmail").val().toLowerCase(),
     contraseña:$("#inputPassword").val()
   };
   $.ajax({type: "POST", url:"/Restaurante/api/login",
                data: JSON.stringify(persona),contentType: "application/json"})
      .then((persona)=>{CargarCliente(persona);},
             (error)=>{errorMessage(error.status,$("#loginErrorDiv"));});  
}

function CargarCliente(persona){
  persona.correo="";
  sessionStorage.setItem('cliente',JSON.stringify(persona));
  window.location.href = "/Restaurante/com/Cliente/principal/view.html";
}


function Logout(){
   $.ajax({type: "DELETE",url:"/Restaurante/api/login" })
   .then( ()=>{logoutSuccess();},
   (error)=>{ errorMessage(error.status,$("#loginErrorDiv"));}); 
}
function logoutSuccess(){
  sessionStorage.removeItem('cliente');
  window.location.href = "/Restaurante/com/Cliente/principal/view.html";
}

  function validar(){
    var error=false;
    $("#formulario input").removeClass("invalid");
    error |= $("#formulario input[type='email']")
            .filter( (i,e)=>{ return e.value=='';}).length>0;        
    $("#formulario input[type='email']")
            .filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    error |= $("#formulario input[type='password']")
            .filter( (i,e)=>{ return e.value=='';}).length>0;        
    $("#formulario input[type='password']")
            .filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    return !error;
  }
  
  
function errorMessage(status,place){
            error=status;
            switch(status){
                case 401: error= "Usuario no registrado"; break;
                case 403: case 405: error="Usuario no autorizado"; break;                
                case 404: error= "Contraseña o Usuario no valido"; break;
            };            
            place.html('<div class="alert alert-danger fade show">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button><h4 class="alert-heading">Error!</h4>'+error+'</div>');
            return;        
}