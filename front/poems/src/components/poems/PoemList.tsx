import React, { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(fetchPoems());
  }, [dispatch]);


  return (
    <div>
      <h2>Poem List</h2>
      <button onClick={() => dispatch(fetchPoems())}>Fetch Poems</button>
      <ul>
        {poems.map((poem) => (
          <li key={poem.input_id}>
            {poem.input_id} - {poem.poem_text}
            <button onClick={() => onFetchPoemDetail(poem.input_id)}>Fetch Detail</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoemList;
