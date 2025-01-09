import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMoveBack } from "@/hooks/use-move-back";
import { LinksProps } from "@/types";
import links from "@/data/app/logout-links.json";

const Logout: FC = () => {
  const avatar = "https://github.com/shadcn.png";
  const name = "Microbin";

  const [isLoggingOut, setIsLogginOut] = useState(false);
  const [isAllAccountsLoggingOut, setIsAllAccountsLogginOut] = useState(false);

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  function logout() {
    setIsLogginOut(true);
    setTimeout(function () {
      navigate("/");
    }, 2000);
  }

  function logoutAllAccounts() {
    setIsAllAccountsLogginOut(true);
    setTimeout(function () {
      navigate("/");
    }, 2000);
  }

  return (
    <div className="h-screen flex justify-center items-start bg-[#0f1014]">
      <div className="flex flex-col items-center justify-center gap-20 dark">
        <div className="flex w-[300px] flex-col items-center justify-center gap-4 mt-20">
          <img
            className="w-min h-min"
            src="/microbin-full-white.png"
            alt="Logo"
          />

          <h3 className="text-2xl font-thin text-white">
            Select account to sign out
          </h3>

          <Card className="flex items-center justify-between w-full gap-4 p-4 border border-white">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 rounded-lg">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>

              <div>
                <h6 className="text-sm">Signed in as</h6>
                <h6 className="text-sm font-semibold">{name}</h6>
              </div>
            </div>

            <Button
              disabled={isAllAccountsLoggingOut || isLoggingOut}
              onClick={logout}
              size="sm"
              variant="secondary"
              className="text-red-400"
            >
              {isLoggingOut ? (
                <>
                  <Loader className="animate-spin" />
                </>
              ) : (
                "Sign out"
              )}
            </Button>
          </Card>

          <Button
            disabled={isAllAccountsLoggingOut || isLoggingOut}
            onClick={logoutAllAccounts}
            variant="destructive"
            className="w-full"
          >
            {isAllAccountsLoggingOut ? (
              <>
                <Loader className="animate-spin" /> Signing out
              </>
            ) : (
              "Sign out from all accounts"
            )}
          </Button>

          <Button
            disabled={isAllAccountsLoggingOut || isLoggingOut}
            onClick={moveBack}
            variant="secondary"
            className="w-full"
          >
            Go back
          </Button>
        </div>

        <div className="flex justify-center flex-wrap gap-4 text-xs text-[#74b9ff]">
          {links.map((link, index) => (
            <Links
              target={link.target}
              href={link.href}
              disabled={isAllAccountsLoggingOut || isLoggingOut}
              key={index}
            >
              {link.label}
            </Links>
          ))}
        </div>
      </div>
    </div>
  );
};

function Links({ target, href, children, disabled }: LinksProps) {
  return (
    <Link target={target} to={href}>
      <Button
        className="transition text-[12px] font-normal duration-200 hover:text-blue-500"
        variant="link"
        size="sm"
        disabled={disabled}
      >
        {children}
      </Button>
    </Link>
  );
}

export default Logout;
