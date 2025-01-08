import { Bell } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { TabsContent, TabsTrigger, Tabs, TabsList } from "../ui/tabs";

const NotificationsSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="rounded-full hover:bg-accent h-10 w-10 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
          <div className="flex items-center cursor-pointer">
            <Bell
              fill="#eab308 "
              className="text-yellow-500 transition-all rotate-0"
            />
            <span className="sr-only">Notifications</span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="p-4 max-h-screen">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <Tabs className="mt-2" defaultValue="alerts">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="alerts">
              Alerts
            </TabsTrigger>
            <TabsTrigger className="w-full" value="updates">
              Updates
            </TabsTrigger>
            <TabsTrigger className="w-full" value="logs">
              Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alerts">Notification Alerts</TabsContent>

          <TabsContent value="updates">Notification Updates</TabsContent>

          <TabsContent value="logs">NotificationLogs</TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsSheet;
