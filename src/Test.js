import React from 'react';
import { useLocalStorageState } from 'ahooks';

function Test() {
  // Initialize count state with a default value of 0
  const [count, setCount] = useLocalStorageState('count', 0);

  function handleIncrement() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default Test;