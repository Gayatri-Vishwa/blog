import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const userData = useSelector((state) => state.auth.userData) || null;

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const [showVideo, setShowVideo] = useState(false); // ✅ toggle state

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!post) return;
    appwriteService.getLikes(post.$id).then(setLikes);
  }, [post]);

  const handleLike = async () => {
    if (!userData) {
      alert("Please login first");
      return;
    }
    const res = await appwriteService.toggleLike(post.$id, userData.$id);
    setLiked(res);
    setLikes((prev) => (res ? prev + 1 : prev - 1));
  };

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-6 px-4 sm:px-6 lg:px-10 ">
      <Container>
        <div className="max-w-4xl mx-auto ">
          {/* Back Button */}
          <Button
            bgColor="bg-gray-400 dark:bg-gray-700"
            className="mb-4 text-sm sm:text-base hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>

       




{/* Video / Image Display */}
{/* <div className="mb-4 border border-gray-300 dark:border-gray-700 shadow-md rounded-xl
"> */}
<div className="mb-4 border border-gray-300 dark:border-gray-700 rounded-xl
  shadow-2xl dark:shadow-[0_10px_25px_rgba(255,255,255,0.2)]
  bg-gray-50 dark:bg-gray-900 p-4 transition-all duration-300">
  {/* content */}

  {post.featuredVideo ? (
    <>
      {/* Animated Button */}
      <button
        onClick={() => setShowVideo(prev => !prev)}
        className={`
          px-4 py-2 rounded-lg font-semibold
          bg-[#879cb3] text-e7ecef
          focus:outline-none
          transition-transform duration-300
          animate-pulse
          hover:scale-105 hover:bg-[#274c77]
        `}
      >
        {showVideo ? "Hide Video" : "Show Video"}
      </button>

      {/* Video */}
      <div className="mt-2 overflow-hidden rounded-xl transition-all duration-500">
        {showVideo ? (
          <video
            width="100%"
            controls
            className="rounded-xl shadow-lg w-full max-h-[500px] object-contain"
          >
            <source
              src={appwriteService.getFilePreview(post.featuredVideo)}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full max-h-96 object-contain shadow-lg"
          />
        )}
      </div>
    </>
  ) : (
    // Agar video nahi hai, sirf image
    <img
      src={appwriteService.getFilePreview(post.featuredImage)}
      alt={post.title}
      className="rounded-xl w-full max-h-96 object-contain  mb-4"
    />
  )}
</div>

          {/* Author buttons */}
          {isAuthor && (
            <div className="flex flex-wrap gap-2 mb-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-gray-800 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  className="text-gray-800 dark:text-gray-100 text-sm sm:text-base "
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-gray-800 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                className="text-gray-800 dark:text-gray-100 text-sm sm:text-base"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-gray-100">
            {post.title}
          </h1>

          {/* Content */}
          <div className=" max-w-full dark:prose-invert text-gray-800 dark:text-gray-100 mb-6">
            {parse(String(post?.content || ""))}
          </div>

          {/* Likes */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className="text-2xl sm:text-3xl focus:outline-none"
            >
              {liked ? "❤️" : "🤍"}
            </button>
            <span className="text-lg sm:text-xl">{likes}</span>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
