import React from "react";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import SidebarRow from "./SidebarRow";
import { signIn, signOut, useSession } from "next-auth/react";


const Sidebar = () => {
  const {data: session } = useSession()

  return (
    <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
      <div className="h-10 w-10 relative mx-4 mt-5 mb-3">
        <Image
          src="https://myurl-shortener-orcin.vercel.app/yqwii"
          alt="twitter-icon"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
      <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? "Sign Out" : "Sign In"} />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  );
};

export default Sidebar;
