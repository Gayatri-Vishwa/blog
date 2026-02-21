

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const initialTitle = post?.title || ""; // Store initial title for comparison
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  // Update slug when title changes
  // React.useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     if (name === "title") {
  //       setValue("slug", slugTransform(value.title), { shouldValidate: true });
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch, slugTransform, setValue]);
  // const initialTitle = post?.title || "";

React.useEffect(() => {
  const subscription = watch((value, { name }) => {
    if (name === "title") {
      const newTitle = value.title?.trim() || "";

      // Only update slug if title changed significantly
      if (newTitle && newTitle !== initialTitle) {
        setValue("slug", slugTransform(newTitle), { shouldValidate: true });
      } else {
        setValue("slug", "", { shouldValidate: true }); // or leave old slug if you want
      }
    }
  });
  return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue, initialTitle]);

  const submit = async (data) => {
    try {
      if (data.video && data.video[0] && data.video[0].size > 5 * 1024 * 1024) {
  throw new Error("Video too large for your Appwrite plan (max 5MB).");
}
      let videoFile = null;
      if (data.video && data.video.length > 0) {
        videoFile = await appwriteService.uploadFile(data.video[0]);
        if (!videoFile) throw new Error("Video upload failed");

        // Agar update ho raha hai, purana video delete karo
        if (post?.featuredVideo) {
          await appwriteService.deleteFile(post.featuredVideo);
        }
      }
      toast.loading("Submitting post...");
        // Check if title changed (for update)
    if (post && data.title.trim() === initialTitle) {
      toast.error("Please change the title a little to update slug!");
      return;
    }

      if (!userData) throw new Error("User data not loaded");

      if (post) {
        // UPDATE POST
        let file = null;
        if (data.image && data.image.length > 0) {
          file = await appwriteService.uploadFile(data.image[0]);
          if (!file) throw new Error("Image upload failed");
        }

        if (file && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
            featuredVideo: videoFile ? videoFile.$id : post.featuredVideo,
        });

        if (dbPost) {
          toast.dismiss();
          toast.success("Post updated successfully!");
          navigate(`/post/${dbPost.slug}`);
        }
      } else {
        // CREATE POST
        if (!data.image || data.image.length === 0)
          throw new Error("Featured image is required");

        const file = await appwriteService.uploadFile(data.image[0]);
        if (!file) throw new Error("Image upload failed");

        const postData = {
          title: data.title,
          content: data.content,
          slug: slugTransform(data.title),
          status: data.status,
          featuredImage: file.$id,
           featuredVideo: videoFile ? videoFile.$id : null, // for video
          userId: userData?.$id,
        };

        const dbPost = await appwriteService.createPost(postData);

        if (dbPost) {
          toast.dismiss();
          toast.success("Post created successfully!");
          navigate(`/post/${postData.slug}`);
        }
      }
    } catch (err) {
      toast.dismiss();
       if (post && data.title.trim() === initialTitle) {
      toast.error("Please change the title a little to update slug!");
      return;}
      toast.error(err?.message || "Something went wrong!");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit, (errors) => {
        // 🔹 Field-level validation toast
        if (errors.title) toast.error("Title is required");
        if (errors.slug) toast.error("Slug is required");
        if (!post && errors.image) toast.error("Featured image is required");
      })}
      className="flex flex-col md:flex-row md:space-x-4 space-y-4"
    >
      {/* Left column */}
      <div className="w-full md:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right column */}
      <div className="w-full md:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              width="200"
              className="rounded-lg"
            />
          </div>
        )}
        <Input
          label="Featured Video :"
          type="file"
          className="mb-4"
          placeholder="Upload a short video (mp4, webm)"
          accept="video/mp4,video/webm,video/ogg"
          {...register("video", { required: false })}
        />

        {post?.featuredVideo && (
          <div className="w-full mb-4">
            <video width="200" controls>
              <source
                src={appwriteService.getFilePreview(post.featuredVideo)}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          disabled={!userData}
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {userData ? (post ? "Update" : "Submit") : "Loading user..."}
        </Button>
      </div>
    </form>
  );
}
