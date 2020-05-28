
package com.restaurante.logic;

import java.util.ArrayList;
import java.util.List;

public class Ventas {
  List<Orden> ordenes;

    public Ventas(List<Orden> ordenes) {
        this.ordenes = ordenes;
    }
   public Ventas() {
        this.ordenes = new ArrayList();
    }

    public List<Orden> getOrdenes() {
        return ordenes;
    }

    public void setOrdenes(List<Orden> ordenes) {
        this.ordenes = ordenes;
    }
   
   
}
