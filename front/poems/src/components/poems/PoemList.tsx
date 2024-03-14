import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { deletePoem, fetchPoems } from '../../features/poems/poemSlice';
import { Poemtype } from '../../types/poem';
import { v4 as uuidv4 } from 'uuid';

interface PoemListProps {
  onFetchPoemDetail: (userId: number) => void;
  onDeletePoem: (id: number) => void;
  onFetchPoems: () => void;
}

const PoemList: React.FC<PoemListProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [fetchedPoems, setFetchedPoems] = useState<Poemtype[]>([]);
  const [selectedPoem, setSelectedPoem] = useState<string | null>(null);
  const [showPoems, setShowPoems] = useState(false);

  useEffect(() => {
    if (!fetchedPoems.length) {
      dispatch(fetchPoems()).then((action) => {
        if (fetchPoems.fulfilled.match(action)) {
          setFetchedPoems(action.payload);
        } else if (fetchPoems.rejected.match(action)) {
          setMessageContent('Token expired');
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
        }
      });
    }
  }, [dispatch, fetchedPoems.length]);

  const handleDeletePoem = async (id: number) => {
    try {
      await dispatch(deletePoem(id));
      setMessageContent('Poem deleted');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      setFetchedPoems((prevPoems) => prevPoems.filter((poem) => poem.id !== id));
    } catch (error) {
      console.error('Failed to delete poem:', error);
      setMessageContent('Failed to delete poem');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handlePoemClick = (poemText: string) => {
    setSelectedPoem(poemText);
  };

  const togglePoemsVisibility = () => {
    setShowPoems((prevShowPoems) => !prevShowPoems);
  };

  return (
    <div className="poem-list-container">
      {showMessage && (
        <div className="alert alert-success" role="alert">
          {messageContent}
        </div>
      )}
      <button className="toggle-poems-btn" onClick={togglePoemsVisibility}>
        {showPoems ? 'Close Poems' : 'Show My Poems'}
      </button>
      {showPoems && (
        <ul>
          {fetchedPoems.map((poem) => (
            poem.is_active ? (
              <li key={poem.id} className="poem-item">
                <div>
                  {poem.poem_text.length > 50 ? `${poem.poem_text.slice(0, 50)}...` : poem.poem_text}
                </div>
                <div className="buttons">
                  <button onClick={() => handlePoemClick(poem.poem_text)}>Expand</button>
                  <button onClick={() => handleDeletePoem(poem.id)}>Delete</button>
                </div>
              </li>
            ) : null
          ))}
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