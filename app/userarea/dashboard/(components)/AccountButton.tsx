"use client";

import {
  Building2,
  CreditCard,
  Info,
  LogOut,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  User2,
  UserPlus,
  Users
} from "lucide-react";

import { logout } from "@/app/(components)/Auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";

export function AccountButton() {

 const router = useRouter()

 const [account, setAccount] = useState<any>({})
 const [company, setCompany] = useState<any>({})

 useEffect(() => {
  (async () => {
   setAccount((await axios.get("/api/account")).data)
   setCompany((await axios.get("/api/company")).data)
  })();
 }, [])

 return (
  <DropdownMenu>
   <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
     <User2 />
    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>{company.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
     <DropdownMenuItem onClick={() => {
      router.push("/userarea/profile")
     }}>
      <User className="mr-2 h-4 w-4" />
      <span>Account Profil</span>
     </DropdownMenuItem>
     <DropdownMenuItem onClick={() => {
      router.push("/userarea/company")
     }}>
      <Building2 className="mr-2 h-4 w-4" />
      <span>Unternehmens Profil</span>
     </DropdownMenuItem>
     <DropdownMenuSub>
      <DropdownMenuSubTrigger>
       <CreditCard className="mr-2 h-4 w-4" />
       <span>Zahlung</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
       <DropdownMenuSubContent>
       <DropdownMenuItem disabled>
         <Info className="mr-2 h-4 w-4" />
         <span>Information</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
         <RiAddCircleFill className="mr-2 h-4 w-4" />
         <span>Mehode hinzufügen</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
         <PlusCircle className="mr-2 h-4 w-4" />
         <span>More...</span>
        </DropdownMenuItem>
       </DropdownMenuSubContent>
      </DropdownMenuPortal>
     </DropdownMenuSub>
     <DropdownMenuItem disabled>
      <Settings className="mr-2 h-4 w-4" />
      <span>Einstellungen</span>
     </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem disabled>
     <MessageSquare className="mr-2 h-4 w-4" />
     <span>Chat</span>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
     <DropdownMenuItem disabled>
      <Users className="mr-2 h-4 w-4" />
      <span>Mitglieder</span>
     </DropdownMenuItem>
     <DropdownMenuItem disabled>
      <UserPlus className="mr-2 h-4 w-4" />
      <span>Mitglider Einladen</span>
     </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem
     onClick={() => {
      logout()
      router.push("/")
     }}
    >
     <LogOut className="mr-2 h-4 w-4" />
     <span>Log out</span>
    </DropdownMenuItem>
   </DropdownMenuContent>
  </DropdownMenu>
 );
}