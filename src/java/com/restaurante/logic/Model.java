package com.restaurante.logic;

import com.restaurante.data.Dao;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

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
    
  
    
  
    
}
