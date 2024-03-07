import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchPoems } from '../../features/poems/poemSlice';
import { Token } from '../../types/token';

const tokenString = localStorage.getItem('token');
const token: Token = JSON.parse(tokenString!);

interface PoemListProps {
  onFetchPoemDetail: (userId: number) => void;
  onFetchPoems: () => void;
}

const PoemList: React.FC<PoemListProps> = ({ onFetchPoemDetail }) => {
  const dispatch = useDispatch<AppDispatch>();
  const poems = useSelector((state: RootState) => state.poems.poems);
  const [selectedPoem, setSelectedPoem] = useState<string | null>(null);


  useEffect(() => {
    dispatch(fetchPoems());
  }, [dispatch]);


  const handlePoemClick = (poemText: string) => {
    setSelectedPoem(poemText);
  };

  return (
    <div>
      <h2>Poem List</h2>
      <ul>
        {poems.map((poem) => (
          <li key={poem.input_id} onClick={() => handlePoemClick(poem.poem_text)}>
            {poem.poem_text.length > 50 ? `${poem.poem_text.slice(0, 50)}...` : poem.poem_text}
            <button onClick={() => onFetchPoemDetail(poem.input_id)}>Fetch Detail</button>
          </li>
        ))}
      </ul>
      {selectedPoem && (
        <div className="poem-popup">
          <div className="poem-popup-content">
            <span className="close" onClick={() => setSelectedPoem(null)}>&times;</span>
            <p>{selectedPoem}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoemList;
