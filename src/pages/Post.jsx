import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userid === userData.$id : false;

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
        appwriteService.deleteFile(post.featuredimage);
        navigate("/all-posts");
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return post ? (
    <div className="py-12">
      <Container>
        <article className="max-w-3xl mx-auto text-left">
          <div className="w-full mb-10 overflow-hidden rounded-2xl shadow-sm border border-slate-200 bg-white">
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="w-full aspect-video object-cover transition-transform duration-700 hover:scale-105"
              width="100%"
              height="auto"
            />
          </div>

          <header className="mb-10 border-b border-slate-100 pb-8">
            {/* Serif Typography for Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-serif leading-tight tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 text-slate-500 mb-6 text-sm font-medium">
              <span className="font-semibold text-slate-700">Published:</span>
              <time dateTime={post.$createdAt}>
                {formatDate(post.$createdAt)}
              </time>
              <span className="mx-1">•</span>
              {/* <span className="font-semibold text-slate-700">by {post.authorName || 'Anonymous'}</span> */}
            </div>

            {isAuthor && (
              <div className="flex items-center justify-start gap-4">
                <Link
                  to={`/edit-post/${post.$id}`}
                  className="inline-flex items-center px-5 py-2 text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full hover:bg-indigo-100 transition-colors duration-200"
                >
                  Edit Post
                </Link>
                <button
                  onClick={deletePost}
                  className="inline-flex items-center px-5 py-2 text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-100 rounded-full hover:bg-rose-100 transition-colors duration-200"
                >
                  Delete Post
                </button>
              </div>
            )}
          </header>

          <div className="text-lg md:text-xl font-serif text-slate-800 leading-relaxed tracking-wide browser-css">
            {parse(post.content)}
          </div>
        </article>
      </Container>
    </div>
  ) : null;
}
