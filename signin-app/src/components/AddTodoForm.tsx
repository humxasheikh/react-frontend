import { useState, type FormEvent } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

const AddTodoForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-2">
      <input
        type="text"
        placeholder="Add new todo..."
        className="flex-grow bg-white border-black rounded text-2xl"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
