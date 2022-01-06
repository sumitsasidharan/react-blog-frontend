import './Post.css';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
   const PF = 'https://source.unsplash.com/700x500/?programming';

   return (
      <div className="Post">
         {post.photo && (
            <img src={PF + post.photo} alt="blog head" className="postImg" />
         )}
         <div className="postInfo">
            <div className="postCats">
               {post.categories.map((cat) => (
                  <span className="postCat">{cat.name}</span>
               ))}
            </div>

            <Link to={`/post/${post._id}`} className="link">
               <span className="postTitle">{post.title}</span>
            </Link>

            <hr />

            <span className="postDate">
               {new Date(post.createdAt).toDateString()}
            </span>
         </div>

         <p className="postDesc">{post.desc}</p>
      </div>
   );
};

export default Post;
