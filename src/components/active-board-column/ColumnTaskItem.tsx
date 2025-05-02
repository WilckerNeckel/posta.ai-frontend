import { Paper, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../../config/interfaces/board.interface";
import { setActiveTask } from "../../redux/reducers/boards/boards.reducer";
import { useAppDispatch } from "../../redux/store/store";
import { palette } from "../../themes/jsonTheme";

interface Props {
    task: Task;
    index: number;
}

const CustomPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&:hover .task-title": {
        color: theme.palette.primary.main,
    },
}));

export const ColumnTaskItem = ({ task, index }: Props) => {
    const subtasksCompleted = useMemo(
        () => task.subtasks.filter((subtask) => subtask.isCompleted).length,
        [task.subtasks]
    );

    const dispatch = useAppDispatch();

    const handleTaskClick = () => {
        dispatch(setActiveTask(task));
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <CustomPaper
                    key={task.id}
                    sx={{ cursor: "pointer", my: 2, mx: 1, height: 160}}
                    onClick={handleTaskClick}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Typography
                        width="100%"
                        fontSize="16px"
                        overflow="hidden"
                        fontWeight={600}
                        className="task-title"
                        textOverflow="ellipsis"
                        textAlign="center"
                    >
                        {task.title}
                    </Typography>
                    <Divider 
                        sx={{
                            width: "60%",
                            backgroundColor: palette.accent.default,
                            height: 1.5,
                            // mt: 1,
                            mb: 1
                        }}
                    />
                    <Typography
                        variant="caption"
                        fontWeight={700}
                        color="customGrey.main"
                        mt={2}
                        width="100%"
                        textAlign="left"
                        px={2}
                    >
                        {/* {`${subtasksCompleted} of ${task.subtasks.length} subtasks`} */}
                        {task.description}
                    </Typography>
                </CustomPaper>
            )}
        </Draggable>
    );
};
