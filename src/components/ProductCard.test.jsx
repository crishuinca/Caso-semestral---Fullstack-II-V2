import { render, screen, fireEvent } from "@testing-library/react"
import { beforeEach, vi } from "vitest"
import ProductCard from "./ProductCard"

const mockAgregarProducto = vi.fn()
vi.mock('../context/CarritoContext', () => ({
    useCarrito: () => ({
        agregarProducto: mockAgregarProducto
    })
}))

describe("Testing ProductCard", () => {

    const mockProducto = {
        prod_codigo: "P001",
        prod_nombre: "Torta de Chocolate",
        prod_categoria: "Postres",
        prod_desc: "Deliciosa torta de chocolate",
        prod_precio: 10000,
        prod_precio_oferta: 8000,
        prod_imagen: "https://via.placeholder.com/300x200",
        stock: 3
    }

    beforeEach(() => {
        localStorage.clear()
        vi.clearAllMocks()
    })
   
    it("ProductCARD PRUEBA_01: Muestra nombre, categoría y descripción del producto", () => {
        render(<ProductCard producto={mockProducto} />)
        expect(screen.getByText("Torta de Chocolate")).toBeInTheDocument()
        expect(screen.getByText("Postres")).toBeInTheDocument()
        expect(screen.getByText("Deliciosa torta de chocolate")).toBeInTheDocument()
    })
    
    it("ProductCARD PRUEBA_02: Muestra precio y precio en oferta si existe", () => {
        render(<ProductCard producto={mockProducto} />)
        expect(screen.getByText("$10.000")).toBeInTheDocument() 
        expect(screen.getByText("$8.000")).toBeInTheDocument()  
        expect(screen.getByText(/OFERTA/i)).toBeInTheDocument()
    })
    
    it("ProductCARD PRUEBA_03: Llama a agregarProducto al hacer click", () => {
        render(<ProductCard producto={mockProducto} />)
        const btn = screen.getByRole("button", { name: /agregar al carrito/i })
        fireEvent.click(btn)
        expect(mockAgregarProducto).toHaveBeenCalledWith("P001", 1, '', 8000)
    })
    
    it("ProductCARD PRUEBA_04: Muestra badge de stock crítico cuando stock es 3", () => {
        render(<ProductCard producto={mockProducto} />)
        expect(screen.getByText("Stock: 3")).toHaveClass("bg-warning")
    })
    
    it("ProductCARD PRUEBA_05: Muestra sin stock y deshabilita botón cuando stock = 0", () => {
        render(<ProductCard producto={{...mockProducto, stock: 0}} />)
        const btn = screen.getByRole("button", { name: /sin stock/i })
        expect(btn).toBeDisabled()
        expect(screen.getByText("Sin stock")).toBeInTheDocument()
    })
    
    it("ProductCARD PRUEBA_06: Actualiza stock desde localStorage", () => {
        localStorage.setItem('productosStock', JSON.stringify([{ prod_codigo: "P001", stock: 10 }]))
        render(<ProductCard producto={mockProducto} />)
        expect(screen.getByText("Stock: 10")).toBeInTheDocument()
    })

    it("ProductCARD PRUEBA_07: Cambia imagen a placeholder si hay error", () => {
        render(<ProductCard producto={{...mockProducto, prod_imagen: 'url_invalida'}} />)
        const img = screen.getByAltText("Torta de Chocolate")
        fireEvent.error(img)
        expect(img.src).toContain("via.placeholder.com")
    })
})