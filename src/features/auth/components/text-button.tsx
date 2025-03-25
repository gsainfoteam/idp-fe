export type ButtonProps = {
  text: string;
  width: number;
  height: number;
};

export function TextButton({ text, width, height }: ButtonProps) {
  return (
    <button
      className={`text-center w-[${width}px] h-[${height}] rounded-[8px] flex items-center justify-center`}
    >
      <p className="text-[#454545] font-normal text-[16px] leading-[150%] tracking-[0%]">
        {text}
      </p>
    </button>
  );
}
