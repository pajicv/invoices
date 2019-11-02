import React, { useState } from 'react'
import styled from 'styled-components'
import { executeQuery } from '../db'
import SQLQuery from '../components/sql/Query'
import SQLQueryResults from '../components/sql/Results'

const Container = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState('')
  const [isError, setIsError] = useState(false)

  const handleQueryChange = (e) => setQuery(e.target.value)

  const handleExecuteQuery = async () => {
    setIsError(false)
    try {
      const queryResults = await executeQuery(query)
      setResults(queryResults)
    } catch (e) {
      setResults([])
      setIsError(true)
    }
  }

  return (
    <Container>
      <SQLQuery
        query={query}
        onChange={handleQueryChange}
        onExecute={handleExecuteQuery}
      />
      <SQLQueryResults results={results} isError={isError} />
    </Container>
  )
}
