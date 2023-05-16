import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'

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
      {users.map((user) => (
        <div key={user.email}>{user.name.first}</div>
      ))}
    </>
  )
}

export default App
