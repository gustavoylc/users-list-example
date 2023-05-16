import { type User } from '../types.d'

interface TableParams {
  users: User[]
}

export function Table({ users }: TableParams) {
  return (
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Last Name</th>
          <th>Country</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.email}>
            <td>
              <img className="avatar" src={user.picture.thumbnail} alt={`${user.name.first}'s thumbnail`} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
