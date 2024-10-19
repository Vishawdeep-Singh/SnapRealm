import { Input } from "../ui/input";
import NewPostSubmitButton from "./NewPostSubmitButton";
import { CreatePost } from "@/actions/CreatePostAction";

export default function NewPostForm() {
  return (
    <div className="w-[30%] rounded-sm bg-gray-500 p-5 text-dark bg-transparent border-2 border-white shadow-[0_0_4px_0_rgba(255,255,255,0.5)]">
      <form action={CreatePost} className="flex flex-col space-y-5">
        <div>
          <Input type="file" id="media" name="media" multiple />
        </div>
        <div>
          <Input
            className="bg-transparent border-none outline-none"
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div>
          <textarea
            className="dark bg-transparent text-white w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
            id="description"
            name="description"
            placeholder="Describe the post....."
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
