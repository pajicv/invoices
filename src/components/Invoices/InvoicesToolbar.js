import React from 'react'
import styled from 'styled-components'
import { FileExport, Plus } from 'styled-icons/fa-solid'
import InvoiceToolbarButton from './InvoicesToolbarButton'

const Toolbar = styled.div`
  position: relative;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  height: 5rem;
  box-shadow: 0.2rem 0.2rem 0.6rem rgba(0,0,0,0.4);
  display: flex;
  alignItems: center;
  justifyContent: center;
`

const FileExportIcon = styled(FileExport)`
  color: rgba(0, 0, 0, 0.2);
  width: 1rem;
  height: 1rem;
`

const PlusIcon = styled(Plus)`
  color: rgba(0, 0, 0, 0.2);
  width: 1rem;
  height: 1rem;
`

const InvoicesToolbar = ({ onCreate, onExport }) => (
  <Toolbar>
    <InvoiceToolbarButton
      title='Add Invoice'
      onClick={onCreate}
    >
      <PlusIcon />
    </InvoiceToolbarButton>
    <InvoiceToolbarButton
      title='Export to CSV'
      onClick={onExport}
    >
      <FileExportIcon />
    </InvoiceToolbarButton>
  </Toolbar>
)

export default InvoicesToolbar
