import React, { useState } from 'react'
import styled from 'styled-components'
import { Print, Copy, Pen } from 'styled-icons/fa-solid'
import moment from 'moment'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: rgba(0, 0, 255, 0.01);
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.position === 'left' ? 'flex-end' : 'flex-start'};
  padding: 0px 1rem;
`

const Amount = styled.p`
  font-size: 1.8rem !important;
  color: rgba(0, 0, 0, 0.85);
  margin: 0px 1rem !important;
  display: flex;
  align-items: flex-end;
`

const InvoiceNumber = styled.p`
  font-size: 1.6rem !important;
  color: rgba(0, 0, 0, 0.75);
  margin: 0px !important;
`

const ClientName = styled.p`
  font-size: 1.4rem !important;
  color: rgba(0, 0, 0, 0.5);
  margin: 0px !important;
`

const DateLabel = styled.p`
  font-size: 0.7rem !important;
  color: rgba(0, 0, 0, 0.5);
  margin: 0px !important;
`

const Date = styled.p`
  font-size: 0.9rem !important;
  color: rgba(0, 0, 0, 0.75);
  margin: 0px !important;
`

const Currency = styled.p`
  font-size: 0.9rem !important;
  color: rgba(0, 0, 0, 0.75);
  margin-bottom: 0.4em !important;
  margin-left: 0.2em !important;
`

const PrintIcon = styled(Print)`
  width: 1rem;
  height: 1rem;
  margin: 0.5rem;
`

const CopyIcon = styled(Copy)`
  width: 1rem;
  height: 1rem;
  margin: 0.5rem;
`

const EditIcon = styled(Pen)`
  width: 1rem;
  height: 1rem;
  margin: 0.5rem;
`

const ButtonBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 10rem;
`

const Button = styled.div`
  color: rgba(0, 0, 255, 0.5);
  &:hover {
    color: rgba(0, 0, 255, 0.75);
  }
  &:active {
    color: rgba(0, 0, 255, 0.85);
  }
`

export default ({
  clientName, issueDate, paymentDate, amountRSD, invoiceNumber, invoiceYear, position, onEdit, onPrint, onCopy
}) => {
  const [active, setActive] = useState(false)

  const toggleActive = () => setActive(!active)

  const paymentDateDisplay = paymentDate
    ? moment(paymentDate).format('DD.MM.YYYY.')
    : '-'

  const issueDateDisplay = moment(issueDate).format('DD.MM.YYYY.')

  const content = (
    <Content position={position}>
      <InvoiceNumber>{`${invoiceNumber} / ${invoiceYear}`}</InvoiceNumber>
      <ClientName>{clientName}</ClientName>
      <DateLabel>Issued</DateLabel>
      <Date>{issueDateDisplay}</Date>
      <DateLabel>Payed</DateLabel>
      <Date>{paymentDateDisplay}</Date>
    </Content>
  )

  const amount = (
    <Amount>
      <span>
        {(typeof amountRSD === 'number') ? amountRSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : amountRSD}
      </span>
      <Currency>
        RSD
      </Currency>
    </Amount>
  )

  const tools = (
    <ButtonBar>
      <Button onClick={onPrint}>
        <PrintIcon />
      </Button>
      <Button onClick={onEdit}>
        <EditIcon />
      </Button>
      <Button onClick={onCopy}>
        <CopyIcon />
      </Button>
    </ButtonBar>
  )

  return (
    <Container onMouseEnter={toggleActive} onMouseLeave={toggleActive}>
      {position === 'left' ? [tools, amount, content] : [content, amount, tools]}
    </Container>
  )
}
