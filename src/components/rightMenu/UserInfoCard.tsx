import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = auth();

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });

    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);
    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    followRes ? (isFollowing = true) : (isFollowing = false);
    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });

    followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Informations utilisateur</span>
        {currentUserId === user.id ? (
          <UpdateUser user={user}/>
        ) : (
          <Link href="/" className="text-blue-500 text-xs">
            Voir plus
          </Link>
        )}
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {" "}
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </span>
        </div>

        {user.service && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="" width={16} height={16} />
            <span>
              Service: <b>{user.service}</b>
            </span>
          </div>
        )}
        {user.metier && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="" width={16} height={16} />
            <span>
              Métier: <b>{user.metier}</b>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          {user.site && (
            <div className="flex gap-1 items-center">
              <Image src="/link.png" alt="" width={16} height={16} />
              <span>
              Site de  <b>{user.site}</b>
            </span>
            </div>
          )}
        </div>
        {currentUserId && currentUserId !== user.id && (
          <UserInfoCardInteraction
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
