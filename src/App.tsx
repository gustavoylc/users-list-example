import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { Table } from './components/Table'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [hasColor, setHasColor] = useState<boolean>(false)
  const [isSorted, setIsSorted] = useState<boolean>(false)
  const originalUsers = useRef<User[]>([])

  const sortedUsers = isSorted ? users.toSorted((a, b) => a.location.country.localeCompare(b.location.country)) : users

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100&seed=user')
      .then(async (res) => await res.json())
      .then((data) => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleRowsColor = () => {
    setHasColor((prevState) => !prevState)
  }

  const handleSort = () => {
    setIsSorted((prevState) => !prevState)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleRestore = () => {
    setUsers(originalUsers.current)
  }

  return (
    <>
      <header>
        <h1>Users List</h1>
        <div className="header_container">
          <button onClick={handleRowsColor}>{hasColor ? 'Do not Draw Rows' : 'Draw Rows'}</button>
          <button onClick={handleSort}>{isSorted ? 'Do not Sort' : 'Sort by country'}</button>
          <button onClick={handleRestore}>Restore users</button>
        </div>
      </header>
      <main>
        <Table users={sortedUsers} hasColor={hasColor} handleDelete={handleDelete} />
      </main>
    </>
  )
}

export default App
