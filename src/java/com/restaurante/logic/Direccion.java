
package com.restaurante.logic;

public class Direccion {
  private String provincia;
  private String canton;
  private String distrito;
  private String exacta;

    public Direccion(String provincia, String canton, String distrito, String exacta) {
        this.provincia = provincia;
        this.canton = canton;
        this.distrito = distrito;
        this.exacta = exacta;
    }
  
   public Direccion() {
        this.provincia = "";
        this.canton = "";
        this.distrito = "";
        this.exacta = "";
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