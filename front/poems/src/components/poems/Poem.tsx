import React, { useState } from 'react';
import { createPoem } from '../../features/poems/poemSlice';
import { Token } from '../../types/token';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Poemtype } from '../../types/poem';

const Poem: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [poetStyle, setPoetStyle] = useState('');
  const [showPoem, setShowPoem] = useState(false);
  const [poem, setPoem] = useState<Poemtype | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const tokenString = localStorage.getItem('token');
  const token: Token = JSON.parse(tokenString!);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (inputText.trim() !== '' && poetStyle.trim() !== '') {
      dispatch(createPoem({ inputText, poetStyle, userId: token?.id ?? null })).then((action) => {
        if (createPoem.fulfilled.match(action)) {
          setPoem(action.payload); // Update the poem state with the newly created poem
          setShowPoem(true); // Show the poem
        }
      });
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
      {loading && <div className="spinner"></div>}
      {showPoem && poem && (
        <div>
          <p>{poem.poem_text}</p>
          <button onClick={() => setShowPoem(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Poem;
