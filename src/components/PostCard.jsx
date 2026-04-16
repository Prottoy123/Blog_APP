import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimage, $createdAt, authorName }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Link to={`/post/${$id}`} className="block h-full">
 
      <div className="w-full h-full bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
        <div className="w-full overflow-hidden rounded-xl mb-4 bg-slate-50 relative">
          {featuredimage && (
            <img
              src={appwriteService.getFilePreview(featuredimage)}
              alt={title}
              className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          )}
        </div>

        <div className="px-2 pb-2 flex-grow flex flex-col">
          <h2 className="text-xl font-bold text-slate-800 font-serif leading-snug mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors duration-200">
            {title}
          </h2>

          <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-[10px] font-bold">
                {authorName ? authorName.charAt(0).toUpperCase() : "A"}
              </div>
              <span className="text-xs font-semibold text-slate-600 truncate max-w-[100px]">
                {authorName || "Anonymous"}
              </span>
            </div>

            <time className="text-[11px] font-medium text-slate-400">
              {formatDate($createdAt)}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
