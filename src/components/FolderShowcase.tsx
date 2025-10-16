// "use client";
// import React, { useState } from "react";
// import { FaFolder, FaPlus } from "react-icons/fa";
// import { IoIosArrowForward } from "react-icons/io";
// import { MdDeleteOutline } from "react-icons/md";

// type File = {
//   name: string;
//   price: number;
// };

// type Folder = {
//   id: number;
//   name: string;
//   records: number;
//   files: File[];
// };

// type CartItem = File & { quantity: number };

// const foldersData: Folder[] = [
//   {
//     id: 1,
//     name: "All Club Numbers",
//     records: 38182,
//     files: [
//       { name: "ClubList.csv", price: 20 },
//       { name: "Members.xlsx", price: 35 },
//       { name: "Contacts.txt", price: 15 },
//     ],
//   },
//   {
//     id: 2,
//     name: "Bank Database",
//     records: 5210,
//     files: [
//       { name: "Accounts.csv", price: 40 },
//       { name: "Transactions.xlsx", price: 50 },
//       { name: "Branches.json", price: 30 },
//     ],
//   },
//   {
//     id: 3,
//     name: "Corporate Database",
//     records: 624654,
//     files: [
//       { name: "CompanyData.csv", price: 45 },
//       { name: "Employees.xlsx", price: 60 },
//     ],
//   },
//   {
//     id: 4,
//     name: "Educational Data",
//     records: 270227,
//     files: [
//       { name: "Students.csv", price: 20 },
//       { name: "Grades.xlsx", price: 35 },
//     ],
//   },
// ];

// export default function FolderShowcase() {
//   const [openFolder, setOpenFolder] = useState<number | null>(null);
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const handleToggle = (id: number) => {
//     setOpenFolder(openFolder === id ? null : id);
//   };

//   const handleAddToCart = (file: File) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.name === file.name);
//       if (existing) {
//         return prev.map((item) =>
//           item.name === file.name
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prev, { ...file, quantity: 1 }];
//     });
//   };

//   const handleRemoveFromCart = (name: string) => {
//     setCart((prev) =>
//       prev
//         .map((item) =>
//           item.name === name
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const totalPrice = cart.reduce(
//     (sum, file) => sum + file.price * file.quantity,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="px-6 py-8">
//         Logo here
//       </div>
//       <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row gap-10 py-10">
//         <div className="flex-1">
//           <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 text-center mb-6">
//             Data Folder Showcase
//           </h1>
//           <p className="text-gray-500 text-center mb-10">
//             Interactive file explorer showcase. Click any folder to view its contents.
//           </p>

//           <div className="grid sm:grid-cols-1 gap-6">
//             {foldersData.map((folder) => (
//               <div
//                 key={folder.id}
//                 className={`rounded-2xl shadow-lg border transition-all duration-300 bg-white overflow-hidden ${
//                   openFolder === folder.id
//                     ? "border-blue-500 shadow-md"
//                     : "border-transparent hover:border-gray-300"
//                 }`}
//               >
//                 <div
//                   onClick={() => handleToggle(folder.id)}
//                   className="flex items-center justify-between p-5 cursor-pointer"
//                 >
//                   <div className="flex items-center gap-3">
//                     <FaFolder
//                       className={`text-4xl ${
//                         openFolder === folder.id
//                           ? "text-yellow-500"
//                           : "text-yellow-400"
//                       }`}
//                     />
//                     <div>
//                       <h2 className="text-lg font-medium text-gray-800">
//                         {folder.name}
//                       </h2>
//                       <p className="text-sm text-gray-500">
//                         {folder.records.toLocaleString()} records
//                       </p>
//                     </div>
//                   </div>

//                   <IoIosArrowForward
//                     className={`text-gray-500 text-2xl transition-transform duration-300 ${
//                       openFolder === folder.id ? "rotate-90 text-blue-500" : ""
//                     }`}
//                   />
//                 </div>

//                 {openFolder === folder.id && (
//                   <div className="border-t border-gray-100 bg-gray-100 space-y-2">
//                     {folder.files.map((file, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between px-8 py-2 bg-white transition"
//                       >
//                         <div className="flex items-center gap-2">
//                           <span className="text-4xl">📊</span>
//                           <span>{file.name}</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <span className="text-sm text-gray-500">
//                             ${file.price}
//                           </span>
//                           <button
//                             onClick={() => handleAddToCart(file)}
//                             className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
//                           >
//                             <FaPlus />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

// {/* Cart */}
//           <div className="w-full lg:w-100 bg-white border border-gray-200 shadow-xl rounded-xl h-fit self-start mt-6 lg:mt-32">
//             <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//               <h2 className="text-lg font-semibold text-gray-800">Cart</h2>
              
//             </div>

//             <div className="p-5 max-h-[400px] overflow-y-auto">
//               {cart.length === 0 ? (
//                 <p className="text-gray-500 text-center py-10">
//                   No files added yet.
//                 </p>
//               ) : (
//                 cart.map((file) => (
//                   <div
//                     key={file.name}
//                     className="flex items-center justify-between mb-3 border-b border-gray-300 pb-2"
//                   >
//                     <div>
//                       <p className="text-gray-800 font-medium">
//                         {file.name}{" "}
//                         <span className="text-gray-500 text-sm">
//                           ({file.quantity}×)
//                         </span>
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         ${file.price * file.quantity}
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => handleRemoveFromCart(file.name)}
//                       className="text-red-500 hover:text-red-700 text-sm"
//                     >
//                       <MdDeleteOutline size={24}/>
//                     </button>
//                   </div>
//                 ))
//               )}
//             </div>

//             {cart.length > 0 && (
//               <div className="p-5 border-t border-gray-300">
//                 <div className="flex justify-between text-gray-800 font-semibold text-lg">
//                   <span>Total:</span>
//                   <span>${totalPrice}</span>
//                 </div>
//                 <div className="mt-3 flex items-center justify-center ">
//                   <button className="bg-blue-700 text-white py-3 px-7 rounded-md w-full">
//                     Proceed to Buy
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//       </div>
//     </div>
//   );
// }
