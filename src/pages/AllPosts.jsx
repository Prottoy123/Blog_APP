import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Query } from "appwrite";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("public");
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) setUser(userData);
    });
  }, []);

  useEffect(() => {
    if (view === "public") {
      appwriteService.getPosts().then((res) => {
        if (res) setPosts(res.documents);
      });
    } else if (view === "myPosts" && user) {
      appwriteService
        .getPosts([Query.equal("userid", user.$id)])
        .then((res) => {
          if (res) setPosts(res.documents);
        });
    }
  }, [view, user]);

  return (
    <div className="w-full py-12">
      <Container>
        <div className="flex justify-center mb-14">
          <div className="relative bg-gray-200 dark:bg-slate-800 p-1 rounded-full flex items-center w-72 h-12 shadow-inner">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-orange-500 rounded-full transition-all duration-300 ease-out shadow-lg ${view === "public" ? "left-1" : "left-[calc(50%+1px)]"}`}
            ></div>
            <button
              onClick={() => setView("public")}
              className={`relative z-10 w-1/2 text-sm font-bold transition-colors duration-300 ${view === "public" ? "text-white" : "text-gray-500 hover:text-orange-400 hover:cursor-pointer"}`}
            >
              Public Feed
            </button>
            <button
              onClick={() => setView("myPosts")}
              className={`relative z-10 w-1/2 text-sm font-bold transition-colors duration-300 ${view === "myPosts" ? "text-white" : "text-gray-500 hover:text-orange-400 hover:cursor-pointer"}`}
            >
              My Posts & Drafts
            </button>
          </div>
        </div>

        {/* --- POSTS GRID ENHANCEMENT --- */}
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white/40 backdrop-blur-md rounded-[2rem] border border-slate-200/60 shadow-sm">
            <div className="w-16 h-16 mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-slate-400">📄</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-600">
              No posts found in this section.
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Check back later or write a new post.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {posts.map((post) => (
              <div key={post.$id} className="group relative h-full">
                {post.status === "inactive" && (
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-slate-100 uppercase">
                      Draft
                    </span>
                  </div>
                )}

                <div className="h-full">
                  <PostCard {...post} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
