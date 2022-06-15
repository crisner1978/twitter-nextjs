import { Comment, Tweet } from "../typings";

export const fetchTweets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`);

  const data = await res.json();
  const tweets: Tweet[] = data.tweets;

  return tweets;
};

export const fetchComments = async (tweetId: string) => {
    const res = await fetch(`/api/getComments?tweetId=${tweetId}`)

    const comments: Comment[] = await res.json()

    return comments
}
