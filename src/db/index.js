import * as alasql from 'alasql'

export const init = () => {
  alasql(`
    CREATE LOCALSTORAGE DATABASE IF NOT EXISTS fakture;
    ATTACH LOCALSTORAGE DATABASE fakture;
    USE fakture;
  `)

  alasql(`CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTOINCREMENT PRIMARY KEY, 
    clientId STRING,
    invoiceNumber INT,
    invoiceYear INT,
    issueDate DATE,
    paymentDate DATE,
    amount INT,
    currency STRING,
    amountRSD INT,
    notes STRING,
    description STRING
  )`)

  alasql(`CREATE TABLE IF NOT EXISTS clients (
    id INT PRIMARY KEY, 
    name STRING
  )`)

  const clients = alasql('SELECT * FROM clients')

  if (clients.length === 0) {
    alasql('INSERT INTO clients VALUES ?', [{
      id: 1,
      name: 'Client 1'
    }])
    alasql('INSERT INTO clients VALUES ?', [{
      id: 2,
      name: 'Client 2'
    }])
  }
}

export const exportToCSV = () => {
  alasql('SELECT * INTO CSV("clients.csv",{headers:true}) FROM clients')
  alasql('SELECT * INTO CSV("invoices.csv",{headers:true}) FROM invoices')
}

export const fetchInvoices = () => alasql(`
  SELECT 
    invoices.*, clients.name AS clientName
  FROM 
    invoices 
  INNER JOIN 
    clients
  ON
    invoices.clientId = clients.id   
  ORDER BY 
    invoiceYear, invoiceNumber DESC
`)

export const getLastInvoiceNumber = (year) => alasql('SELECT invoiceNumber FROM invoices WHERE invoiceYear = ? ORDER BY invoiceYear, invoiceNumber DESC LIMIT 1', [year])

export const insertInvoice = (invoice) => alasql('INSERT INTO invoices VALUES ?', [invoice])

export const updateInvoice = ({ id, clientName, ...rest }) => {
  const fields = Object.entries(rest)

  const sql = `
    UPDATE 
      invoices 
    SET 
      ${fields.map(([key, value]) => `${key} = ?`).join(', ')}
    WHERE id = ?  
  `
  const params = fields.map(([key, value]) => value)
  params.push(id)
  return alasql(sql, params)
}

export const fetchClients = () => alasql('SELECT * FROM clients ORDER BY id ASC')

export const executeQuery = (query) => alasql(query)
