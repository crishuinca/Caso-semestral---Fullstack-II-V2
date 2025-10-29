import { render, screen } from "@testing-library/react"
import CompraExitosa from "../../pages/CompraExitosa"
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
})