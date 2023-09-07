import React, { useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const List = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header title="注文リスト" />
      <Footer />
    </div>
  );
}

export default List;