import { useState, type FormEvent } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim) return;
    onAdd(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow p-2 border rounded"
        placeholder="What needs to be done?"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
