import { Link } from 'react-router-dom'
import { CircleHelp, LogOut, User } from 'lucide-react'

import useUser from '~hooks/user/useUser'
import useUserInitials from '~hooks/user/useUserInitials'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~components/ui/DropdownMenu'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~components/ui/Avatar'

function UserAvatarMenu() {
  const { user, signOut } = useUser()
  const initials = useUserInitials()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback className="bg-blue text-white select-none">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <User className="mr-2 w-4 h-4" />
          Account
        </DropdownMenuItem>
        <Link to="/support">
          <DropdownMenuItem>
            <CircleHelp className="mr-2 w-4 h-4" />
            Support
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOut}
          className="text-red-500"
        >
          <LogOut className="mr-2 w-4 h-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAvatarMenu
