
package com.restaurante.presentacion.Cliente;

import com.restaurante.logic.Model;
import com.restaurante.logic.Orden;
import com.restaurante.logic.Persona;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
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
        logged = (Persona) session.getAttribute("persona");
        return Model.instance().getOrdenes(logged);  
    }
}
