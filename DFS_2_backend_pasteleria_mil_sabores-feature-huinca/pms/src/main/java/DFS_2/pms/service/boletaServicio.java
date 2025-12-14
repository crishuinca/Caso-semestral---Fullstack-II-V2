package DFS_2.pms.service;


import DFS_2.pms.entity.boleta;
import DFS_2.pms.repository.boletaRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class boletaServicio {
    
    @Autowired
    private boletaRepositorio repositorio;
    
    //CRUD
    @SuppressWarnings("null")
    public boleta guardarBoleta(boleta b){
        return repositorio.save(b);
    }
    public List<boleta> obtenerBoletas(){
        return repositorio.findAll();
    }
    public boleta obtenerBoletaID(int id_b){
        return repositorio.findById(id_b).orElse(null);
    }
    public String borrarBoleta(int id_b){
        repositorio.deleteById(id_b);
        return "Boleta eliminada correctamente.";
    }
}
