import SearchBar from "@/components/Explore/SearchBar";

export default function ExplorePage() {
  return (
    <main className="m-auto flex flex-col justify-start items-center w-[70%] h-screen space-y-5 mt-4">
      <SearchBar />
      <div className="h-1 bg-white rounded-full w-full mx-2" />
    </main>
  );
}
