import React, { useState, useEffect } from 'react';
import { createPoem } from '../../features/poems/poemSlice';
import { Token } from '../../types/token';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { Poemtype } from '../../types/poem';

const Poem: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [poetStyle, setPoetStyle] = useState('');
  const [showPoem, setShowPoem] = useState(false);
  const [poem, setPoem] = useState<Poemtype | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState('');

  const tokenString = localStorage.getItem('token');
  const token: Token = JSON.parse(tokenString!);

  useEffect(() => {
    if (poem && showPopup && popupText.length < poem.poem_text.length) {
      const interval = setInterval(() => {
        setPopupText((prevText) => {
          const nextChar = poem.poem_text[prevText.length];
          return prevText + nextChar;
        });
      }, 25);
      return () => clearInterval(interval);
    }
  }, [poem, showPopup, popupText]);  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (inputText.trim() !== '' && poetStyle.trim() !== '') {
      dispatch(createPoem({ inputText, poetStyle, userId: token?.id ?? null })).then((action) => {
        if (createPoem.fulfilled.match(action)) {
          setPoem(action.payload); // Update the poem state with the newly created poem
          setLoading(false); // Hide the spinner
          setShowPoem(true); // Show the poem
          setShowPopup(true); // Show the popup
        }
      });
    }
    setInputText('');
    setPoetStyle('');
  };
  
  return (
    <div>
      {!token && <p className='p-tag'>
        Welcome to my poem generator! Here you can try your hand at generating your very own poem!<br/>
        Just input a prompt of your choosing, select the style of the poet you want, and the A.I - powered
        poem generator will write a poem uniquely for you.
        Try it:
      </p>}
      <form onSubmit={handleSubmit}>
        <textarea
          className="poem-input"
          placeholder="Write your prompt"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <select
          className="poet-style"
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
      {showPopup && (
        <div className="poem-popup">
          <div className="poem-popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <p>{popupText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Poem;
