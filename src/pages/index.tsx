import Head from 'next/head'
import styled from 'styled-components'
import Dashboard from '@/components/Dashboard'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Business Process Modeling Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>Business Process Modeling Tool</Title>
      <Dashboard />
    </Container>
  )
}