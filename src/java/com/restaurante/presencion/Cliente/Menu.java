
package com.restaurante.presencion.Cliente;

import com.restaurante.logic.Adicionales;
import com.restaurante.logic.Model;
import com.restaurante.logic.Plato;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("/menu")
public class Menu {

   @GET
   @Produces({MediaType.APPLICATION_JSON})
   public List<Plato> list(@QueryParam("id") String id) {  
      return Model.instance().getPlatos(Integer.parseInt(id));
   }
   
//   @GET
//   @Produces({MediaType.APPLICATION_JSON})
//   public List<Adicionales> listA(@QueryParam("idP") int id) {  
//      return Model.instance().getAdicionales(id);
//   }
   
}
