import Link from "next/link";

export function CopyButton({
  children,
  postid,
}: {
  children: React.ReactNode;
  postid: number;
}) {
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(
          `http://localhost:3000/post/${postid}`
        );
      }}
    >
      {children}
    </button>
  );
}

export function WhatsappShareButton({
  children,
  postid,
}: {
  children: React.ReactNode;
  postid: number;
}) {
  return (
    <button
      onClick={() => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          `http://localhost:3000/post/${postid}`
        )}`;
        window.open(whatsappUrl, "_blank");
      }}
    >
      {children}
    </button>
  );
}

export function FacebookShareButton({
  children,
  postid,
}: {
  children: React.ReactNode;
  postid: number;
}) {
  return (
    <button
      onClick={() => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            `http://localhost:3000/post/${postid}`
          )}`,
          "_blank"
        );
      }}
    >
      {children}
    </button>
  );
}

export function AboutUserLink({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  return <Link href={`/${username}`}>{children}</Link>;
}
