import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { LogOut, User, UserCog } from "lucide-react";

const ProfileDropdown: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-10 w-10 ml-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-3 mt-2">
        <DropdownMenuLabel>
          <div className="flex gap-3 p-1 items-start">
            <Avatar className="w-14 h-14 rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-sm leading-tight text-left">
              <span className="font-semibold text-base truncate">
                Development
              </span>

              <span className="text-sm font-normal truncate">
                demo@microbin.com
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="p-1">
          <Link to="#">
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem>
            <UserCog />
            Account Settings
          </DropdownMenuItem>

          <Link to="/logout">
            <DropdownMenuItem>
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
