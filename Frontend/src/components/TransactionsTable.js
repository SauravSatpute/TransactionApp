import React from 'react';

const TransactionsTable = ({ transactions }) => (
//     <table className="min-w-full bg-white border border-gray-200">
//     <thead>
//       <tr>
//         <th className="px-4 py-2 border-b">Title</th>
//         <th className="px-4 py-2 border-b">Price</th>
//         <th className="px-4 py-2 border-b">Description</th>
//         <th className="px-4 py-2 border-b">Category</th>
//         <th className="px-4 py-2 border-b">Sold</th>
//         <th className="px-4 py-2 border-b">Date of Sale</th>
//       </tr>
//     </thead>
//     <tbody>
//       {transactions.map(transaction => (
//         <tr key={transaction.id}>
//           <td className="px-4 py-2 border-b">{transaction.title}</td>
//           <td className="px-4 py-2 border-b">${transaction.price}</td>
//           <td className="px-4 py-2 border-b">{transaction.description}</td>
//           <td className="px-4 py-2 border-b">{transaction.category}</td>
//           <td className="px-4 py-2 border-b">{transaction.sold ? 'Yes' : 'No'}</td>
//           <td className="px-4 py-2 border-b">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
<table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Image</th>
          <th className="px-4 py-2 border-b">Title</th>
          <th className="px-4 py-2 border-b">Price</th>
          <th className="px-4 py-2 border-b">Description</th>
          <th className="px-4 py-2 border-b">Category</th>
          <th className="px-4 py-2 border-b">Sold</th>
          <th className="px-4 py-2 border-b">Date of Sale</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td className="px-4 py-2 border-b">
              <img src={transaction.image} alt={transaction.title} className="w-16 h-16 object-cover rounded" />
            </td>
            <td className="px-4 py-2 border-b">{transaction.title}</td>
            <td className="px-4 py-2 border-b">${transaction.price}</td>
            <td className="px-4 py-2 border-b">{transaction.description}</td>
            <td className="px-4 py-2 border-b">{transaction.category}</td>
            <td className="px-4 py-2 border-b">{transaction.sold ? 'Yes' : 'No'}</td>
            <td className="px-4 py-2 border-b">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
);

export default TransactionsTable;