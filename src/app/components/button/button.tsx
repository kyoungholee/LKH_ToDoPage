'use client';

interface ButtonProps {
  name: string;
  onClick: () => void;
}

export default function Button({ name, onClick }: ButtonProps) {
  const isDelete = name.includes('할 일');
  const buttonColor = isDelete ? 'bg-gray-400' : 'bg-blue-500';

  return (
    <button
      onClick={onClick}
      className={`text-white px-4 py-2 rounded-lg ${buttonColor} transition shadow-md`}
    >
      {name}
    </button>
  );
}
