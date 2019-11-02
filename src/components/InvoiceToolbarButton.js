import React from 'react'
import styled from 'styled-components'
import { FileExport } from 'styled-icons/fa-solid'

const Button = styled.div`
  height: 2rem;
  width: 8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  box-shadow: 0.1rem 0.1rem 0.3rem rgba(0,0,0,0.2);
  &:active {
    box-shadow: inset 0.1rem 0.1rem 0.3rem rgba(0,0,0,0.2);
  }
  &:hover {
    cursor: pointer;
  }
  margin: 1rem;
`

export default ({ title, children, onClick }) => (
  <Button onClick={onClick}>
    <span>{title}</span>
    {children}
  </Button>
)
