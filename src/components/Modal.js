import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  background-color: #fff;
  width: fit-content;
  border: 1px solid #ddd;
  z-index: 101;
`

export default ({ open, onClose, children }) => {
  return open
    ? (
      <Background onClick={onClose}>
        <Content onClick={(e) => e.stopPropagation()}>
          {children}
        </Content>
      </Background>
    )
    : null
}
