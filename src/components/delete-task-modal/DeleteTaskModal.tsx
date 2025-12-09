import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteTaskAsync,
  setActiveTask,
} from "../../redux/reducers/boards/boards.reducer";
import { selectActiveBoard, selectActiveTask } from "../../redux/reducers/boards/boards.selector";
import { setShowDeleteTaskModal } from "../../redux/reducers/ui/ui.reducer";
import { selectShowDeleteTaskModal } from "../../redux/reducers/ui/ui.selector";
import { useAppDispatch } from "../../redux/store/store";
import { BaseModal } from "../base-modal/BaseModal";
import { Toast } from "../ui/toast/Toast";

export const DeleteTaskModal = () => {
  const activeTask = useSelector(selectActiveTask);
  const activeBoard = useSelector(selectActiveBoard);
  const [showSnack, setShowSnack] = useState(false);
  const isOpen = useSelector(selectShowDeleteTaskModal);
  const [isDeleting, setIsDeleting] = useState(false);
  const activeTaskColumn = activeBoard?.columns.find(
    (col) => col.id === activeTask?.status
  );
  const isDisciplineTask = Boolean(activeTaskColumn?.disciplineColumn);

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setShowDeleteTaskModal(false));
  };

  const onDeleteTask = async () => {
    if (!activeTask || isDisciplineTask) return;
    setIsDeleting(true);
    const result = await dispatch(deleteTaskAsync(activeTask.id));
    setIsDeleting(false);

    if (deleteTaskAsync.fulfilled.match(result)) {
      dispatch(setActiveTask(null));
      onClose();
      setShowSnack(true);
    }
  };

  return (
    <>
      <BaseModal open={isOpen} onClose={onClose}>
        <Typography variant="h6" fontWeight={700} color="error">
          Delete this task?
        </Typography>
        {isDisciplineTask && (
          <Typography variant="body2" color="error" fontWeight={600}>
            Tarefas de disciplina são protegidas e não podem ser removidas.
          </Typography>
        )}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            wordBreak: "break-word",
          }}
        >
          Are you sure you want to delete the {`"${activeTask?.title}"`} task
          and its subtasks? This action cannot be reversed.
        </Typography>
        <Stack direction="row" spacing={4}>
          <Button
            fullWidth
            color="error"
            variant="contained"
            onClick={onDeleteTask}
            disabled={isDeleting || isDisciplineTask}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Stack>
      </BaseModal>
      <Toast
        isOpen={showSnack}
        message="Task deleted successfully"
        onClose={() => setShowSnack(false)}
      />
    </>
  );
};
