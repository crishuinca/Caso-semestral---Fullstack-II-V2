package DFS_2.pms.config;

import DFS_2.pms.entity.categoria;
import DFS_2.pms.repository.categoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@org.springframework.core.annotation.Order(1) // Se ejecuta antes del ProductosLoader
public class CategoriasLoader implements CommandLineRunner {

    @Autowired
    private categoriaRepositorio categoriaRepo;

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya hay categorías en la base de datos
        if (categoriaRepo.count() > 0) {
            System.out.println("=== La base de datos ya contiene categorías. No se precargarán datos. ===");
            return;
        }

        System.out.println("=== Precargando categorías en la base de datos... ===");

        List<categoria> categorias = Arrays.asList(
            crearCategoria("Tortas Cuadradas"),
            crearCategoria("Tortas Circulares"),
            crearCategoria("Postres Individuales"),
            crearCategoria("Productos Sin Azúcar"),
            crearCategoria("Pastelería Tradicional"),
            crearCategoria("Productos Sin Gluten"),
            crearCategoria("Productos Veganos"),
            crearCategoria("Tortas Especiales")
        );

        categoriaRepo.saveAll(categorias);
        System.out.println("=== " + categorias.size() + " categorías precargadas exitosamente ===");
    }

    private categoria crearCategoria(String nombre) {
        categoria c = new categoria();
        c.setC_categoria(nombre);
        return c;
    }
}
