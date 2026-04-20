import React from 'react'

const TableTitle = ({ Title, Description }) => {
  return (
    <>
      <div className="left-part">
        <p className="text-sm font-semibold text-gray-900">
          {Title}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {Description}
        </p>
      </div>
    </>
  );
}

export default TableTitle