import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin: 1rem;
`
const QueryField = styled.textarea`
  width: 40rem;
`

const QueryButton = styled.input`
  margin-left: 1rem;
  width: 5rem;
`

export default ({ query, onChange, onExecute }) => (
  <Container>
    <QueryField
      type='text'
      name='query'
      value={query}
      onChange={onChange}
    />
    <QueryButton
      type='button'
      value='Execute'
      onClick={onExecute}
    />
  </Container>
)
