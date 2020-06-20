
 function loaded(){
  $("#loginAd").on("click",()=>{LoginA();});   
 } 
$(loaded);

function LoginA(){
   
   persona={
     correo:$("#inputEmail").val().toLowerCase(),
     contraseña:$("#inputPassword").val()
   };
      if (persona.correo.length === 0 ||persona.contraseña.length === 0){   
        errorMessage(999,$("#loginErrorDiv"));
    } else {
   $.ajax({type: "POST", url:"api/login",
                data: JSON.stringify(persona),contentType: "application/json"})
      .then((persona)=>{persona.correo="";CargarA(persona);},
             (error)=>{errorMessage(error.status,$("#loginErrorDiv"));});  
    }
}

function CargarA(persona){
  sessionStorage.setItem('Admin',JSON.stringify(persona));
  window.location.href = "index2.html";
}

function Logout(){
   
   $.ajax({type: "DELETE",url:"api/login" })
   .then( ()=>{logoutSuccessA();},
   (error)=>{ errorMessage(error.status,$("#loginErrorDiv"));}); 
}
function logoutSuccessA(){ 
  sessionStorage.removeItem('Admin');
  window.location.href = "login.html";
 }

function errorMessage(status,place){
    error=status;
    $("#msjerror").modal("show");
            switch(status){
                case 401: error= "Usuario no registrado"; break;
                case 403: case 405: error="Usuario no autorizado"; break;                
                case 404: error= "Contraseña o Usuario no valido"; break;
                case 999: error= "Campo en blanco"; break;
            };            
            place.html('<div class="alert alert-danger fade show">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button><h6 class="alert-heading">Error!: '+error+'</h6></div>');
            return;     
}

