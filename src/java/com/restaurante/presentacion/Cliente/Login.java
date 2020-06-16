
package com.restaurante.presentacion.Cliente;
import com.restaurante.logic.Model;
import com.restaurante.logic.Persona;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("/login")
public class Login {
    
    @Context
    HttpServletRequest request;
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)    
    public Persona login(Persona cliente) {  
        Persona logged=null;
        try {
            logged=Model.instance().get(cliente);
         
            if(!logged.getContraseña().equals(cliente.getContraseña())){
                throw new Exception("Clave incorrecta");
            }
            HttpSession session = request.getSession(true);
            session.setAttribute("persona",logged);
            logged.setContraseña("");
            
            return logged;
        } catch (Exception ex) {
            throw new NotFoundException();
        }  
    }
    
    @POST
    @Path("/get")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)    
    public Persona Get(Persona cliente) {  
        Persona logged=null;
        try {
            logged=Model.instance().get(cliente);
            logged.setContraseña("");
            return logged;
        } catch (Exception ex) {
            throw new NotFoundException();
        }  
    }
    
    
    
    
    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON) 
    public Persona AddPersona(Persona cliente) {
      Persona logged=null;
       try {
            Model.instance().addPersona(cliente);
            logged=Model.instance().get(cliente);
            HttpSession session = request.getSession(true);
            session.setAttribute("persona",logged);
            logged.setContraseña("");
            return logged;
        } catch (Exception ex) {
            throw new NotFoundException();
        }  
    }
    
    @DELETE 
    public void logout() {  
        HttpSession session = request.getSession(true);
        session.removeAttribute("persona");           
        session.invalidate();
    }
    
   
    
    
    
}
