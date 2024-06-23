import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({ message }) => {
  toast(
    { message },
    {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

// const App = () => {
//   const notify = () => toast('This is a notification!');

//   return (
//     <div>
//       <h1>Notification System</h1>
//       <button onClick={notify}>Show Notification</button>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Notification;

// import React from 'react';
// import axios from './api/axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const App = () => {
//     const fetchData = async () => {
//         try {
//             const response = await axios.get('/data');
//             toast.success('Data fetched successfully!');
//             console.log(response.data);
//         } catch (error) {
//             toast.error('Error fetching data');
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             <h1>Data Fetch Example</h1>
//             <button onClick={fetchData}>Fetch Data</button>
//             <ToastContainer />
//         </div>
//     );
// };

// export default App;
