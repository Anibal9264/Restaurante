
package com.restaurante.logic;

public class Persona {
 private String nombre;
 private String apellidos;
 private String correo;
 private String contraseña;
 private String telefono;

    public Persona(String nombre, String apellidos, String correo, String contraseña, String telefono) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.contraseña = contraseña;
        this.telefono = telefono;
    }
     public Persona() {
        this.nombre = "";
        this.apellidos = "";
        this.correo = "";
        this.contraseña = "";
        this.telefono = "";
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
 
 
 
 
 
}
