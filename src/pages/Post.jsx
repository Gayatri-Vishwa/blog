

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components/index";

function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((res) => {
        if (res) {
          setPost(res);
        } else {
          navigate("/"); // redirect if slug not found
        }
      });
    }
  }, [slug, navigate]);

  if (!post) return null;

  return (
    <Container>
      <div className="py-8 ">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.featuredImage && (
          <div className="w-full h-48 overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="mb-6 rounded-lg"
          />
          </div>
        )}
        <PostCard {...post} />
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </Container>
  );
}

export default Post;
