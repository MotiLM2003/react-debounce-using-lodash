import React, { useState, useCallback, useRef, useEffect } from 'react';
import debounce from 'lodash.debounce';

import '../App.css';

function App() {
  const [value, setValue] = useState('');
  const [dbValue, saveToDb] = useState(''); // would be an API call normally

  // debounce using  useCallback;
  const debouncedSave = useCallback(
    debounce((nextValue) => saveToDb(nextValue), 1000),
    []
  );

  // debouncing using useRef instead

  const debouncedSave2 = useRef(
    debounce((nextValue) => saveToDb(nextValue), 1000)
  ).current;

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setValue(nextValue);

    debouncedSave2(nextValue);
  };

  return (
    <main>
      <h1>Blog</h1>
      <textarea value={value} onChange={handleChange} rows={5} cols={50} />
      <section className='panels'>
        <div>
          <h2>Editor (Client)</h2>
          {value}
        </div>
        <div>
          <h2>Saved (DB)</h2>
          {dbValue}
        </div>
      </section>
    </main>
  );
}

export default App;
