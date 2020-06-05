
package com.restaurante.logic;


public class Admin extends Persona{

    public Admin(String nombre, String apellidos, String correo, String contraseña, String telefono, boolean isAdmin) {
        super(nombre, apellidos, correo, contraseña, telefono, isAdmin);
    }

    public Admin() {
        super();
    }
    
}
