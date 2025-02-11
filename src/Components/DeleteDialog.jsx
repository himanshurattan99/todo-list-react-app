const DeleteDialog = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null

    return (
        <div className="bg-black opacity-70 flex justify-center items-center fixed inset-0">
            <div className="w-4/5 p-6 bg-slate-100 rounded-lg">
                <h3 className="mb-2 text-violet-700 text-lg font-semibold">
                    Delete Todo
                </h3>
                <div className="mb-3 text-slate-700">
                    Are you sure you want to delete this todo?
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="py-1 px-3 bg-slate-300 hover:bg-slate-500 rounded-md text-slate-700 hover:text-slate-100" >
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="py-1 px-3 bg-violet-500 hover:bg-violet-700 rounded-md text-slate-100" >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialog