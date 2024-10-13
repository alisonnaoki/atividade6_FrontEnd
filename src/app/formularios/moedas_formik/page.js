 'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useState } from 'react'
import { Button, CardImg, Form, FormGroup, FormText, Modal } from 'react-bootstrap'
import { FaCheck, FaTrashAlt } from 'react-icons/fa'

const TaxasConvert = {
    dolar: 0.20,
    euro: 0.18,
    bitCoin: 0.000003,
  };
    
  export default function Conversor() {
  
    const [showModal, setShowModal] = useState(false)
    const [resultado, setResultado] = useState(0)
  
  
    function calcular(dados) {
      console.log(dados)
      const taxaConvert = TaxasConvert[dados.moeda]
      const resConversao = (dados.real*taxaConvert)
  
      console.log(resConversao)
      setResultado(resConversao)
      setShowModal(true)
    }

    return(
      <Pagina titulo="Conversor de Moedas Formik">
        <div>
        <CardImg src="/moedas/conversor.png" width={100} height={500} />
        </div>
        <Formik 
        initialValues={{
          real:  '0.0',
          moeda: '',
        }}
        onSubmit={values => calcular(values)}
        >
          {({values, handleChange, handleSubmit, handleReset}) => (
            <Form>
              <FormGroup className='mb-2'>
                <Form.Label>Moeda:</Form.Label>
                <Form.Select 
                  name='moeda'
                  value={values.moeda}
                  onChange={handleChange}
                  >
                  <option>Selecione</option>
                  <option value="dolar">Dolar</option>
                  <option value="bitCoin">BitCoin</option>
                  <option value="euro">Euro</option>
                  </Form.Select>
              </FormGroup>

              <FormGroup className='mb-2'>
                <Form.Label>Valor em R$:</Form.Label>
                <Form.Control
                  name='real'
                  type='number'
                  value={values.real}
                  onChange={handleChange}

                />
                <FormText>Reais, ex: 100.90</FormText>
              </FormGroup>

              <FormGroup className='mb-2 text-center'>
                <Button
                  onClick={handleSubmit}
                  className='me-2'
                >
                  <FaCheck/> Calcular
                </Button>
                <Button
                onClick={handleReset}
                >
                <FaTrashAlt /> Limpar
                </Button>
              </FormGroup>

            </Form>

          )}
          
        </Formik>
        
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
