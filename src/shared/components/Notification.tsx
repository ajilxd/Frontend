import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { useNotification } from "../hooks/useNotification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/appStore";
import { useEffect } from "react";
import { managerFetchNotifications } from "@/features/manager/api/manager.api";
import { userFetchNotifications } from "@/features/user/api/user.api";

export const NotificationComponent = function ({role}:{role:string}) {
  console.log("hey im notif")
  const { notifications, clearNotification ,updateNotifications} = useNotification();
  const manager =useSelector((state:RootState)=>state.manager);
  const user = useSelector((state:RootState)=>state.user)

useEffect(()=>{
  console.log("inside notification component")
if(role =="manager"){
  async function fetchNotification(){
 const res =await managerFetchNotifications(manager.company.id,manager.id);
 if(res.success){
  console.log(res.data)
    updateNotifications(res.data)
 }else{}
    console.warn("failed to fetch notifications")
  }
  fetchNotification()
}else if(role=="user"){
    async function fetchNotification(){
 const res =await userFetchNotifications(user.company.id!,user.id);
 if(res.success){
  console.log(res.data)
    updateNotifications(res.data)
 }else{}
    console.warn("failed to fetch notifications")
  }
  fetchNotification()
}
},[])



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BellIcon className="h-4 w-4 mr-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 max-h-[400px] overflow-auto">
        <div className="grid gap-4 p-4">
          <h4 className="font-medium leading-none">Notifications</h4>
          {notifications.map((i) => {
            return (
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                <div className="grid gap-1">
                  <p className="text-sm font-medium">{i.notificationContent}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {i.notificationTimeStamp}
                  </p>
                </div>
              </div>
            );
          })}

          <Button
            variant="outline"
            className="mt-4"
            onClick={clearNotification}
          >
            Mark All as Read
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function BellIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
