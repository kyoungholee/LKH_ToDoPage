'use client';

interface ButtonPros {
  name: string;
  onClick: () => void;
}

export default function Button({ name, onClick }: ButtonPros) {
  return (
    <>
      <button className="rounded-md w-5" onClick={onClick}>
        {name}
      </button>
    </>
  );
}
