import React from 'react';

const SelectStatementDialogView = ({table, tableName}) => {
    const matched = table.matched.map(r => r.column);
    const renamed = table.renamed.map(r => `${r.newName} = ${r.column}`);
    return (
      <div>
        Table: {!!tableName ? tableName : ""}
          <p>
            select( <br />
          {matched.map(m => ( <li style={{listStyleType: "none"}}>{m}, </li>))}
            {/* right now trailing comma still there, can add that logic later */}
          {renamed.map(m => ( <li style={{listStyleType: "none"}}>{m}, </li>))}
            )
          </p>
      </div>
    );
}

export default SelectStatementDialogView
