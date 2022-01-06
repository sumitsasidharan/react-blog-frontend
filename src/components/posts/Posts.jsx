import Post from '../post/Post';
import './Posts.css';

const Posts = ({ posts }) => {
   return (
      <div className="Posts">
         {posts.map((post) => (
            <Post key={post._id} post={post} />
         ))}
      </div>
   );
};

export default Posts;
