import { fireEvent, render, screen } from "@testing-library/react"
import ModalEditarProducto from "./ModalEditarProducto"
import { beforeEach, vi } from "vitest"


describe("Testing Card", ()=>{
    //Crear constantes que me servirán para realizar pruebas:
    const mock = {
        modalEditarProducto: "",
        productoEditado: "",
        handleInputChangeProducto: "",
        handleSubmitEditarProducto: "",
        cerrarModalEditar: "",
        estilos: "",
    }
    const mockModificar = vi.fn()

    beforeEach(()=>{
        vi.clearAllMocks()
    })

    it("CP-Card1: Muestra el título, contenido y número correctamente", ()=>{
        render( <ModalEditarProducto {...mockCard}
                      modificar={mockModificar}
                      eliminar={mockEliminar} /> )
        expect(screen.getByText("Ditto")).toBeInTheDocument()
        expect(screen.getByText(/Pokemon que cambia/)).toBeInTheDocument()
        expect(screen.getByText(/132/)).toBeInTheDocument()
    })
})