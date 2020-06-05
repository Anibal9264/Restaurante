
package com.restaurante.presencion.Cliente;
import com.restaurante.logic.Categoria;
import com.restaurante.logic.Model;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
@Path("/categorias")
public class Categorias {
  
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Categoria> list() { 
       return Model.instance().getCategorias();
   }

}

