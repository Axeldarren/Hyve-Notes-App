import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {

  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {/* image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image src={post.img} className="rounded-2xl object-cover" w="735" />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <div className="flex items-center gap-2">
          <Link to={`/${post.slug}`} className="text-4xl font-semibold">
            {post.title}
          </Link>
          {/* verified */}
          {post.approved && (
            <Image
              src="verified.svg"
              className="w-5 h-5 text-green-500"
              title="Approved Post"
            />
          )}
        </div>
        {/* other details */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link
            className="text-yellow-600"
            to={`/posts?author=${post.user.username}`}
          >
            {post.user.username}
          </Link>
          <span>on</span>
          <Link className="text-yellow-600">{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>{post.desc}</p>
        <Link
          to={`/${post.slug}`}
          className="underline text-yellow-600 text-sm"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
