import useAxiosSecure from '@/hooks/useAxiosSecure';
import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaRegBookmark } from 'react-icons/fa';

import { Link } from 'react-router-dom';

const BlogCard = ({ blog, wishlistBlogId }) => {
  const { user } = useContext(AuthContext);
  const { blog_title, imageUrl, author, shortDescription, longDescription, category, _id } = blog;
  const axiosSecure = useAxiosSecure();

  const handleBookmark = async (id) => {
    if (!user) {
      toast.error('Please login to bookmark', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '14px 20px',
        },
      });
      return;
    }
    const { data } = await axiosSecure.get(`/blogs/${id}`);
    const { blog_title, imageUrl, author, shortDescription, longDescription, category, postedTime, _id } = data;
    const toSaveData = {
      blog_title,
      imageUrl,
      author,
      shortDescription,
      longDescription,
      category,
      postedTime,
      savedEmail: user?.email,
      mainBlogId: _id,
    };
    const { data: res } = await axiosSecure.post('/add-wishlist', toSaveData);
    try {
      if (res.insertedId) {
        toast.success('Added to wishlist', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '14px 20px',
          },
        });
      } else {
        toast.error('Already added to wishlist', {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '14px 20px',
          },
        });
      }
    } catch (error) {
      toast.error('Something went wrong', {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '14px 20px',
        },
      });
    }
  };
  return (
    <div className="h-full">
      <div className="h-full flex flex-col rounded-lg p-4 shadow-md shadow-gray-300">
        <img alt="" src={imageUrl} className="h-56 w-full rounded-md object-cover" />

        <div className="mt-2 flex flex-col justify-between h-full">
          <dl className="grow">
            <div className="flex items-center mb-4 mt-1 pt-1">
              <div>
                <dt className="sr-only">Category</dt>
                <dd>
                  <span className="text-xs bg-transparent text-primary border border-primary rounded-md py-2 px-4 capitalize font-medium">{category}</span>
                </dd>
              </div>
            </div>

            <div className="mt-2">
              <dt className="sr-only">Title</dt>
              <dd className="text-lg font-semibold text-primary">{blog_title}</dd>
            </div>

            <div className="mt-1">
              <dt className="sr-only">Short description</dt>
              <dd className="text-base font-medium text-primary/80 flex-grow">{shortDescription}</dd>
            </div>
          </dl>

          <div className="flex justify-between items-center">
            <button className="group flex items-center bg-transparent p-2 text-sm font-medium text-gray-600 mt-4 -ml-2">
              <Link
                to={`/blog-details/${wishlistBlogId ?? _id}`}
                className="relative pr-4 text-gray-900 font-semibold after:transition-transform after:duration-500 after:ease-out after:absolute after:-bottom-1 after:-left-1 after:block after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-slate-500 after:content-[''] after:group-hover:origin-bottom-left after:group-hover:scale-x-100 ">
                Read details
              </Link>
              <svg
                viewBox="0 0 46 16"
                height="10"
                width="24"
                xmlns="http://www.w3.org/2000s/svg"
                id="arrow-horizontal"
                className="-translate-x-2 fill-slate-700 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-x-105 group-hover:fill-slate-900">
                <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
              </svg>
            </button>

            <div>
              <FaRegBookmark onClick={() => handleBookmark(_id)} className="-mb-2 cursor-pointer" />
            </div>

            {/* {isDelete && (
              <div className="tooltip tooltip-left" data-tip="remove">
                <MdDelete onClick={() => deleteFunc(id)} className="text-2xl cursor-pointer -mb-3" />
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
