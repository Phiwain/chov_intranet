import { User } from "@prisma/client";
import FriendRequests from "./FriendRequests";
import UserInfoCard from "./UserInfoCard";
import { Suspense } from "react";
import ProfileCard from "@/components/rightMenu/ProfileCard";

const RightMenu = ({ user, type }: { user?: User; type: "home" | "profile" }) => {
  return (
      <div className='flex flex-col gap-6'>

          {type === "home" && <ProfileCard/>}
          {user ? (
              <>
                  <Suspense fallback="Chargement">
                      <UserInfoCard user={user}/>
                  </Suspense>
              </>
          ) : null}
          <FriendRequests/>
      </div>
  );
};

export default RightMenu;
