import { render, screen, fireEvent } from "@testing-library/react"
import { beforeEach, vi } from "vitest"
import CardBoletas from "./CardBoletas"

describe("Testing CardBoletas", () => {

    const mockBoleta = {
        n_boleta: "HBLT_1",
        comprador: {
            fecha_compra: "2025-10-28T12:00:00",
        },
        recibidor: {
            direccion_recibidor: "Calle Falsa 123"
        }
    }

    const mockProductos = [
        { nombre: "Torta Chocolate", cantidad: 2, precio: 5000 },
        { nombre: "Brownie", cantidad: 3, precio: 1000 }
    ]

    const mockRegresar = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("CardBOLETA PRUEBA_01: Muestra número de boleta, dirección y fecha de compra", () => {
        render(<CardBoletas brp={mockBoleta} prods={mockProductos} regresar={mockRegresar} />)

        expect(screen.getByText(/BOLETA N° - HBLT_1/i)).toBeInTheDocument()
        expect(screen.getByText("Calle Falsa 123")).toBeInTheDocument()

        expect(screen.getByText("2025-10-28")).toBeInTheDocument()
    })

    it("CardBOLETA PRUEBA_02: Muestra el total de la compra correctamente", () => {
        render(<CardBoletas brp={mockBoleta} prods={mockProductos} />)

        expect(screen.getByText("$13000")).toBeInTheDocument()
    })

    it("CardBOLETA PRUEBA_03: Muestra nombre, cantidad y subtotal de cada producto", () => {
        render(<CardBoletas brp={mockBoleta} prods={mockProductos} />)

        expect(screen.getByText("Torta Chocolate")).toBeInTheDocument()
        expect(screen.getByText("x2")).toBeInTheDocument()
        expect(screen.getByText("$10000")).toBeInTheDocument()

        expect(screen.getByText("Brownie")).toBeInTheDocument()
        expect(screen.getByText("x3")).toBeInTheDocument()
        expect(screen.getByText("$3000")).toBeInTheDocument()
    })

    it("CardBOLETA PRUEBA_04: Llama a la función regresar al presionar el botón", () => {
        render(<CardBoletas brp={mockBoleta} prods={mockProductos} regresar={mockRegresar} />)

        const btn = screen.getByRole("button", { name: /regresar/i })
        fireEvent.click(btn)

        expect(mockRegresar).toHaveBeenCalledTimes(1)
    })

    it("CardBOLETA PRUEBA_05: No renderiza el botón si no se pasa la función regresar", () => {
        render(<CardBoletas brp={mockBoleta} prods={mockProductos} />)

        const btn = screen.queryByRole("button", { name: /regresar/i })
        expect(btn).not.toBeInTheDocument()
    })
})