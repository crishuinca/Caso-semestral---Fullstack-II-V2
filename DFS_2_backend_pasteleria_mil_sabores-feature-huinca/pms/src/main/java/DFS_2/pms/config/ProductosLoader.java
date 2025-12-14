package DFS_2.pms.config;

import DFS_2.pms.entity.producto;
import DFS_2.pms.repository.productoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@org.springframework.core.annotation.Order(3) // Se ejecuta después del UsuarioAdminLoader
public class ProductosLoader implements CommandLineRunner {

    @Autowired
    private productoRepositorio productoRepo;

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya hay productos en la base de datos
        if (productoRepo.count() > 0) {
            System.out.println("=== La base de datos ya contiene productos. No se precargarán datos. ===");
            return;
        }

        System.out.println("=== Precargando productos en la base de datos... ===");

        List<producto> productos = Arrays.asList(
            crearProducto("TC001", "Torta Cuadrada de Chocolate", 
                "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
                "Tortas Cuadradas", 45000, "/img/TC001.png", 15, 3, 0),
            
            crearProducto("TC002", "Torta Cuadrada de Frutas",
                "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
                "Tortas Cuadradas", 50000, "/img/TC002.jpg", 15, 3, 0),
            
            crearProducto("TT001", "Torta Circular de Vainilla",
                "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
                "Tortas Circulares", 40000, "/img/TT001.png", 15, 3, 0),
            
            crearProducto("TT002", "Torta Circular de Manjar",
                "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
                "Tortas Circulares", 42000, "/img/TT002.png", 15, 3, 0),
            
            crearProducto("PI001", "Mousse de Chocolate",
                "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
                "Postres Individuales", 5000, "/img/PI001.jpg", 15, 3, 0),
            
            crearProducto("PI002", "Tiramisú Clásico",
                "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
                "Postres Individuales", 5500, "/img/PI002.png", 15, 3, 0),
            
            crearProducto("PSA001", "Torta Sin Azúcar de Naranja",
                "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
                "Productos Sin Azúcar", 48000, "/img/PSA001.png", 15, 3, 0),
            
            crearProducto("PSA002", "Cheesecake Sin Azúcar",
                "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
                "Productos Sin Azúcar", 47000, "/img/PSA002.png", 15, 3, 0),
            
            crearProducto("PT001", "Empanada de Manzana",
                "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
                "Pastelería Tradicional", 3000, "/img/PT001.jpg", 15, 3, 0),
            
            crearProducto("PT002", "Tarta de Santiago",
                "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.",
                "Pastelería Tradicional", 6000, "/img/PT002.jpg", 15, 3, 0),
            
            crearProducto("PG001", "Brownie Sin Gluten",
                "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
                "Productos Sin Gluten", 4000, "/img/PG001.jpg", 15, 3, 0),
            
            crearProducto("PG002", "Pan Sin Gluten",
                "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
                "Productos Sin Gluten", 3500, "/img/PG002.jpg", 15, 3, 0),
            
            crearProducto("PV001", "Torta Vegana de Chocolate",
                "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
                "Productos Vegana", 50000, "/img/PV001.jpg", 15, 3, 0),
            
            crearProducto("PV002", "Galletas Veganas de Avena",
                "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
                "Productos Vegana", 4500, "/img/PV002.jpg", 15, 3, 0),
            
            crearProducto("TE001", "Torta Especial de Cumpleaños",
                "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
                "Tortas Especiales", 55000, "/img/TE001.jpg", 15, 3, 0),
            
            crearProducto("TE002", "Torta Especial de Boda",
                "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
                "Tortas Especiales", 60000, "/img/TE002.png", 15, 3, 0)
        );

        productoRepo.saveAll(productos);
        System.out.println("=== " + productos.size() + " productos precargados exitosamente ===");
    }

    private producto crearProducto(String codigo, String nombre, String descripcion, 
                                   String categoria, int precio, String imagen, 
                                   int stock, int stockCritico, int precioOferta) {
        producto p = new producto();
        p.setP_codigo(codigo);
        p.setP_nombre(nombre);
        p.setP_descripcion(descripcion);
        p.setP_categoria(categoria);
        p.setP_precio(precio);
        p.setP_imagen(imagen);
        p.setP_stock(stock);
        p.setP_stock_critico(stockCritico);
        p.setP_precio_oferta(precioOferta);
        return p;
    }
}
