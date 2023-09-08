import React, { useState } from 'react';
import Header from '../../Components/Header';

const History = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
    　<Header title="注文履歴一覧" />
    </div>
  );
}

export default History;