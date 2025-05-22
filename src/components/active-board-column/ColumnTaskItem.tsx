import { Paper, Typography, Divider, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../../config/interfaces/board.interface";
import { setActiveTask } from "../../redux/reducers/boards/boards.reducer";
import { useAppDispatch } from "../../redux/store/store";
import { palette } from "../../themes/jsonTheme";
import brownPin from "../../assets/brown-pin.png";
import { setShowNewTaskModal } from "../../redux/reducers/ui/ui.reducer";

interface Props {
    task: Task;
    index: number;
}

export const CustomPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
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
        dispatch(setShowNewTaskModal(true));
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <CustomPaper
                    key={task.id}
                    sx={{ cursor: "pointer", mt: 3, mb: 2, mx: 1, height: 160}}
                    onClick={handleTaskClick}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            position: "absolute",
                            top: 7,
                            left: "82%",
                            transform: "translateX(-50%)",
                            background: palette.primary.main,
                            boxShadow: "inset 0px 1px 2px rgba(0,0,0,0.4)",
                            zIndex: 0
                        }}
                    />
                    <Box
                        component="img"
                        src={brownPin}
                        alt="pin"
                        sx={{
                            width: 50,
                            height: 50,
                            position: "absolute",
                            top: -25,
                            left: "90%",
                            transform: "translateX(-50%)",
                            zIndex: 1
                        }}
                    />
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
