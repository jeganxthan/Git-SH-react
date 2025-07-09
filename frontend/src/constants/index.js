
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/16/solid";
import { UserIcon } from "@heroicons/react/20/solid";

export const sideBarLinks = [
  {
    logo: HomeIcon,
    label: "Home",
    route: "/dashboard",
  },
  {
    logo: MagnifyingGlassIcon,
    label: "Search",
    route: "/dashboard/search",
  },
  {
    logo: ChatBubbleOvalLeftEllipsisIcon,
    label: "Chat",
    route: "/dashboard/chat",
  },
  {
    logo: ArrowUpOnSquareIcon,
    label: "SH",
    route: "/dashboard/sh",
  },
  {
    logo: UserIcon,
    label: "Profile",
    route: "/dashboard/profile",
  },
];
