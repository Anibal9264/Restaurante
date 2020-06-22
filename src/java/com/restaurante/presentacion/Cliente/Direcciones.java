
package com.restaurante.presentacion.Cliente;

import com.restaurante.logic.Direccion;
import com.restaurante.logic.Model;
import com.restaurante.logic.Persona;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("/direccion")
public class Direcciones {
  @Context
    HttpServletRequest request;
  
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces({MediaType.APPLICATION_JSON})    
    public Persona add(Direccion d) {
        HttpSession session = request.getSession(true);
        Persona p = (Persona) session.getAttribute("usuario");
        try {
            d.setPersona_correo(p.getCorreo());
            Model.instance().addDireccion(d);
            return Model.instance().get(p);
        } catch (Exception ex) {
            throw new NotAcceptableException(); 
        }
    }
    
    
    
}
