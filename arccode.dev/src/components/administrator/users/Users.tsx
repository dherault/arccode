import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import useUsers from '~hooks/administrator/useUsers'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~components/ui/Table'
import { Button } from '~components/ui/Button'
import UserUnlockGearDialog from '~components/administrator/users/UserUnlockGearDialog'
import UserAssignGearDialog from '~components/administrator/users/UserAssignGearDialog'
import UserKeywordsDialog from '~components/administrator/users/UserKeywordsDialog'

function Users() {
  const { users } = useUsers()

  const [unlockGearUserId, setUnlockGearUserId] = useState<string>('')
  const [assignGearUserId, setAssignGearUserId] = useState<string>('')
  const [keywordUserId, setKeywordUserId] = useState<string>('')

  return (
    <>
      <Helmet>
        <title>
          Users | Arccode
        </title>
      </Helmet>
      <div className="container">
        <h1 className="font-display font-bold text-4xl">
          Users
        </h1>
        <Table className="mt-4 bg-white border">
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Character name</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.email}
                </TableCell>
                <TableCell>
                  {user.character.name}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Link to={`/~/${user.id}`}>
                      <Button size="xs">
                        Go to
                      </Button>
                    </Link>
                    <Button
                      size="xs"
                      onClick={() => setUnlockGearUserId(user.id)}
                    >
                      Unlock gear
                    </Button>
                    <Button
                      size="xs"
                      onClick={() => setAssignGearUserId(user.id)}
                    >
                      Assign gear
                    </Button>
                    <Button
                      size="xs"
                      onClick={() => setKeywordUserId(user.id)}
                    >
                      Edit keywords
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <UserUnlockGearDialog
        userId={unlockGearUserId}
        setUserId={setUnlockGearUserId}
      />
      <UserAssignGearDialog
        userId={assignGearUserId}
        setUserId={setAssignGearUserId}
      />
      <UserKeywordsDialog
        userId={keywordUserId}
        setUserId={setKeywordUserId}
      />
    </>
  )
}

export default Users
