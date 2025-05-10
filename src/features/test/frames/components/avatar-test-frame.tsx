import { Avatar } from '@/features/core';

export function AvatarTestFrame() {
  return (
    <div>
      <h1 className="text-title-1 p-10">Avatar</h1>
      <div className="flex w-2/3 flex-wrap gap-5 px-10">
        {Array.from(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ김이박정최조강윤장임한오서신권황안송유류홍',
        ).map((char, index) => (
          <Avatar
            key={char}
            name={char}
            seed={index}
            className="rounded-xl"
            size={Math.random() * (125 / 4) + 16}
          />
        ))}
      </div>
      <div className="mt-10 flex w-2/3 flex-wrap gap-5 px-10">
        {Array.from({ length: 32 }).map((_, index) => (
          <Avatar
            key={index}
            img={`https://picsum.photos/id/${index + 10}/200`}
            className="rounded-xl"
            size={Math.random() * (125 / 4) + 16}
          />
        ))}
      </div>
    </div>
  );
}
