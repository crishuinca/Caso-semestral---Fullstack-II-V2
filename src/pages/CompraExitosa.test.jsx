import { render, screen } from "@testing-library/react"
import CompraExitosa from "./CompraExitosa"
import { beforeEach, vi } from "vitest"
import React from "react"
import { MemoryRouter } from "react-router-dom"

describe("Testing CompraExitosa", () => {

    const mockPago = {
        payer: { name: { given_name: "Luciano" } },
        id: "PAY123",
        status: "COMPLETED",
        create_time: "2025-10-28T12:00:00Z"
    }

    const mockDespacho = {
        cliente_despachar: {
            nombre: "Juan Perez",
            rut: "12345678-9",
            direccion: "Calle Falsa 123",
            tipoEntrega: "Domicilio",
            dia: "28",
            mes: "10",
            ano: "2025"
        },
        productos: [
            { codigo: "P001", cantidad: 2 },
            { codigo: "P002", cantidad: 1 }
        ],
        total: 25000
    }

    beforeEach(() => {
        localStorage.clear()
    })

    it("CompraExitosa PRUEBA_01: Renderiza mensaje de pago no encontrado si i_pago es null", () => {
        localStorage.setItem("temporal_info", JSON.stringify(mockDespacho))
        render(<CompraExitosa />, { wrapper: MemoryRouter })
        expect(screen.getByText(/no se pudo encontrar la informacion del pago/i)).toBeInTheDocument()
    })

    it("CompraExitosa PRUEBA_02: Renderiza correctamente la informacion de pago si existe", () => {
        localStorage.setItem("temporal_info", JSON.stringify(mockDespacho))
        localStorage.setItem("temporal_info_quien_pago", JSON.stringify(mockPago))
        render(<CompraExitosa />, { wrapper: MemoryRouter })
        expect(screen.getByText(/luciano/i)).toBeInTheDocument()
        expect(screen.getByText(/PAY123/i)).toBeInTheDocument()
        expect(screen.getByText(/COMPLETED/i)).toBeInTheDocument()
        expect(screen.getByText(/\$25000/i)).toBeInTheDocument()
    })

    it("CompraExitosa PRUEBA_03: Renderiza correctamente los productos comprados", () => {
        localStorage.setItem("temporal_info", JSON.stringify(mockDespacho))
        render(<CompraExitosa />, { wrapper: MemoryRouter })
        expect(screen.getByText("P001")).toBeInTheDocument()
        expect(screen.getByText("x2")).toBeInTheDocument()
        expect(screen.getByText("P002")).toBeInTheDocument()
        expect(screen.getByText("x1")).toBeInTheDocument()
    })

    it("CompraExitosa PRUEBA_04: Guarda nueva boleta en localStorage si no existe previamente", () => {
        localStorage.setItem("temporal_info", JSON.stringify(mockDespacho))
        localStorage.setItem("temporal_info_quien_pago", JSON.stringify(mockPago))

        render(<CompraExitosa />, { wrapper: MemoryRouter })

        const historial = JSON.parse(localStorage.getItem("historial_boletas"))
        expect(historial).toHaveLength(1)
        expect(historial[0].comprador.id_comprador).toBe("PAY123")
    })

    it("CompraExitosa PRUEBA_05: No guarda boleta duplicada si ya existe en historial", () => {
        const historialPrevio = [{
            n_boleta: "HBLT_0",
            comprador: { id_comprador: "PAY123" },
            recibidor: { nombre_recibidor: "Juan" },
            productos_comprados: []
        }]
        localStorage.setItem("historial_boletas", JSON.stringify(historialPrevio))
        localStorage.setItem("temporal_info", JSON.stringify(mockDespacho))
        localStorage.setItem("temporal_info_quien_pago", JSON.stringify(mockPago))

        render(<CompraExitosa />, { wrapper: MemoryRouter })

        const historial = JSON.parse(localStorage.getItem("historial_boletas"))
        expect(historial).toHaveLength(1) // no se agrega duplicado
    })
})