package DFS_2.pms.config;

import DFS_2.pms.entity.usuario;
import DFS_2.pms.repository.usuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@Order(3) // Se ejecuta después de UsuarioAdminLoader
public class UsuarioVendedorLoader implements CommandLineRunner {

    @Autowired
    private usuarioRepositorio usuarioRepo;

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya existe el usuario vendedor
        boolean vendedorExists = usuarioRepo.findAll().stream()
            .anyMatch(u -> "vendedor@gmail.com".equals(u.getU_correo()));
        
        if (vendedorExists) {
            System.out.println("=== Usuario vendedor ya existe en la base de datos ===");
            return;
        }

        System.out.println("=== Creando usuario vendedor por defecto... ===");

        usuario vendedor = new usuario();
        vendedor.setU_nombre("Vendedor");
        vendedor.setU_apellido("Prueba");
        vendedor.setU_correo("vendedor@gmail.com");
        vendedor.setU_contrasenia("123"); // Misma contraseña que el admin
        vendedor.setU_direccion("Tienda Principal");
        vendedor.setU_f_nacimiento("");
        vendedor.setU_f_registro(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        vendedor.setU_rol("VENDEDOR");
        vendedor.setU_comuna("Santiago");
        vendedor.setU_region("Región Metropolitana");
        vendedor.setU_descuento_10(false);
        vendedor.setU_descuento_50(false);
        vendedor.setU_regalo_cumpleanios(false);

        usuarioRepo.save(vendedor);
        System.out.println("=== Usuario vendedor creado exitosamente ===");
        System.out.println("=== Credenciales: vendedor@gmail.com / 123 ===");
    }
}
