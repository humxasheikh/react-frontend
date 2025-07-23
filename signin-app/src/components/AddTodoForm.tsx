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
    console.log(title);
    setTitle('');
  };

  return (
    <form className="flex mb-2">
      <input
        type="text"
        placeholder="Add new todo..."
        className="flex-grow bg-white border-black rounded"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button
        type="submit"
        onSubmit={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
