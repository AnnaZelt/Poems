import React, { useState, useEffect } from 'react';
import { createPoem, selectPoems } from '../../features/poems/poemSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const Poem: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [poetStyle, setPoetStyle] = useState('');
    const poems = useAppSelector(selectPoems);
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Dispatch createPoem only if both inputText and poetStyle are not empty
        if (inputText.trim() !== '' && poetStyle.trim() !== '') {
            dispatch(createPoem({ inputText, poetStyle }));
        }
        setInputText('');
        setPoetStyle('');
    };

    useEffect(() => {
        console.log('Poems:', poems);
    }, [poems]); // Log the poems array when it changes

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
            {poems.length > 0 && (
                <div key={poems[0].input_id}>
                    <p>{poems[0].poem_text}</p>
                </div>
            )}
        </div>
    );    
};

export default Poem;
