import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { Table } from './components/Table'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [hasColor, setHasColor] = useState<boolean>(false)

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

  const handleRowsColor = () => {
    setHasColor((prevState) => {
      console.log(hasColor)
      return !prevState
    })
    console.log(hasColor)
  }
  return (
    <>
      <header>
        <h1>Users List</h1>
        <button onClick={handleRowsColor}>{hasColor ? 'Do not Draw Rows' : 'Draw Rows'}</button>
      </header>
      <main>
        <Table users={users} hasColor={hasColor}></Table>
      </main>
    </>
  )
}

export default App
