import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button>
      <h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button>
      <h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button>
      <h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button>
      <h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button>
      <h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button>
      <h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button>
      <h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button>
      <h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button>
      <h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button>
      <h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button><h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button><h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button><h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button><h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button><h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button><h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button><h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button><h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button><h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button><h1>Simple Counter</h1>
      <p>You clicked the button {count} times.</p>
      <button onClick={handleClick}>Increment</button>
    </div>
    
  );
}

export default Counter;
