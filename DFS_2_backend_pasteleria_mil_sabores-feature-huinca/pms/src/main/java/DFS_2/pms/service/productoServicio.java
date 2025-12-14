package DFS_2.pms.service;

import DFS_2.pms.entity.producto;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import DFS_2.pms.repository.productoRepositorio;

@Service
public class productoServicio {
    
    @Autowired
    private productoRepositorio repositorio;
    
    //CRUD
    @SuppressWarnings("null")
    public producto guardadProducto(producto p){
        return repositorio.save(p);
    }
    @SuppressWarnings("null")
    public List<producto> guardarProductos(List<producto> ls_p){
        return repositorio.saveAll(ls_p);
    }
    public List<producto> obtenerProductos(){
        return repositorio.findAll();
    }
    public producto obtenerProductoID(int id_p){
        return repositorio.findById(id_p).orElse(null);
    }
    /*
    public producto obtenerProductoCategoria(String categoria_p){
        return repositorio.findByCategoria(categoria_p);
    }
    public producto obtenerProductoNombre(String nombre_p){
        return repositorio.findByNombre(nombre_p);
    }
    */
    public producto modificarProducto(producto p_mod){
        producto prod_modificado = repositorio.findById(p_mod.getP_id()).orElse(null);
            prod_modificado.setP_codigo(p_mod.getP_codigo());
            prod_modificado.setP_nombre(p_mod.getP_nombre());
            prod_modificado.setP_categoria(p_mod.getP_categoria());
            prod_modificado.setP_descripcion(p_mod.getP_descripcion());
            prod_modificado.setP_precio(p_mod.getP_precio());
            prod_modificado.setP_stock(p_mod.getP_stock());
            prod_modificado.setP_stock_critico(p_mod.getP_stock_critico());
            prod_modificado.setP_imagen(p_mod.getP_imagen());
            prod_modificado.setP_precio_oferta(p_mod.getP_precio_oferta());
        return repositorio.save(prod_modificado);
    }
    public String borrarProducto(int id_p){
        repositorio.deleteById(id_p);
        return "Producto eliminado correctamente.";
    }
}
