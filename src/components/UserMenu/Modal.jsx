// import { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import css from '../../../modals/Modal/Modal.module.css';
// import Iconsvg from '../Icon/Icon';

// Modal.setAppElement('#root');

// const UserMenuModal = ({ children, word }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   useEffect(() => {
//     const handleEscape = event => {
//       if (event.key === 'Escape') {
//         closeModal();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('keydown', handleEscape);
//     } else {
//       document.removeEventListener('keydown', handleEscape);
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, [isOpen]);

//   return (
//     <>
//       <button onClick={openModal}>{word}</button>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={closeModal}
//         className={css.modalContent}
//         overlayClassName={css.modalBackdrop}
//         shouldCloseOnOverlayClick={true}
//       >
//         <button className={css.modalCloseButton} onClick={closeModal}>
//           <Iconsvg
//             width="28"
//             height="28"
//             iconName="close"
//             className={css.iconClose}
//           />
//         </button>
//         <div className={css.modalBody}>{children}</div>
//       </Modal>
//     </>
//   );
// };

// export default UserMenuModal;
