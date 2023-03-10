import { useState } from "react"
import { deleteMovie, editMovie } from "../services/api"
import Modal from "./Modal"
import EditIcon from "../assets/icons/EditIcon"
import RenameIcon from "../assets/icons/RenameIcon"
import DeleteIcon from "../assets/icons/DeleteIcon"

const ListItem = ({ movie, displayList }) => {

    const [showModal, setShowModal] = useState(false)

    const deleteList = async () => {
        const res = await deleteMovie(movie.id)
        if (res.ok) {
            displayList()
        } else {
            console.log('delete failed')
        }
    }



    return (
        <div className="flex justify-between items-center h-24 pl-8 border-2 border-l-4 border-l-blue-600 rounded-lg overflow-hidden">

            <div className="space-y-1">
                <p className="text-lg font-bold">{movie.title}</p>
                <p className="text-xs border border-gray-400 text-gray-800 rounded-full px-3 py-1">{movie.date}</p>
            </div>

            <div className="group h-full w-24 hover:w-1/3 flex justify-center items-center bg-transparent hover:border-l-4 hover:border-l-red-800 rounded-l-lg transition-all">
                <div className="group-hover:hidden">
                    <EditIcon />
                </div>
                <div className="hidden group-hover:grid grid-cols-2 w-full h-full transition-all overflow-hidden">
                    <button className=" bg-red-500 flex justify-center items-center" onClick={deleteList}>
                        <DeleteIcon />
                    </button>
                    <button className=" bg-yellow-300 flex justify-center items-center" onClick={() => setShowModal(true)}>
                        <RenameIcon />
                    </button>
                </div>
            </div>

            {showModal && <Modal setShowModal={setShowModal} movie={movie} mode="edit" displayList={displayList} />}
        </div>
    )
}

export default ListItem