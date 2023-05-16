import { type User } from '../types.d'

interface TableParams {
  users: User[]
  hasColor: boolean
  handleDelete: (email: string) => void
}

export function Table({ users, hasColor, handleDelete }: TableParams) {
  return (
    <table width="100%">
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
        {users.map((user, index) => {
          let rowColor = 'transparent'
          if (hasColor) {
            rowColor = '#302f2f'
            if (index % 2 === 0) {
              rowColor = '#464545'
            }
          }
          return (
            <tr key={user.email} style={{ backgroundColor: rowColor }}>
              <td>
                <img className="avatar" src={user.picture.thumbnail} alt={`${user.name.first}'s thumbnail`} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    handleDelete(user.email)
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
