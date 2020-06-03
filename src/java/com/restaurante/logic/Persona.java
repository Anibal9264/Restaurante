
package com.restaurante.logic;

public class Persona {
 private String nombre;
 private String apellidos;
 private String correo;
 private String contraseña;
 private String telefono;
 private boolean isAdmin;

    public Persona(String nombre, String apellidos, String correo, String contraseña, String telefono,boolean isAdmin) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contraseña = contraseña;
        this.telefono = telefono;
        this.isAdmin = isAdmin;
    }
     public Persona() {
        this.nombre = "";
        this.apellidos = "";
        this.correo = "";
        this.contraseña = "";
        this.telefono = "";
        this.isAdmin = false;
    }

    public boolean isIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String toStringNcompleto() {
        return nombre+" "+apellidos;
    }
    
    public int toIsAdmin() {
        if(isAdmin) return 1;
        return 0;
    }
 
 
 
 
 
}
