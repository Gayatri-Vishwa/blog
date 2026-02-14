import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/outline"; // user icon


function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  // useEffect(() => {
  //         appwriteService.getPost().then((posts) => {
  //     if (posts) {
  //         setPosts(posts.documents)
  //     }
  // })
  // }, [])

  useEffect(() => {
    if (userData) {
      appwriteService.getUserPosts(userData.$id).then((res) => {
        if (res) setPosts(res.documents);
      });
    }
  }, [userData]);

  return (
    <div className="w-full py-8">
      <Container>
          <div className="flex items-center space-x-3 mb-5">
      {/* User Icon */}
      <UserCircleIcon className="w-8 h-8 text-gray-700 dark:text-gray-200" />

      {/* Heading Text */}
      <h1 className="text-gray-900 dark:text-gray-100 font-semibold text-2xl sm:text-3xl">
        {userData ? `${userData.name}'s Posts` : "My Posts..."}
      </h1>
    </div>

        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
