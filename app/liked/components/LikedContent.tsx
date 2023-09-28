"use client";

import LikedButton from "@/components/LikedButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { data } from "autoprefixer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent = ({ songs }: LikedContentProps) => {
  const onPlay = useOnPlay(songs);
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div
        className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400
    "
      >
        No liked songs.
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-y-2 p-6">
      {songs.map((song) => (
        <div
          key={song.id}
          className="
            flex 
            items-center
            gap-x-4
            w-full
        "
        >
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikedButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
