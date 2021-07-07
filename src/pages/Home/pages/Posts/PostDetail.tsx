//@ts-ignore
import axios from "axios";
//@ts-ignore
import { useEffect, useState } from "react";
//@ts-ignore
import { useParams } from "react-router-dom";

type Post = {
    id: string;
    userId: string;
    title: string;
    body: string;
}

const PostDetail = () => {
  const postId = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post>({
    id: postId.id,
    title: "",
    body: "",
    userId: "",
  });

  const getPostById = (id: string) => {
       console.log(id);
       
    axios
      .get("https://jsonplaceholder.typicode.com/posts/" + id)
      .then((res) => {
        if (res.status === 200) {
          setPost(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPostById(postId.id);
  }, [post]);

  return (
    <div className="bg-white sm:w-10/12 w-11/12 ml-4 sm:ml-36 mt-3 mb-16 sm:mt-7 rounded">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <h1 className="font-bold text-xl">Post Detail Page</h1>
          <p>ID: {post.id}</p>
          <p>Title: {post.title}</p>
          <p>Body: {post.body}</p>
        </div>
      )}
    </div>
  );
};

export default PostDetail;