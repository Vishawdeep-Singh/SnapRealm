import { Input } from "../ui/input";
import NewPostSubmitButton from "./NewPostSubmitButton";
import { CreatePost } from "@/actions/CreatePostAction";

export default function NewPostForm() {
  return (
    <div className="w-[30%] rounded-sm bg-gray-500 p-5 text-dark">
      <form action={CreatePost}>
        <div className="form-control">
          <label htmlFor="media">Image</label>
          <Input type="file" id="media" name="media" multiple />
        </div>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <Input type="text" id="title" name="title" />
        </div>
        <div className="form-control">
          <label htmlFor="description">About the post</label>
          <textarea
            className="text-black w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
            id="description"
            name="description"
            rows={5}
          />
        </div>
        <div className="flex justify-evenly items-center">
          <NewPostSubmitButton />
        </div>
      </form>
    </div>
  );
}
