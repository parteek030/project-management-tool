import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Task, TaskStatus } from "../types";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().optional().nullable(),
  status: yup
    .mixed<TaskStatus>()
    .oneOf(["todo", "in-progress", "done"])
    .required(),
});

type FormData = {
  title: string;
  description?: string | null;
  status: TaskStatus;
};

interface Props {
  initialData?: Task;
  projectId: number;
  onSubmit: (data: FormData | (FormData & { project_id: number })) => Promise<void>;
  onCancel?: () => void;
}

const TaskForm = ({
  initialData,
  projectId,
  onSubmit,
  onCancel,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || "todo",
    },
  });

  const submitHandler = async (data: FormData) => {
    if (initialData) {
      await onSubmit(data);
    } else {
      await onSubmit({ ...data, project_id: projectId });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Task" : "Create Task"}
      </h2>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            {...register("title")}
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {isSubmitting
              ? "Saving..."
              : initialData
              ? "Update"
              : "Create"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;