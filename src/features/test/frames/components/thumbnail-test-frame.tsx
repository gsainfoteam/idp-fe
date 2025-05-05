import { Thumbnail } from '@/features/core';

export function ThumbnailTestFrame() {
  return (
    <div>
      <h1 className="text-title-1 p-10">Thumbnail</h1>
      <div className="flex w-1/2 flex-wrap gap-5 px-10">
        {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((char) => (
          <Thumbnail key={char} name={char} />
        ))}
        {Array.from({ length: 14 }).map((_, index) => (
          <Thumbnail
            key={index}
            img={`https://picsum.photos/id/${index + 10}/200`}
          />
        ))}
      </div>
    </div>
  );
}
