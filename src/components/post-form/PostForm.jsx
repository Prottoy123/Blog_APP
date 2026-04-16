import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userid: userData.$id,
          authorName: userData.name,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-2 flex flex-col gap-6 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <Input
          label="Title :"
          placeholder="Enter a captivating title"
          className="text-lg font-semibold text-slate-800"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="post-url-slug"
          className="bg-slate-50 text-slate-500"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <div className="mt-2 flex-grow">
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-slate-50/80 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm lg:sticky lg:top-28 h-fit">
        <div>
          <Input
            label="Featured Image :"
            type="file"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="w-full mt-4 overflow-hidden rounded-xl shadow-sm border border-slate-200">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>

        <Select
          options={["active", "inactive"]}
          label="Visibility Status"
          className="bg-white"
          {...register("status", { required: true })}
        />

        <button
          type="submit"
          className={`w-full px-4 py-4 mt-4 font-bold text-white transition-all duration-300 rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] ${post ? "bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500" : "bg-slate-900 hover:bg-slate-800 focus:ring-slate-900"}`}
        >
          {post ? "Update Post" : "Publish Post"}
        </button>
      </div>
    </form>
  );
}
