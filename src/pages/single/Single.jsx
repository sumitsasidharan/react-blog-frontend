import Sidebar from '../../components/sidebar/Sidebar';
import SinglePost from '../../components/singlePost/SinglePost';
import './Single.css';

const Single = () => {
   return (
      <div className="Single">
         <SinglePost />
         <Sidebar />
      </div>
   );
};

export default Single;
