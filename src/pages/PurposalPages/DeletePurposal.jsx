/* eslint-disable react/prop-types */


import { deletePurposal, editPurposal } from "../../services/purposal.service";
import { useNavigate } from "react-router-dom";
import { deleteChat } from "../../services/chat.service";


const DeletePurposal = ({ id, setNeedRefresh }) => {


  const navigate = useNavigate();


  const handleDelete = async () => {
    try {

          const editedPurposal = await editPurposal(id);
            await deleteChat(editedPurposal.purposalChat);
            await deletePurposal(editedPurposal.id);
            setNeedRefresh(true);
      } catch (error) {
          console.error("Error al actualizar el estado:", error);
        }
        navigate("/dashboard");
      };

  return (
    <button
      className=" bg-[#d70303] text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-[#ff8465] hover:text-black transition flex items-center justify-center w-full"
      onClick={handleDelete}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
      <div className="block lg:hidden w-full">
        <p>Delete</p>
      </div>
    </button>
  );
};

export default DeletePurposal;
