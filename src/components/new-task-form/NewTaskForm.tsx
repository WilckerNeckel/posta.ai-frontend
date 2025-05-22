import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setActiveTask } from "../../redux/reducers/boards/boards.reducer";
import {
    selectActiveBoardColumns,
    selectActiveTask,
} from "../../redux/reducers/boards/boards.selector";
import { setShowNewTaskModal } from "../../redux/reducers/ui/ui.reducer";
import { selectShowNewTaskModal } from "../../redux/reducers/ui/ui.selector";
import { useAppDispatch } from "../../redux/store/store";
import {
    NewTaskFormSchema,
    useNewTaskForm,
} from "../../shared/hooks/useNewTaskForm";
import { BaseModal } from "../base-modal/BaseModal";
import { MyInput } from "../my-input/MyInput";
import { If } from "../utils";
import { StatusValues } from "./StatusValues";
import { TaskFormSubtasks } from "./TaskFormSubtasks";
import { fonts, palette } from "../../themes/jsonTheme";
import brownPin from "../../assets/brown-pin.png";

// @ts-ignore
import "@fontsource/inter";

export const NewTaskForm = () => {
    const activeTask = useSelector(selectActiveTask);
    const isOpen = useSelector(selectShowNewTaskModal);
    const status = useSelector(selectActiveBoardColumns);
    const title = activeTask ? "Editar tarefa" : "Criar nova tarefa";
    const submitButtonText = activeTask ? "Salvar Mudanças" : "Criar tarefa";

    const dispatch = useAppDispatch();

    const { append, fields, methods, onSubmit, remove } = useNewTaskForm({
        activeTask,
    });

    const closeModal = () => {
        dispatch(setShowNewTaskModal(false));
        dispatch(setActiveTask(null));
    };

    const onFormSubmitted = (data: NewTaskFormSchema) => {
        onSubmit(data);
        closeModal();
    };

    useEffect(() => {
        if (!activeTask) return;
        methods.setValue("columnId", activeTask.status);
    }, [activeTask, methods]);

    return (
        <BaseModal
            open={isOpen}
            methods={methods}
            onClose={closeModal}
            transitionDuration={0}
            onSubmit={methods.handleSubmit(onFormSubmitted)}
            contentSpacing={4}
            contentPadding={{
              xs: 4,
              md: 6,
            }}
        >
            {/* <Box
                component="img"
                src={brownPin}
                alt="pin"
                sx={{
                    width: 60,
                    height: 60,
                    position: "absolute",
                    top: -8,
                    left: "95%",
                    transform: "translateX(-50%)",
                    zIndex:2
                }}
            /> */}
            <Typography
                variant="h6"
                fontWeight={700}
                fontFamily={fonts.secondary}
                color={palette.primary.main}
            >
                {title}
            </Typography>
            <MyInput name="title" customLabel="Title" />
            <MyInput
                rows={3}
                multiline
                name="description"
                customLabel="Description"
                placeholder="e.g. It’s always good to take a break. I’ll be back in 5 minutes."
            />
            {/* <TaskFormSubtasks
        append={append}
        remove={remove}
        fields={fields}
        methods={methods}
      /> */}
            {/* <If condition={activeTask}>
        <StatusValues
          status={status}
          name="columnId"
          defaultValue={activeTask?.status}
        />
      </If>
      <If condition={!activeTask}>
        <StatusValues status={status} name="columnId" />
      </If> */}
            <Button 
              variant="contained" 
              type="submit" 
              sx={{ fontFamily: fonts.secondary }}
            >
                {submitButtonText}
            </Button>
        </BaseModal>
    );
};
