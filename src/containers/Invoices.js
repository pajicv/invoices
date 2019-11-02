import React, { useState, useMemo, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ExclamationTriangle } from 'styled-icons/fa-solid'
import 'react-vertical-timeline-component/style.min.css'
import InvoiceForm from '../components/InvoiceForm'
import Modal from '../components/Modal'
import { fetchInvoices, fetchClients, getLastInvoiceNumber, insertInvoice, exportToCSV, updateInvoice } from '../db'
import InvoiceToolbar from '../components/InvoiceToolbar'
import InvoicesTimeline from '../components/InvoicesTimeline'

const TitleBar = styled.div`
  height: 8rem;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Invoices = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const ExclamationTriangleIcon = styled(ExclamationTriangle)`
  color: orange;
  width: 2rem;
  height: 2rem;
  margin: 0.5rem;
`

export default () => {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1

  const newInvoice = useRef({
    invoiceNumber: 0,
    invoiceYear: 0,
    clientId: 1,
    issueDate: today.toISOString().substr(0, 10),
    paymentDate: today.toISOString().substr(0, 10),
    amount: 0,
    amountRSD: 0,
    exchangeRate: 0,
    description: ''
  })

  const [invoices, setInvoices] = useState([])
  const [clients, setClients] = useState([])
  const [invoice, setInvoice] = useState(null)
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState(0)
  const [isInvoiceEditing, setIsInvoiceEditing] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const invoices = await fetchInvoices()
      setInvoices(invoices)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const clients = await fetchClients()
      setClients(clients)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const maxInvoiceNumber = await getLastInvoiceNumber(currentYear)
      const invoiceNumber = maxInvoiceNumber.length > 0 ? parseInt(maxInvoiceNumber[0].invoiceNumber) + 1 : 1
      setNextInvoiceNumber(invoiceNumber)
    }
    fetchData()
  }, [currentYear, invoices])

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'number' ? parseInt(target.value) : target.value
    const field = target.name
    setInvoice({ ...invoice, [field]: value })
  }

  const handleInvoiceSave = async () => {
    const amountRSD = invoice.amount * invoice.exchangeRate
    try {
      if (invoice.id) {
        await updateInvoice({ ...invoice, amountRSD })
      } else {
        await insertInvoice({ ...invoice, amountRSD })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setInvoice(null)
      setInvoice(null)
    }
    const invoices = await fetchInvoices()
    setInvoices(invoices)
  }

  const handleInvoiceFormClose = () => setInvoice(null)

  const handleInvoiceCreate = () => {
    setInvoice({
      ...newInvoice.current,
      invoiceNumber: nextInvoiceNumber,
      invoiceYear: currentYear
    })
    setIsInvoiceEditing(true)
  }

  const handleInvoiceEdit = (invoice) => {
    setInvoice(invoice)
    setIsInvoiceEditing(true)
  }

  const handleInvoicePrint = (invoice) => {
    setInvoice(invoice)
  }

  const handleInvoiceCopy = (invoice) => {
    setInvoice({
      ...invoice,
      invoiceNumber: nextInvoiceNumber,
      invoiceYear: currentYear
    })
    setIsInvoiceEditing(true)
  }

  const handleExportToCSV = () => exportToCSV()

  const incomeCurrentYear = useMemo(() => {
    return invoices
      .filter(({ paymentDate }) => paymentDate && paymentDate.substr(0, 4) === currentYear.toString())
      .reduce((acc, { amountRSD }) => acc + parseInt(amountRSD), 0)
  }, [invoices, currentYear])

  const isDanger = incomeCurrentYear > currentMonth * 500000

  return (
    <>
      <TitleBar>
        {isDanger && <ExclamationTriangleIcon />}
        <h1>{`${incomeCurrentYear.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} RSD`}</h1>
      </TitleBar>
      <InvoicesTimeline
        invoices={invoices}
        onInvoiceEdit={handleInvoiceEdit}
        onInvoicePrint={handleInvoicePrint}
        onInvoiceCopy={handleInvoiceCopy}
      />
      <InvoiceToolbar
        onCreate={handleInvoiceCreate}
        onExport={handleExportToCSV}
      />
      <Modal
        open={Boolean(invoice) && isInvoiceEditing}
        onClose={handleInvoiceFormClose}
      >
        <InvoiceForm
          {...invoice}
          clients={clients}
          onChange={handleInputChange}
          onSubmit={handleInvoiceSave}
          onCancel={handleInvoiceFormClose}
        />
      </Modal>
    </>
  )
}
