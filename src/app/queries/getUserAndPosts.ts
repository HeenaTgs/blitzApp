import db from "db"

type GetUserAndPostsInput = {
  userId: number
}

type GetUserAndPostsOutput = {
  user2: { id: number; name: string; email: string }
  posts: { id: number; title: string; content: string }[]
}

export default async function getUserAndPosts({
  userId,
}: GetUserAndPostsInput): Promise<GetUserAndPostsOutput> {
  const [user2, posts] = await Promise.all([
    db.user2.findUnique({
      where: { id: userId },
    }),
    console.log("dfjdnj----------", user2),

    db.post.findMany({
      where: { userId },
    }),
  ])

  return { user2, posts }
}
