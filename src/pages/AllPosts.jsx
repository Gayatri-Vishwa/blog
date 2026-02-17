import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";
function AllPosts() {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //     appwriteService.getPosts().then((posts) => {
  //         if (posts) {
  //             setPosts(posts.documents)
  //         }
  //     })
  // }, [])

  useEffect(() => {
    appwriteService.getPublicPosts().then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
              Loading...
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-gray-900 dark:text-gray-100 font-bold text-2xl sm:text-3xl mb-5
  drop-shadow-md">
  All Posts...
</h1>

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
