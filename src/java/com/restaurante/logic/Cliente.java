
package com.restaurante.logic;

import java.util.ArrayList;
import java.util.List;


public class Cliente extends Persona {
  private List<Direccion> direcciones; 

    public Cliente(String nombre, String apellidos, String correo, String contraseña, String telefono, List direcciones) {
        super(nombre, apellidos, correo, contraseña, telefono);
        this.direcciones = direcciones;
    }

    public Cliente() {
        super();
        this.direcciones = new ArrayList();
    }

    public List<Direccion> getDirecciones() {
        return direcciones;
    }

    public void setDirecciones(List<Direccion> direcciones) {
        this.direcciones = direcciones;
    }
  
  
}
