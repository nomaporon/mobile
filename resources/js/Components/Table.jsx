import React, { useState } from 'react';

const Table = (props) => {
  /*
  * table_headerは["料理名", "数量", "金額"]のような配列
  * table_contentは[["オレンジジュース", 1, 200], ["アイスクリーム", 2, 600],...]のような配列
  */
  const table_header = props.table_header;
  const table_content = props.table_content;

  return (
    <table>
      <tr>
        {table_header.map((header) => (
          <th>{header}</th>
        ))}
      </tr>
      {table_content.map((contents) => (
        <tr>
          {contents.map((content) => (
          <td>{content}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export default Table;