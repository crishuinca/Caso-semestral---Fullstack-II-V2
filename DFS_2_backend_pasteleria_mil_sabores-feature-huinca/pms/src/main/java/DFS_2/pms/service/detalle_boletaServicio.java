package DFS_2.pms.service;

import DFS_2.pms.entity.detalle_boleta;
import DFS_2.pms.repository.detalle_boletaRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class detalle_boletaServicio {
    
    @Autowired
    private detalle_boletaRepositorio repositorio;
    
    //CRUD
    @SuppressWarnings("null")
    public detalle_boleta guardarDetalle_boleta(detalle_boleta db){
        return repositorio.save(db);
    }
    public List<detalle_boleta> obtenerDetalle_boletas(){
        return repositorio.findAll();
    }
    public detalle_boleta obtenerDetalle_boletaID(int id_db){
        return repositorio.findById(id_db).orElse(null);
    }
    public String borrarDetalle_boleta(int id_db){
        repositorio.deleteById(id_db);
        return "Detalle de boleta eliminado correctamente.";
    }
    
    @SuppressWarnings("null")
    public detalle_boleta modificarDetalle_boleta(detalle_boleta db){
        return repositorio.save(db);
    }
}
