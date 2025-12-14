package DFS_2.pms.controller;


import DFS_2.pms.entity.detalle_boleta;
import DFS_2.pms.service.detalle_boletaServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Detalle Boletas V1", description = "API v1 para gestión de detalles de boletas")
public class detalle_boletaControlador {
    
    @Autowired
    private detalle_boletaServicio servicio;
    
    @Operation(summary = "Crear detalle de boleta", description = "Registra un nuevo detalle asociado a una boleta")
    @PostMapping("/addDetalle_boleta")
    public detalle_boleta c_guardarProducto(@RequestBody detalle_boleta db){
        return servicio.guardarDetalle_boleta(db);
    }@GetMapping("/detalle_boletas")
    public List<detalle_boleta> c_obtenerDetalle_boletas(){
        return servicio.obtenerDetalle_boletas();
    }
    @GetMapping("/detalle_boletaByID/{db_id}")
    public detalle_boleta c_obtenerDetalle_boletaID(@PathVariable int db_id){
        return servicio.obtenerDetalle_boletaID(db_id);
    }
    
    @Operation(summary = "Modificar detalle de boleta", description = "Actualiza la información de un detalle de boleta existente")
    @PutMapping("/modificarDetalle_boleta")
    public detalle_boleta c_modificarDetalle_boleta(@RequestBody detalle_boleta db){
        return servicio.modificarDetalle_boleta(db);
    }
    
    @DeleteMapping("/eliminarDetalle_boleta/{db_id}")
    public String c_borrarDetalle_boleta(@PathVariable int db_id){
        return servicio.borrarDetalle_boleta(db_id);
    }
}
