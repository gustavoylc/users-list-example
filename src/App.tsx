import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { Table } from './components/Table'

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async (res) => await res.json())
      .then((data) => {
        setUsers(data.results)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <Table users={users}></Table>
    </>
  )
}

export default App
