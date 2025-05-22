import { Box, Divider, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
    changeTaskStatus,
    setActiveTask,
} from "../../redux/reducers/boards/boards.reducer";
import {
    selectActiveBoardColumns,
    selectActiveTask,
} from "../../redux/reducers/boards/boards.selector";
import {
    selectShowDeleteTaskModal,
    selectShowNewTaskModal,
} from "../../redux/reducers/ui/ui.selector";
import { useAppDispatch } from "../../redux/store/store";
import { BaseModal } from "../base-modal/BaseModal";
import { Form } from "../form/Form";
import { StatusValues } from "../new-task-form/StatusValues";
import { If } from "../utils";
import { SubtasksList } from "./SubtasksList";
import { TaskMenuOptions } from "./TaskMenuOptions";
import { CustomPaper } from "../active-board-column/ColumnTaskItem";
import { palette } from "../../themes/jsonTheme";
import brownPin from "../../assets/brown-pin.png";


interface FormProps {
    columnId: string;
}

// export const TaskDetails = () => {
//   const activeTask = useSelector(selectActiveTask);
//   const status = useSelector(selectActiveBoardColumns);
//   const isNewTaskModalOpen = useSelector(selectShowNewTaskModal);
//   const isDeleteTaskModalOpen = useSelector(selectShowDeleteTaskModal);

//   const dispatch = useAppDispatch();
//   const methods = useForm<FormProps>({});

//   const columnId = methods.watch("columnId");

//   const closeModal = () => {
//     dispatch(setActiveTask(null));
//     methods.reset();
//   };

//   useEffect(() => {
//     dispatch(changeTaskStatus(columnId));
//   }, [columnId, dispatch]);

//   return (
//     <BaseModal
//       onClose={closeModal}
//       transitionDuration={0}
//       open={!!activeTask && !isDeleteTaskModalOpen && !isNewTaskModalOpen}
//     >
//       <Stack
//         spacing={1}
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//       >
//         <Typography
//           variant="h6"
//           fontWeight={700}
//           sx={{ wordBreak: "break-word" }}
//         >
//           {activeTask?.title}
//         </Typography>
//         <TaskMenuOptions />
//       </Stack>
//       <Typography
//         variant="body2"
//         lineHeight="23px"
//         color="customGrey.main"
//         sx={{ wordBreak: "break-word" }}
//       >
//         {activeTask?.description || "No Description"}
//       </Typography>
//       {/* <SubtasksList subtasks={activeTask?.subtasks || []} /> */}
//       <If condition={!!activeTask}>
//         <Form methods={methods}>
//           <StatusValues
//             name="columnId"
//             status={status}
//             defaultValue={activeTask?.status}
//           />
//         </Form>
//       </If>
//     </BaseModal>
//   );
// };

export const TaskDetails = () => {
    const activeTask = useSelector(selectActiveTask);
    const status = useSelector(selectActiveBoardColumns);
    const isNewTaskModalOpen = useSelector(selectShowNewTaskModal);
    const isDeleteTaskModalOpen = useSelector(selectShowDeleteTaskModal);

    const dispatch = useAppDispatch();
    const methods = useForm<FormProps>({});

    const columnId = methods.watch("columnId");

    const closeModal = () => {
        dispatch(setActiveTask(null));
        methods.reset();
    };

    useEffect(() => {
        dispatch(changeTaskStatus(columnId));
    }, [columnId, dispatch]);

    return (
        <BaseModal
            onClose={closeModal}
            transitionDuration={0}
            open={!!activeTask && !isDeleteTaskModalOpen && !isNewTaskModalOpen}
        >
            <CustomPaper
                key={columnId}
                sx={{ cursor: "pointer", mt: 3, mb: 2, mx: 1, height: 160 }}
                // ref={provided.innerRef}
                // {...provided.draggableProps}
                // {...provided.dragHandleProps}
            >
                       <TaskMenuOptions />
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
                        zIndex: 0,
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
                        zIndex: 1,
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
                    {activeTask?.title}
                </Typography>
                <Divider
                    sx={{
                        width: "60%",
                        backgroundColor: palette.accent.default,
                        height: 1.5,
                        // mt: 1,
                        mb: 1,
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
                    {activeTask?.description || "No Description"}
                </Typography>
            </CustomPaper>
        </BaseModal>
    );
};
