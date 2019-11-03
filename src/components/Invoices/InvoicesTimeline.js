import React from 'react'
import styled from 'styled-components'
import { Check, MoneyCheck } from 'styled-icons/fa-solid'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import InvoiceCard from './InvoiceCard'

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 13rem);
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.1)
`

const MoneyCheckIcon = styled(MoneyCheck)`
  color: #00f;
  width: 1rem;
  height: 1rem;
`

const CheckIcon = styled(Check)`
  color: green;
  width: 1rem;
  height: 1rem;
`

const InvoicesTimeline = ({ invoices, onInvoiceEdit, onInvoicePrint, onInvoiceCopy }) => (
  <Container>
    <VerticalTimeline>
      {invoices.map((invoice, index) => (
        <VerticalTimelineElement
          key={invoice.id}
          contentStyle={{ background: '#fff', color: '#00f', padding: 0 }}
          contentArrowStyle={{ borderRight: '7px solid  #fff' }}
          iconStyle={{ background: '#fff', color: '#fff' }}
          icon={invoice.paymentDate ? <CheckIcon /> : <MoneyCheckIcon />}
        >
          <InvoiceCard
            position={index % 2 === 0 ? 'left' : 'right'}
            onEdit={() => onInvoiceEdit(invoice)}
            onPrint={() => onInvoicePrint(invoice)}
            onCopy={() => onInvoiceCopy(invoice)}
            {...invoice}
          />
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  </Container>
)

export default InvoicesTimeline
