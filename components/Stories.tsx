export default function Stories({ stories }: { stories: string[] }) {
  if (stories?.length === 0) {
    return <h1 className="w-full bg-gray-400 p-2">ALl The stories</h1>;
  }
  return (
    <header>
      {stories.map((story) => (
        <div key={story} className="rounded-full border-4 w-5 h-5"></div>
      ))}
    </header>
  );
}
