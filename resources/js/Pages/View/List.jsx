import React, { useState } from 'react';
import Header from '../../Components/Header';

const List = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header title="注文リスト" />
    </div>
  );
}

export default List;