import React from 'react'
import styled from 'styled-components'
import JSONViewer from 'react-json-viewer'

const Container = styled.div`
  width: 75vw;
  height: 40rem;
  margin: 1rem;
  overflow: scroll;
`

export default ({ results, isError }) => (
  <Container>
    { isError ? <p>Error processing query</p> : <JSONViewer json={results} />}
  </Container>
)
