import { render, screen, fireEvent } from "@testing-library/react"
import { beforeEach, vi } from "vitest"
import CardBoletasPreview from "./CardBoletasPreview"

describe("Testing CardBoletasPreview", () => {

    const mockBoleta = {
        n_boleta: "HBLT_2",
        comprador: { nombre_comprador: "Luciano Escalona" },
        recibidor: { nombre_recibidor: "Juan Perez" }
    }

    const mockVer = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("CardBOLETApreview PRUEBA_01: Muestra correctamente el número de boleta", () => {
        render(<CardBoletasPreview lsb={mockBoleta} ver={mockVer} />)
        expect(screen.getByText("HBLT_2")).toBeInTheDocument()
    })

    it("CardBOLETApreview PRUEBA_02: Muestra correctamente el nombre del comprador", () => {
        render(<CardBoletasPreview lsb={mockBoleta} ver={mockVer} />)
        expect(screen.getByText("Luciano Escalona")).toBeInTheDocument()
    })

    it("CardBOLETApreview PRUEBA_03: Muestra correctamente el nombre del receptor del pedido", () => {
        render(<CardBoletasPreview lsb={mockBoleta} ver={mockVer} />)
        expect(screen.getByText("Juan Perez")).toBeInTheDocument()
    })
    it("CardBOLETApreview PRUEBA_04: Llama a la función ver al presionar el botón", () => {
        render(<CardBoletasPreview lsb={mockBoleta} ver={mockVer} />)
        const btn = screen.getByRole("button", { name: /ver detalles/i })
        fireEvent.click(btn)
        expect(mockVer).toHaveBeenCalledTimes(1)
    })

    it("CardBOLETApreview PRUEBA_05: Renderiza el botón 'Ver detalles'", () => {
        render(<CardBoletasPreview lsb={mockBoleta} ver={mockVer} />)
        const btn = screen.getByRole("button", { name: /ver detalles/i })
        expect(btn).toBeInTheDocument()
    })
})