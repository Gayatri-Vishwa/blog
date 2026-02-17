import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";
function Home() {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //     appwriteService.getPosts().then((posts) => {
  //         if (posts) {
  //             setPosts(posts.documents)
  //         }
  //     })
  // }, [])
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    appwriteService.getHomePosts().then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  // if (posts.length === 0) {
  if (!userData  ) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-20  rounded-xl shadow-sm mt-3">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {/* Share Your Knowledge With The World */}
            ThinkNest — Learn Smart, Score Better
          </h1>
          <p className="text-lg opacity-80 mb-6">
          A platform where students share and access study notes for exams and interview preparation
          </p>
        <p className="text-sm opacity-70 mt-6">
  Please read our Posting Guidelines before publishing articles.
  <a href="/guidelines" className="underline ml-1 font-medium text-blue-500 hover:text-blue-700">
    View Guidelines
  </a>
</p>

          <br />
          <a
            href="/all-posts"
            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition"
          >
            Explore Articles
          </a>
        </div>
      </div>

      <div className="w-full py-8 px-4">
        <Container>
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
    </>
  );
}

export default Home;
