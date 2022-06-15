import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { FormEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TimeAgo from "react-timeago";
import { fetchComments } from "../lib/queries";
import { Comment, CommentBody, Tweet } from "../typings";

interface Props {
  tweet: Tweet;
}

const TweetItem = ({ tweet }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState<string>("");
  const [boxOpen, setBoxOpen] = useState<boolean>(false);
  const { data: session } = useSession()

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  async function postComment() {
    const commentInfo: CommentBody = {
      comment: input,
      username: session?.user?.name || "Unknown User",
      profileImage: session?.user?.image || 'https://res.cloudinary.com/dtram9qiy/image/upload/v1655284428/my-upload/i1rnmobmhwruexhhs1vr.png',
      tweetId: tweet._id,
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentInfo),
      method: 'POST',
    })

    const data = await result.json()
    const newComments = await fetchComments(tweet._id)
    setComments(newComments)

    toast("Comment Posted!", {
      icon: '🚀',
    })
    return data
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    postComment()

    setInput("")
    setBoxOpen(false)
  }

  return (
    <div className="flex flex-col space-x-3 p-5 border-y border-gray-100">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImage}
          alt={tweet.username}
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="sm:mr-1 font-bold">
              {tweet.username}
              <span className="text-gray-500 sm:hidden text-sm"> ◦</span>
            </p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()} ◦
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p className="pt-1">{tweet.text}</p>
          {tweet.image && (
            <img
              className="m-5 ml-0 mb-1 max-h-80 rounded-lg object-cover shadow-sm"
              src={tweet.image}
              alt={tweet._type}
            />
          )}
        </div>
      </div>
      <div className="flex justify-between mt-5 sm:px-5">
        <div className="tweetIcons" onClick={() => session && setBoxOpen(!boxOpen)}>
          <ChatAlt2Icon className="h-5 w-5" />
          <p className="text-twitter">{comments?.length}</p>
        </div>
        <div className="tweetIcons">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="tweetIcons">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="tweetIcons">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {/* Comment Box */}
      {boxOpen && (
        <form onSubmit={handleSubmit} className="mt-3 space-x-3 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            type="text"
            placeholder="Write a comment..."
          />
          <button disabled={!input} className="text-twitter disabled:text-gray-200">
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments?.map((comment) => (
            <div key={comment._id} className="flex space-x-2 relative">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter" />
              <img
                className="mt-2 h-7 w-7 object-cover rounded-full"
                src={comment.profileImage}
                alt={comment.username}
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">
                    {comment.username}
                    <span className="text-gray-500 lg:hidden text-sm"> ◦</span>
                  </p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, "").toLowerCase()} ◦
                  </p>
                  <TimeAgo
                    date={comment._createdAt}
                    className="text-sm text-gray-500"
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TweetItem;

// const [comments, setComments] = useState<Comment[]>([]);

// const refreshComments = async () => {
//   const comments: Comment[] = await fetchComments(tweet._id);
//   setComments(comments);
// };

// useEffect(() => {
//   refreshComments();
// }, []);
