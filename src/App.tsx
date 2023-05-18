import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type User, type UsersFetch, SortBy } from './types.d'
import { Table } from './components/Table'
import { useFetch } from './hooks/useFetch'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [hasColor, setHasColor] = useState<boolean>(false)
  const originalUsers = useRef<User[]>([])
  const [searchByCountry, setSearchByCountry] = useState<null | string>(null)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const { data, loading, error } = useFetch<UsersFetch>('https://randomuser.me/api/?results=100&seed=user')

  useEffect(() => {
    if (data != null) {
      setUsers(data.results)
      originalUsers.current = data.results
    }
  }, [data])

  const filteredUsers = useMemo(() => {
    return searchByCountry != null && searchByCountry.length >= 1
      ? users.filter((user) => user.location.country.toLowerCase().includes(searchByCountry.toLowerCase()))
      : users
  }, [users, searchByCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    }
    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
    }
    if (sorting === SortBy.LASTNAME) {
      return filteredUsers.toSorted((a, b) => a.name.last.localeCompare(b.name.last))
    }
    return filteredUsers
  }, [filteredUsers, sorting])

  const handleRowsColor = () => {
    setHasColor((prevState) => !prevState)
  }

  const handleSort = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorting)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleRestore = () => {
    setUsers(originalUsers.current)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const country = e.target.value
    country.length === 0
      ? setSearchByCountry(null)
      : setTimeout(() => {
          setSearchByCountry(country)
        }, 500)
  }

  const handleSortBy = (sort: SortBy) => {
    setSorting(sort)
  }

  return (
    <>
      <header>
        <h1>Users List</h1>
        {!loading && (
          <div className="header_container">
            <button onClick={handleRowsColor}>{hasColor ? 'Do not Draw Rows' : 'Draw Rows'}</button>
            <button onClick={handleSort}>{sorting === SortBy.NONE ? 'Sort by country' : 'Do not Sort'}</button>
            <button onClick={handleRestore}>Restore users</button>
            <input type="search" className="header_container_input" placeholder="Mexico" onChange={handleChange} />
          </div>
        )}
      </header>
      <main>
        {error != null && <p>{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table users={sortedUsers} hasColor={hasColor} handleDelete={handleDelete} handleSortBy={handleSortBy} />
        )}
      </main>
    </>
  )
}

export default App
