package DFS_2.pms.controller;

import DFS_2.pms.entity.categoria;
import DFS_2.pms.service.categoriaServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Categorías V1", description = "API v1 para gestión de categorías de productos")
public class categoriaControlador {
    
    @Autowired
    private categoriaServicio servicio;
    
    @Operation(summary = "Crear una nueva categoría", description = "Registra una nueva categoría de productos")
    @PostMapping("/addCategoria")
    public categoria c_guardarCategoria(@RequestBody categoria c){
        return servicio.guardarCategoria(c);
    }
    @Operation(summary = "Listar todas las categorías", description = "Obtiene la lista completa de categorías disponibles")
    @GetMapping("/categorias")
    public List<categoria> c_obtenerCategorias(){
        return servicio.obtenerCategorias();
    }
    @GetMapping("/categoriaByID/{c_id}")
    public categoria c_obtenerCategoriaID(@PathVariable int c_id){
        return servicio.obtenerCategoriaID(c_id);
    }
    @PutMapping("/modificarCategoria")
    public categoria c_modificarCategoria(@RequestBody categoria c){
        return servicio.modificarCategoria(c);
    }
    @DeleteMapping("/eliminarCategoria/{c_id}")
    public String c_borrarCategoria(@PathVariable int c_id){
        return servicio.borrarCategoria(c_id);
    }
}
