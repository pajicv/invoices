import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form`
  width: 20rem;
  height: 20rem;
  padding: 0.5rem 1rem;
`

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.2rem;
`

const ButtonBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 0.2rem;
`

const Input = styled.input`
  width: 60%;
`

const Select = styled.select`
  width: 60%;
`

export default ({
  id,
  invoiceNumber,
  invoiceYear,
  amount,
  clientId,
  issueDate,
  paymentDate,
  exchangeRate,
  clients,
  onChange,
  onSubmit,
  description,
  onCancel
}) => (
  <Container>
    <h3>{`${id ? 'Edit' : 'Create'} Invoice`}</h3>
    <Form>
      <FormGroup>
        <label htmlFor='amount'>Invoice Number</label>
        <Input
          type='number'
          name='invoiceNumber'
          value={invoiceNumber}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor='amount'>Invoice Year</label>
        <Input
          type='number'
          name='invoiceYear'
          value={invoiceYear}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor='description'>Description</label>
        <Input
          type='text'
          name='description'
          value={description}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor='clientId'>Client</label>
        <Select name='clientId' onChange={onChange}>
          {
            clients.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))
          }
        </Select>
      </FormGroup>
      <FormGroup>
        <label htmlFor='amount'>Amount [EUR]</label>
        <Input
          type='number'
          name='amount'
          value={amount}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor='exchangeRate'>Exchange Rate [RSD]</label>
        <Input
          type='number'
          name='exchangeRate'
          value={exchangeRate}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor='issueDate'>Issue Date</label>
        <Input
          type='date'
          name='issueDate'
          value={issueDate}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor='paymentDate'>Payment Date</label>
        <Input
          type='date'
          name='paymentDate'
          value={paymentDate}
          onChange={onChange}
        />
      </FormGroup>
      <ButtonBar>
        <input type='button' value='Cancel' onClick={onCancel} />
        <input type='button' value='Save' onClick={onSubmit} />
      </ButtonBar>
    </Form>
  </Container>
)
