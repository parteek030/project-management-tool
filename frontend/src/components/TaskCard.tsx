import type { Task } from "../types";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard = ({ task, onEdit, onDelete }: Props) => {
  const statusColor = {
    todo: "bg-gray-200 text-gray-700",
    "in-progress": "bg-yellow-200 text-yellow-800",
    done: "bg-green-200 text-green-800",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Title */}
      <h4 className="font-semibold">{task.title}</h4>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mt-1">
          {task.description}
        </p>
      )}

      {/* Status */}
      <span
        className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
          statusColor[task.status]
        }`}
      >
        {task.status}
      </span>

      {/* Actions */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-400 text-white px-2 py-1 rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;