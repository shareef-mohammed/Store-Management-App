import React, { useState } from "react";
import { motion } from "framer-motion";
import AddManager from "./AddManager";
import AddEmployee from "./AddEmployee";
import AddStore from './AddStore'
import AddSubManager from "./AddSubManager";
import AddWorker from "./AddWorker";

const DashboardContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isStoreOpen, setIsStoreOpen] = useState(false);
    const [isSubManOpen, setIsSubManOpen] = useState(false)
    const [isWorkerOpen, setIsWorkerOpen] = useState(false)

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    const openUserModal = () => {
        setIsUserOpen(true);
      };
    
      const closeUserModal = () => {
        setIsUserOpen(false);
      };
      const openStoreModal = () => {
        setIsStoreOpen(true);
      };
    
      const closeStoreModal = () => {
        setIsStoreOpen(false);
      };
      const openSubManModal = () => {
        setIsSubManOpen(true);
      };
    
      const closeSumManModal = () => {
        setIsSubManOpen(false);
      };
      const openWorkerModal = () => {
        setIsWorkerOpen(true);
      };
    
      const closeWorkerModal = () => {
        setIsWorkerOpen(false);
      };
  return (
    <div className="w-full p-6 md:p-10">
      <div className="block md:flex justify-start m-4 md:m-0 ml-0 mr-0 mb-0 md:ml-4 md:mr-10 md:mb-4">
        <motion.div
          onClick={openModal}
          className="flex md:justify-start justify-center items-center w-full md:w-1/2 rounded-xl border h-40 shadow-lg bg-blue-300 cursor-pointer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <span className="rounded-full ml-0 md:ml-10 mr-4 bg-white h-16 w-16 flex justify-center items-center shadow-inner hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-person-workspace"
              viewBox="0 0 16 16"
              className="hover:scale-105"
            >
              <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
            </svg>
          </span>
          <div>
            <p className="text-xl font-bold text-white">Add Manager</p>
            <p className="text-white font-medium">Add a new manager</p>
          </div>
        </motion.div>
        <AddManager isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <div className="block md:flex justify-between">
        <motion.div
          onClick={openUserModal}
          className="flex items-center md:justify-start cursor-pointer justify-center bg-green-300 w-full md:w-1/2 rounded-xl border h-40 md:m-4 m-0 md:mt-0 mt-4 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <span className="rounded-full ml-0 md:ml-10 mr-4 bg-white h-16 w-16 flex justify-center items-center shadow-inner hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-person-add"
              viewBox="0 0 16 16"
              className="hover:scale-105"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
            </svg>
          </span>
          <div>
            <p className="text-xl font-bold text-white">Add Employee</p>
            <p className="text-white font-medium">Add a new employee</p>
          </div>
        </motion.div>
        <AddEmployee isOpen={isUserOpen} onClose={closeUserModal} />
        <motion.div
          onClick={openStoreModal}
          className="w-full flex md:justify-start justify-center cursor-pointer items-center bg-yellow-300 md:w-1/2 rounded-xl border h-40 m-0 md:m-4 md:mt-0 mt-4 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <span className="rounded-full ml-0 md:ml-10 mr-4 bg-white h-16 w-16 flex justify-center items-center shadow-inner hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-shop"
              viewBox="0 0 16 16"
              className="hover:scale-105"
            >
              <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
            </svg>
          </span>
          <div>
            <p className="text-xl font-bold text-white">Add Store</p>
            <p className="text-white font-medium">Add a new store</p>
          </div>
        </motion.div>
        <AddStore isOpen={isStoreOpen} onClose={closeStoreModal} />
      </div>
      <div className="block md:flex justify-between ">
      <motion.div
          onClick={openWorkerModal}
          className="flex items-center md:justify-start cursor-pointer justify-center bg-gray-300 w-full md:w-1/2 rounded-xl border h-40 md:m-4 m-0 md:mt-0 mt-4 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <span className="rounded-full ml-0 md:ml-10 mr-4 bg-white h-16 w-16 flex justify-center items-center shadow-inner hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-person-add"
              viewBox="0 0 16 16"
              className="hover:scale-105"
            >
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
            </svg>
          </span>
          <div>
            <p className="text-xl font-bold text-white">Add Assistant Manager</p>
            <p className="text-white font-medium">Add a new assistant manager</p>
          </div>
        </motion.div>
        <AddWorker isOpen={isWorkerOpen} onClose={closeWorkerModal} />
        <motion.div
          onClick={openSubManModal}
          className="w-full flex md:justify-start justify-center cursor-pointer items-center bg-pink-300 md:w-1/2 rounded-xl border h-40 m-0 md:m-4 md:mt-0 mt-4 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <span className="rounded-full ml-0 md:ml-10 mr-4 bg-white h-16 w-16 flex justify-center items-center shadow-inner hover:scale-105">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-card-checklist"
              viewBox="0 0 16 16"
              className="hover:scale-105"
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
            </svg>
          </span>
          <div>
            <p className="text-xl font-bold text-white">Add Sub Manager</p>
            <p className="text-white font-medium">Add a new sub  manager</p>
          </div>
        </motion.div>
        <AddSubManager isOpen={isSubManOpen} onClose={closeSumManModal} />
      </div>
    </div>
  );
};

export default DashboardContent;
