import { useState, createContext, useContext } from 'react'
import { createRandomPost } from './App'

const PostContext = createContext()

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  )
  const [searchQuery, setSearchQuery] = useState('')

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
      : posts

  function handleAddPost (post) {
    setPosts((posts) => [post, ...posts])
  }

  function handleClearPosts () {
    setPosts([])
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePosts = () => {
  const context = useContext(PostContext)
  if (context === undefined) throw new Error('PostContext was used outside PostProvider')
  return context
}
