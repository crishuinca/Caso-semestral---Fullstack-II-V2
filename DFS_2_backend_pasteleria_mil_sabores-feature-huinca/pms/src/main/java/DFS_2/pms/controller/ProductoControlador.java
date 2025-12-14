package DFS_2.pms.controller;

import DFS_2.pms.entity.producto;
import DFS_2.pms.service.productoServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Productos V1", description = "API v1 para gestión de productos de la pastelería")
public class ProductoControlador {
    
    @Autowired
    private productoServicio servicio;
    
    @Operation(summary = "Crear un nuevo producto", description = "Crea un nuevo producto en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Producto creado exitosamente")
    })
    @PostMapping("/addProducto")
    public producto c_guardarProducto(@RequestBody producto p){
        return servicio.guardadProducto(p);
    }
    @Operation(summary = "Crear múltiples productos", description = "Crea varios productos en el sistema de una sola vez")
    @PostMapping("/addProductos")
    public List<producto> c_guardarProductos(@RequestBody List<producto> ls_p){
        return servicio.guardarProductos(ls_p);
    }
    
    @Operation(summary = "Listar todos los productos", description = "Obtiene la lista completa de productos disponibles")
    @GetMapping("/productos")
    public List<producto> c_obtenerProductos(){
        return servicio.obtenerProductos();
    }
    @Operation(summary = "Obtener producto por ID", description = "Busca un producto específico por su identificador")
    @GetMapping("/productoByID/{p_id}")
    public producto c_obtenerProductoID(@PathVariable int p_id){
        return servicio.obtenerProductoID(p_id);
    }
    /*
    @GetMapping("/productoByCategoria/{p_categoria}")
    public producto c_obtenerProductoCategoria(@PathVariable String p_categoria){
        return servicio.obtenerProductoCategoria(p_categoria);
    }
    @GetMapping("/productoByNombre/{p_nombre}")
    public producto c_obtenerProductoNombre(@PathVariable String p_nombre){
        return servicio.obtenerProductoNombre(p_nombre);
    }
    */
    @Operation(summary = "Modificar producto", description = "Actualiza la información de un producto existente")
    @PutMapping("/modificarProducto")
    public producto c_modificarProducto(@RequestBody producto p){
        return servicio.modificarProducto(p);
    }
    
    @Operation(summary = "Eliminar producto", description = "Elimina un producto del sistema")
    @DeleteMapping("/eliminarProducto/{p_id}")
    public String c_borrarProducto(@PathVariable int p_id){
        return servicio.borrarProducto(p_id);
    }
}
