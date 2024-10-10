import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

const WorkflowEditor = dynamic(() => import('@/components/WorkflowEditor'), { ssr: false })

const EditorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
`

const Editor = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <EditorContainer>
      {id && <WorkflowEditor workflowId={id as string} />}
    </EditorContainer>
  )
}

export default Editor