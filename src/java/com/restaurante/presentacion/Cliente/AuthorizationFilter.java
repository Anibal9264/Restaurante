
package com.restaurante.presentacion.Cliente;

import com.restaurante.logic.Persona;
import java.io.IOException;
import java.util.HashMap;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter(filterName = "AuthorizationFilter", urlPatterns = {"/*"})
public class AuthorizationFilter implements Filter {
    HashMap<String,String> protectedResources;

    public AuthorizationFilter(){
        protectedResources = new HashMap<>();
        //pagina principal-------------------------------------------------------
        protectedResources.put("POST /Restaurante/api/realizar/", "ADM-CLI");
        protectedResources.put("DELETE /Restaurante/api/login/", "ADM-CLI");  
        protectedResources.put("GET /Restaurante/api/historial/", "ADM-CLI");
        protectedResources.put("POST /Restaurante/api/direccion/", "ADM-CLI");
        
        //pagina Admin---
        protectedResources.put("POST /Restaurante/api/admin/plato/", "ADM");
        protectedResources.put("POST /Restaurante/api/admin/categoria/", "ADM");
        protectedResources.put("POST /Restaurante/api/admin/adicional/", "ADM");
        protectedResources.put("POST /Restaurante/api/admin/adicionales/", "ADM");
        
        protectedResources.put("GET /Restaurante/api/admin/plato/", "ADM");
        protectedResources.put("GET /Restaurante/api/admin/adicional/", "ADM");
        protectedResources.put("GET /Restaurante/api/admin/adicionales/", "ADM");
        protectedResources.put("GET /Restaurante/api/admin/ordenes/", "ADM");
        protectedResources.put("GET /Restaurante/api/admin/ordenesDia/", "ADM");
        protectedResources.put("GET /Restaurante/api/admin/ordenesMes/", "ADM");
        protectedResources.put("GET /Restaurante/api/admin/ordenesAño/", "ADM");
        protectedResources.put("GET /Restaurante/index2.html", "ADM");    
    }
    public void doFilter(ServletRequest request, ServletResponse response,FilterChain chain) throws IOException, ServletException {
        try {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            HttpServletResponse httpResponse = (HttpServletResponse) response;
            HttpSession session = httpRequest.getSession();
            String resource=httpRequest.getMethod()+" "+httpRequest.getRequestURI();
            String roles = getRoles(resource);
            if (roles==null) chain.doFilter(request, response);
            else{
                Persona usuario= (Persona) session.getAttribute("usuario");
                if(usuario==null) httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                else
                    if(!roles.contains(usuario.getRol()))
                        httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    else
                       chain.doFilter(request, response); 
            }
        } catch (Throwable t) {
            System.out.println("ERROR");
        }
    }
    
    String getRoles(String resource){
        for(String k: protectedResources.keySet()){
            if(resource.startsWith(k)) return  protectedResources.get(k);
        }
        return null;
    }
    
    public void init(FilterConfig fConfig) throws ServletException {
    }
    
    public void destroy(){ 
    }
}