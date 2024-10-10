import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const DashboardContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

const WorkflowList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const WorkflowItem = styled.li`
  background-color: #f0f0f0;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0051bb;
  }
`

interface Workflow {
  id: string;
  name: string;
}

const Dashboard = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    { id: '1', name: 'Onboarding Process' },
    { id: '2', name: 'Customer Support Workflow' },
  ])

  const handleDelete = (id: string) => {
    setWorkflows(workflows.filter(workflow => workflow.id !== id))
  }

  return (
    <DashboardContainer>
      <h2>Your Workflows</h2>
      <Link href="/editor/new">
        <Button>Create New Workflow</Button>
      </Link>
      <WorkflowList>
        {workflows.map(workflow => (
          <WorkflowItem key={workflow.id}>
            <span>{workflow.name}</span>
            <div>
              <Link href={`/editor/${workflow.id}`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={() => handleDelete(workflow.id)}>Delete</Button>
            </div>
          </WorkflowItem>
        ))}
      </WorkflowList>
    </DashboardContainer>
  )
}

export default Dashboard