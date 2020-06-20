
package com.restaurante.presentacion.Cliente;

import com.restaurante.logic.Model;
import com.restaurante.logic.Orden;
import com.restaurante.logic.Persona;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;


@Path("/historial")
public class Historial {
    
    @Context
    HttpServletRequest request;
    
    @GET
    @Produces(MediaType.APPLICATION_JSON) 
    public List<Orden> Get (){
    Persona logged=null;
        HttpSession session = request.getSession(true);
        logged = (Persona) session.getAttribute("usuario");
        try {  
            return Model.instance().getOrdenes(logged);
        } catch (Exception ex) {
             throw new NotFoundException();
        }
    }
}
