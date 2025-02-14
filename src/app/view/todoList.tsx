'use client';

import Button from '../components/button/button';

export default function TodoList() {
  const boardList = [
    {
      id: 1,
      title: '할일',
      todoList: [
        {
          id: 1,
          title: '대청소',
          des: '청소',
          date: '2024-02-14',
        },
      ],
    },
    {
      id: 2,
      title: '하는중',
      todoList: [
        {
          id: 1,
          title: '대청소',
          des: '빨래',
          date: '2024-02-14',
        },
      ],
    },
    {
      id: 3,
      title: '마감',
      todoList: [
        {
          id: 1,
          title: '대청소',
          des: '설거지',
          date: '2024-02-14',
        },
      ],
    },
  ];

  const createBoard = () => {
    alert('생성합니다.!!!');
  };
  const deleteBoard = () => {
    alert('삭제합니다.');
  };

  return (
    <>
      <h1 className="text-center">List 페이지입니다.</h1>
      <ul className="flex bg-sky-400 justify-around">
        {boardList.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <ul className="mt-2">
              {item.todoList.map((todo) => (
                <li key={todo.id} className="p-2 border-b">
                  <p className="font-semibold">{todo.title}</p>
                  <p className="text-sm text-gray-600">{todo.des}</p>
                  <p className="text-xs text-gray-500">{todo.date}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Button name="생성하기" onClick={createBoard} />
      <Button name="삭제하기" onClick={deleteBoard} />
    </>
  );
}
