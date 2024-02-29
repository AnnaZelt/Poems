// front/poems/src/components/InputForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPoem } from '../../features/poems/poemSlice'; // Import the createPoem action
import { AppDispatch } from '../../redux/store';

const InputForm: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [poetStyle, setPoetStyle] = useState('');
  const dispatch = useDispatch<AppDispatch>(); // Specify the AppDispatch type

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPoem({ inputText, poetStyle })); // Dispatch the createPoem action
    setInputText('');
    setPoetStyle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Input Text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <input
        type="text"
        placeholder="Poet Style"
        value={poetStyle}
        onChange={(e) => setPoetStyle(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
