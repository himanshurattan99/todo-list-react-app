import Button from './Button'

const DeleteDialog = ({ onClose, onConfirm }) => {
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
                    <Button onClick={onClose} variant="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialog