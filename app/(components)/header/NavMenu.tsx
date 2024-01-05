import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
 NavigationMenu,
 NavigationMenuContent,
 NavigationMenuItem,
 NavigationMenuLink,
 NavigationMenuList,
 NavigationMenuTrigger,
 navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

import {
 FacebookIcon,
 GemIcon,
 GiftIcon,
 GithubIcon,
 Globe2,
 Goal,
 InfoIcon,
 LineChart,
 MailWarningIcon,
 MousePointerSquareDashed,
 SearchCheckIcon,
 Smile,
 Star,
 Ticket,
 TrainFrontTunnel,
} from "lucide-react";

const aboutUsLinks: {
 title: string;
 href: string;
 description: string;
 icon: any;
}[] = [
 {
  title: "Unser Angebot",
  href: "/#offer",
  description: "Was Wir Zu Bieten Haben",
  icon: <LineChart />,
 },
 {
  title: "Rezensionen",
  href: "/#reviews",
  description: "Was Man Über Uns Sagt",
  icon: <Star />,
 },
 {
  title: "Kunden",
  href: "/#clients",
  description: "Wer Mit Uns Arbeitet",
  icon: <Smile />,
 },
 {
  title: "Strategie",
  href: "/#strategy",
  description: "Wie wir sie zu Ihrem Ziel bringen",
  icon: <Goal />,
 },
 // {
 //  title: "Geschenk",
 //  href: "/#gift",
 //  description: "Ein kleines Geschenk",
 //  icon: <GiftIcon />,
 // },
 // {
 //  title: "Information",
 //  href: "/#footer",
 //  description: "Unternehmens Infos",
 //  icon: <InfoIcon />,
 // },
];

const services: {
 title: string;
 href: string;
 description: string;
 icon: any;
}[] = [
 {
  title: "Meta Ads",
  href: "/services#meta-ads",
  description: "A modal",
  icon: <FacebookIcon />,
 },
 {
  title: "Google Ads",
  href: "/services#google-ads",
  description: "For sighted",
  icon: <GithubIcon />,
 },
 {
  title: "TikTok Ads",
  href: "/services#tiktok-ads",
  description: "Displays an indicator ",
  icon: <Ticket />,
 },
 {
  title: "Pinterest Ads",
  href: "/services#pinterest-ads",
  description: "A set of ",
  icon: <MousePointerSquareDashed />,
 },
 {
  title: "Funnel Creation",
  href: "/services/funnels",
  description: "Visually or ",
  icon: <TrainFrontTunnel />,
 },
 {
  title: "Branding",
  href: "/services#branding",
  description: "A set of ",
  icon: <GemIcon />,
 },
 {
  title: "Website Creation",
  href: "/services#website",
  description: "A popup that hovers over it.",
  icon: <Globe2 />,
 },
 {
  title: "SEO",
  href: "/services#seo",
  description: "A popup that hovers over it.",
  icon: <SearchCheckIcon />,
 },
 {
  title: "Email Marketing",
  href: "/services#email",
  description: "A popup that hovers over it.",
  icon: <MailWarningIcon />,
 },
];

export function NavMenu() {
 return (
  <NavigationMenu className="hidden md:block">
   <NavigationMenuList>
    <NavigationMenuItem>
     <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
     <NavigationMenuContent>
      <div className="flex gap-3 p-6 w-[700px]">
       <div className="w-2/5">
        <NavigationMenuLink asChild>
         <a
          className="h-full w-full p-6 flex flex-col justify-end select-none rounded-md bg-card no-underline outline-none shadow-lg hover:shadow-sm focus:shadow-sm"
          href="/#"
         >
          <Image src={"/logo.png"} alt={""} width={60} height={60} />
          <div className="mb-2 mt-4 text-lg font-medium">SwiftReach</div>
          <p className="text-sm leading-tight text-muted-foreground">
           In A Swift, Reach New Horizons! <br /> Your Success Gateway
          </p>
         </a>
        </NavigationMenuLink>
       </div>
       <ul className="w-full grid grid-cols-2">
        {aboutUsLinks.map((e) => (
         <li key={e.title}>
          <NavigationMenuLink asChild>
           <a
            href={e.href}
            className={
             "h-full px-4 py-2 block select-none rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            }
           >
            <div className="h-full flex gap-4">
             <div className="flex flex-col justify-center">{e.icon}</div>
             <div className="flex flex-col justify-center">
              <div className="text-base font-normal leading-none">
               {e.title}
              </div>
              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
               {e.description}
              </p>
             </div>
            </div>
           </a>
          </NavigationMenuLink>
         </li>
        ))}
       </ul>
      </div>
     </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
     <NavigationMenuTrigger>Services</NavigationMenuTrigger>
     <NavigationMenuContent>
      <ul className="p-3 h-60 w-[700px] grid grid-cols-3 gap-3">
       {services.map((e) => (
        <li>
         <NavigationMenuLink asChild>
          <a
           href={e.href}
           className={
            "h-full px-4 py-2 block select-none rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
           }
          >
           <div className="h-full flex gap-4">
            <div className="flex flex-col justify-center">{e.icon}</div>

            <div className="flex flex-col justify-center">
             <div className="text-base font-normal leading-none">{e.title}</div>
             <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
              {e.description}
             </p>
            </div>
           </div>
          </a>
         </NavigationMenuLink>
        </li>
       ))}
      </ul>
     </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
     <Link href="/getting-started" legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
       Getting Started 🚀
      </NavigationMenuLink>
     </Link>
    </NavigationMenuItem>
   </NavigationMenuList>
  </NavigationMenu>
 );
}

const ListItem = React.forwardRef<
 React.ElementRef<"a">,
 React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
 return (
  <li>
   <NavigationMenuLink asChild>
    <a
     ref={ref}
     className={cn(
      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className
     )}
     {...props}
    >
     <div className="text-sm font-medium leading-none">{title}</div>
     <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
      {children}
     </p>
    </a>
   </NavigationMenuLink>
  </li>
 );
});
ListItem.displayName = "ListItem";
