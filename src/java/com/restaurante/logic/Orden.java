
package com.restaurante.logic;

import java.util.ArrayList;
import java.util.List;


public class Orden {
   private int id;
   private Double total;
   private boolean Entrega_recoge; // true es entrega y false es recoje
   private String fecha;
   private int estado; // 1 : recivida o enviada 2: Preparacion 3: Lista
   private Cliente cliente;
   private Direccion direccion;
   private List<Plato> platos;
 
    public Orden(int id, Cliente cliente, List<Plato> platos, Double total, boolean Entrega_recoge, String fecha, Direccion direccion, int estado) {
        this.id = id;
        this.cliente = cliente;
        this.platos = platos;
        this.total = total;
        this.Entrega_recoge = Entrega_recoge;
        this.fecha = fecha;
        this.direccion = direccion;
        this.estado = estado;
    }

    public Orden() {
        this.id = 0;
        this.cliente = new Cliente();
        this.platos = new ArrayList();
        this.total = 0.0;
        this.Entrega_recoge = false;
        this.fecha = "";
        this.direccion = new Direccion();
        this.estado = 0;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<Plato> getPlatos() {
        return platos;
    }

    public void setPlatos(List<Plato> platos) {
        this.platos = platos;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public boolean isEntrega_recoge() {
        return Entrega_recoge;
    }

    public void setEntrega_recoge(boolean metodo) {
        this.Entrega_recoge = metodo;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public Direccion getDireccion() {
        return direccion;
    }

    public void setDireccion(Direccion direccion) {
        this.direccion = direccion;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

     public int toEntregaRecoge() {
         if(Entrega_recoge) return 1;
        return 0;
    }


}
