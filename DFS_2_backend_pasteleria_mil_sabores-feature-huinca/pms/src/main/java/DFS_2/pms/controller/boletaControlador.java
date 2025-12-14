package DFS_2.pms.controller;

import DFS_2.pms.entity.boleta;
import DFS_2.pms.service.boletaServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Boletas V1", description = "API v1 para gestión de boletas de venta")
public class boletaControlador {
    
    @Autowired
    private boletaServicio servicio;
    
    @Operation(summary = "Crear una nueva boleta", description = "Registra una nueva boleta de venta")
    @PostMapping("/addBoleta")
    public boleta c_guardarBoleta(@RequestBody boleta b){
        return servicio.guardarBoleta(b);
    }
    @Operation(summary = "Listar todas las boletas", description = "Obtiene la lista completa de boletas registradas")
    @GetMapping("/boletas")
    public List<boleta> c_obtenerBoletas(){
        return servicio.obtenerBoletas();
    }
    @GetMapping("/boletasByID/{b_id}")
    public boleta c_obtenerBoletaID(@PathVariable int b_id){
        return servicio.obtenerBoletaID(b_id);
    }
    @DeleteMapping("/eliminarBoleta/{b_id}")
    public String c_borrarBoleta(@PathVariable int b_id){
        return servicio.borrarBoleta(b_id);
    }
}
