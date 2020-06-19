package com.restaurante.logic;
import com.restaurante.data.Dao;
import java.util.ArrayList;
import java.util.List;

public class Model {
  private static Model uniqueInstance;
 
  
     Dao base;
    public Model(){
      base = new Dao();
    }
    public static Model instance(){
        if (uniqueInstance == null){
            uniqueInstance = new Model();
        }
        return uniqueInstance;
    }

    public List<Categoria> getCategorias() {
      try {
          return base.ListaCategoria();
      } catch (Exception ex) {
          return new ArrayList();
      }
    }

    public List<Plato> getPlatos(int id) {
      try {
          return base.ListaPlatoxCategoria(id);
      } catch (Exception ex) {
          return new ArrayList();
      }
    }

    public List<Adicionales> getAdicionales(int id) {
    try {
          return base.ListaAdicionales(id);
      } catch (Exception ex) {
          return new ArrayList();
      }
    }

    public void addOrden(Orden o) throws Exception {
      base.OrdenAdd(o);
    }

    public Persona get(Persona cliente) throws Exception {
     return base.getPersona(cliente.getCorreo());
    }

    public void addPersona(Persona cliente) throws Exception {
       base.PersonaAdd(cliente);
    }

    public void addDireccion(Direccion d) throws Exception {
        base.DireccionAdd(d);
    }

    public List<Orden> getOrdenes(Persona logged) throws Exception {
        return base.ListaOrdenes(logged);
    }

    public void addPlato(Plato plato) throws Exception {
     base.PlatoAdd(plato);
    }

    public List<Plato> getPlatos() throws Exception {
     return base.ListaPlatos();
   }

    public void addCategoria(Categoria categoria) throws Exception {
      base.CategoriaAdd(categoria);
    }

    public void addAdicional(Adicional adicional) throws Exception {
       base.AdicionalAdd(adicional);
    }

    public void addAdicionales(Adicionales adicionales) throws Exception {
       base.AdicionalesAdd(adicionales);
    }

    public List<Adicional> getadicionalL() throws Exception {
      return base.ListaAdicionalL();
    }

    public List<Adicionales> getadicionalesL() throws Exception {
      return base.ListaAdicionalesL();
    }
    
  
    
  
    
}
