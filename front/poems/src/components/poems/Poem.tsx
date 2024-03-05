import React, { useState } from 'react';
import { createPoem } from '../../features/poems/poemSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Token } from '../../types/token';


const Poem: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [poetStyle, setPoetStyle] = useState('');
  const dispatch = useAppDispatch();

  const tokenString = localStorage.getItem('token');
  const token: Token = JSON.parse(tokenString!);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch createPoem only if both inputText and poetStyle are not empty
    if (inputText.trim() !== '' && poetStyle.trim() !== '') {
      dispatch(createPoem({ inputText, poetStyle, userId: token.id }));
      console.log('poem: ',{ inputText, poetStyle, userId: token.id });
      
    }
    setInputText('');
    setPoetStyle('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Input Text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <select
          value={poetStyle}
          onChange={(e) => setPoetStyle(e.target.value)}
        >
          <option value="">Select Poet Style</option>
          <option value="EDGAR_ALLAN_POE">Edgar Allan Poe</option>
          <option value="WILLIAM_SHAKESPEARE">William Shakespeare</option>
          <option value="EMILY_DICKINSON">Emily Dickinson</option>
          <option value="LANGSTON_HUGHES">Langston Hughes</option>
          <option value="ROBERT_FROST">Robert Frost</option>
          <option value="HP_LOVECRAFT">H.P. Lovecraft</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Poem;
