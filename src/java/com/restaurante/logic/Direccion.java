
package com.restaurante.logic;

public class Direccion {
  private int id;
  private String provincia;
  private String canton;
  private String distrito;
  private String exacta;
  private String Persona_correo;

    public Direccion(int id, String provincia, String canton, String distrito, String exacta, String Persona_correo) {
        this.id = id;
        this.provincia = provincia;
        this.canton = canton;
        this.distrito = distrito;
        this.exacta = exacta;
        this.Persona_correo = Persona_correo;
    }

  
   public Direccion() {
       this.id = 0;
        this.provincia = "";
        this.canton = "";
        this.distrito = "";
        this.exacta = "";
        this.Persona_correo = "";
    }

    public String getPersona_correo() {
        return Persona_correo;
    }

    public void setPersona_correo(String Persona_correo) {
        this.Persona_correo = Persona_correo;
    }

   
   
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

   
   
    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getCanton() {
        return canton;
    }

    public void setCanton(String canton) {
        this.canton = canton;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getExacta() {
        return exacta;
    }

    public void setExacta(String exacta) {
        this.exacta = exacta;
    }
   
   
   
}
