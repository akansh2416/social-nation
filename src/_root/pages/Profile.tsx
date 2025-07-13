import {
    Route,
    Routes,
    Link,
    Outlet,
    useParams,
    useLocation,
  } from "react-router-dom";
  import { useState,useEffect } from "react";
  import { Button } from "@/components/ui";
  import { LikedPosts } from "@/_root/pages";
  import { useUserContext } from "@/context/AuthContext";
  import {
    useGetUserById,
    useFollowers,
    useFollowing,
    useFollowUser,
    useUnfollowUser,
  } from "@/lib/react-query/queries";
  import { GridPostList, Loader } from "@/components/shared";

  interface StatBlockProps {
    value: string | number;
    label: string;
  }
  
  const StatBlock = ({ value, label }: StatBlockProps) => (
    <div className="flex-center gap-2">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
  );
  
  const Profile = () => {
    const { id } = useParams();
    const { user } = useUserContext();
    const { pathname } = useLocation();
  
    const { data: currentUser, isLoading: isUserLoading, error: userError } = useGetUserById(id || "");
    const { data: followers, isLoading: isFollowersLoading } = useFollowers(id || "");
    const { data: following, isLoading: isFollowingLoading } = useFollowing(id || "");
  
    const { mutate: followUser, isLoading: isFollowLoading } = useFollowUser();
    const { mutate: unfollowUser, isLoading: isUnfollowLoading } = useUnfollowUser();
  
   //new test code
   const isCurrentUser = user.id === currentUser?.$id;

   // Define an interface for a follower document
interface Follower {
  followerId: string;
  followingId: string;
}

// ✅ Ensure correct type conversion when setting state
const [followersList, setFollowersList] = useState<Follower[]>(
  followers?.documents.map((doc: any) => ({
    followerId: doc.followerId,
    followingId: doc.followingId,
  })) || []
);

useEffect(() => {
  setFollowersList(
    followers?.documents.map((doc: any) => ({
      followerId: doc.followerId,
      followingId: doc.followingId,
    })) || []
  );
}, [followers]); // ✅ Ensure proper type when `followers` change

// ✅ `isFollowing` now has proper types
const isFollowing = followersList.some(
  (follower) => follower.followerId === currentUser?.$id && follower.followingId === user.id
);

// ✅ No more TypeScript warnings
const handleFollow = () => {
  if (!currentUser?.$id) {
    console.error("User is not logged in. Cannot follow or unfollow.");
    return;
  }

  if (isFollowing) {
    const followerDocument = followersList.find(
      (doc) => doc.followerId === currentUser.$id && doc.followingId === user.id
    );

    if (followerDocument) {
      console.log("🔴 Unfollowing:", { followerId: currentUser.$id, followingId: user.id });

      unfollowUser(
        {
          followerId: currentUser.$id,
          followingId: user.id,
        },
        {
          onSuccess: () => {
            console.log("✅ Unfollowed successfully");
            setFollowersList((prev) =>
              prev.filter((doc) => doc.followerId !== currentUser.$id || doc.followingId !== user.id)
            );
          },
          onError: (error) => console.error("❌ Error while unfollowing:", error),
        }
      );
    } else {
      console.error("❌ Follower document not found. Cannot unfollow.");
    }
  } else {
    console.log("🟢 Following:", { followerId: currentUser.$id, followingId: user.id });

    followUser(
      {
        followerId: currentUser.$id,
        followingId: user.id,
      },
      {
        onSuccess: () => {
          console.log("✅ Followed successfully");
          setFollowersList((prev) => [...prev, { followerId: currentUser.$id, followingId: user.id }]);
        },
        onError: (error) => console.error("❌ Error while following:", error),
      }
    );
  }
};


   
  //
  
    if (isUserLoading || isFollowersLoading || isFollowingLoading) {
      return (
        <div className="flex-center w-full h-full">
          <Loader />
        </div>
      );
    }
  
    if (userError) {
      return (
        <div className="flex-center w-full h-full">
          <p className="text-red-500">Failed to load user data. Please try again.</p>
        </div>
      );
    }
  
    return (
      <div className="profile-container">
        <div className="profile-inner_container">
          <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
            <img
              src={currentUser?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
            />
            <div className="flex flex-col flex-1 justify-between md:mt-2">
              <div className="flex flex-col w-full">
                <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                  {currentUser?.name}
                </h1>
                <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                  @{currentUser?.username}
                </p>
              </div>
  
              <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
                <StatBlock value={currentUser?.posts.length || 0} label="Posts" />
                <StatBlock value={followers?.documents?.length || 0} label="Following" />
                <StatBlock value={following?.documents?.length || 0} label="Followers" />
              </div>
  
              <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                {currentUser?.bio}
              </p>
            </div>
  
            <div className="flex justify-center gap-4">
              {isCurrentUser ? (
                <Link
                  to={`/update-profile/${currentUser?.$id}`}
                  className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg">
                  <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                  <p className="flex whitespace-nowrap small-medium">Edit Profile</p>
                </Link>
              ) : (
                <Button
                type="button"
                className="shad-button_primary px-8"
                onClick={handleFollow}
                disabled={isFollowLoading || isUnfollowLoading}>
                {isFollowLoading || isUnfollowLoading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
              </Button>
              )}
            </div>
          </div>
        </div>
  
        <div className="flex max-w-5xl w-full mt-8">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}>
            <img src="/assets/icons/posts.svg" alt="posts" width={20} height={20} />
            Posts
          </Link>
          {isCurrentUser && (
            <Link
              to={`/profile/${id}/liked-posts`}
              className={`profile-tab rounded-r-lg ${
                pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
              }`}>
              <img src="/assets/icons/like.svg" alt="like" width={20} height={20} />
              Liked Posts
            </Link>
          )}
        </div>
  
        <Routes>
          <Route
            index
            element={<GridPostList posts={currentUser?.posts || []} showUser={false} />}
          />
          {isCurrentUser && <Route path="/liked-posts" element={<LikedPosts />} />}
        </Routes>
        <Outlet />
      </div>
    );
  };
  
  export default Profile;
  