import BlogCard from '@/components/BlogCard';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { AuthContext } from '@/providers/AuthProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: blogs = [] } = useQuery({
    queryFn: () => getData(),
    queryKey: ['blogs', user],
  });
  console.log(blogs);

  const getData = async () => {
    const { data } = await axiosSecure(`/wishlist?email=${user?.email}`);
    return data;
  };
  return (
    <section className="container mx-auto max-sm:mt-0 mt-10">
      <header className="flex flex-col items-center justify-center space-y-4 mb-10 max-sm:mb-5">
        <h2 className="text-6xl max-sm:text-4xl mt-3 font-semibold text-primary">Wishlisted Blogs </h2>
        <p className="text-xl max-sm:px-3 max-sm:text-base font-medium text-primary/70 max-w-[600px] text-center">
          Immerse Yourself in Our Freshest Stream of Cutting-Edge Tech Insights and Narratives
        </p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-sm:px-4 min-h-44">
        {blogs.length === 0 && <p className="text-center text-base font-semibold text-lime-500 italic">No Items To Show</p>}
        {blogs.map((blog) => (
          <div key={blog._id}>
            <BlogCard blog={blog} wishlistBlogId={blog.mainBlogId} />
          </div>
        ))}
      </main>
    </section>
  );
};

export default Wishlist;
