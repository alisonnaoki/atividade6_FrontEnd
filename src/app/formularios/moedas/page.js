'use client'

import Pagina from "@/components/Pagina";
import { useState } from "react";
import { Button, CardImg, Form, Modal } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

const TaxasConvert = {
  dolar: 0.20,
  euro: 0.18,
  bitCoin: 0.000003,
};
  
export default function ConversorFirmik() {

  const [showModal, setShowModal] = useState(false)
  const [real, setReal] = useState('')
  const [moeda, setMoeda] = useState('')
  const [resultado, setResultado] = useState(0)


  function calcular(event) {
    event.preventDefault()
    const valorReais = Number(real)
    const TaxaConvert = TaxasConvert[moeda]

    if(TaxaConvert){
      const resultadoConvert = valorReais*TaxaConvert;
      setResultado(resultadoConvert)
      setShowModal(true);
    }
    else{
      console.error('Taxa não encontrada')
    }
  }

  return (
    <Pagina titulo="Conversor de moedas">

      <div>
        <CardImg src="/moedas/conversor.png" width={100} height={500} />
      </div>

      {/* Formulário */}
      <Form onSubmit={calcular}>

        <Form.Group className="mb-3">
          <Form.Label>Moeda:</Form.Label>
          <Form.Select
            name="moeda"
            value={moeda}
            onChange={e => setMoeda(e.target.value)}
          >
            <option>Selecione</option>
            <option value="dolar">Dolar</option>
            <option value="bitCoin">BitCoin</option>
            <option value="euro">Euro</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Reais:</Form.Label>
          <Form.Control
            name="real"
            type="number"
            value={real}
            onChange={e => setReal(e.target.value)}
            min={0.1}
            step={0.1}
          />
          <Form.Text>Reais, ex: 100.90</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Button type="submit" variant="success">
            <FaCheck /> Calcular
          </Button>
        </Form.Group>

      </Form>

      {/* Modal do Resultado */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resultado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>O resultado da conversão é {resultado}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Pagina>
  )
}
