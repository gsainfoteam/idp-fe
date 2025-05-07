import { Avatar } from '@/features/core';

export function AvatarTestFrame() {
  return (
    <div>
      <h1 className="text-title-1 p-10">Avatar</h1>
      <div className="flex w-1/2 flex-wrap gap-5 px-10">
        {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((char) => (
          <Avatar key={char} name={char} className="rounded-xl" />
        ))}
        {Array.from({ length: 16 }).map((_, index) => (
          <Avatar
            key={index}
            img={`https://picsum.photos/id/${index + 10}/200`}
            className="rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}
