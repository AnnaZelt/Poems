import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { deletePoem, fetchPoems } from '../../features/poems/poemSlice';
import { Token } from '../../types/token';
import { v4 as uuidv4 } from 'uuid';

const tokenString = localStorage.getItem('token');
const token: Token = JSON.parse(tokenString!);

interface PoemListProps {
  onFetchPoemDetail: (userId: number) => void;
  onDeletePoem: (id: number) => void;
  onFetchPoems: () => void;
}

const PoemList: React.FC<PoemListProps> = ({ onFetchPoemDetail, onDeletePoem }) => {
  const dispatch = useDispatch<AppDispatch>();
  const poems = useSelector((state: RootState) => state.poems.poems);
  const [selectedPoem, setSelectedPoem] = useState<string | null>(null);
  const [showPoems, setShowPoems] = useState(false); // State to track if poems are shown or not

  const handleFetchPoems = () => {
    if (!token) {
      console.log('Token expired');
    } else {
      dispatch(fetchPoems());
      setShowPoems(true); // Show poems when fetched
    }
  };

  const handleDeletePoem = (id: number) => {
    if (!token) {
      console.log('token expired');
    } else {
      dispatch(deletePoem(id));
    }
  };

  const handlePoemClick = (poemText: string) => {
    setSelectedPoem(poemText);
  };

  const togglePoemsVisibility = () => {
    setShowPoems((prevShowPoems) => !prevShowPoems); // Toggle the state between true and false
  };

  return (
    <div>
      <h2>Poems</h2>
      <button onClick={showPoems ? togglePoemsVisibility : handleFetchPoems}>
        {showPoems ? 'Close Poems' : 'Show Poems'}
      </button>
      {showPoems && (
  <ul>
    {poems.map((poem) => (
        poem.is_active ? (
          <li key={uuidv4()}>
            {poem.poem_text.length > 50 ? `${poem.poem_text.slice(0, 50)}...` : poem.poem_text}
            <button onClick={() => handlePoemClick(poem.poem_text)}>Expand</button>
            <button onClick={() => handleDeletePoem(poem.id)}>Delete</button>
          </li>
        ) : null
      ))
    }
  </ul>
)}

      {selectedPoem && (
        <div className="poem-popup">
          <div className="poem-popup-content">
            <span className="close" onClick={() => setSelectedPoem(null)}>
              &times;
            </span>
            <p>{selectedPoem}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoemList;
