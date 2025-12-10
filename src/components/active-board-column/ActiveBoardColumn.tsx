import { Divider, Stack } from "@mui/material";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Column } from "../../config/interfaces/board.interface";
import { CustomScrollBarObject } from "../../shared/css/css.global";
import { For } from "../utils/For";
import { ColumnName } from "./ColumnName";
import { ColumnTaskItem } from "./ColumnTaskItem";
import { NewTaskButton } from "./NewTaskButton";
import { DragType } from "../../pages/ActiveBoardPage";
import { fonts, palette } from "../../themes/jsonTheme";
import { useSelector } from "react-redux";
import {
    selectFilteredTasks,
    selectIsFiltered,
} from "../../redux/reducers/boards/boards.selector";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
import { If } from "../utils";

interface Props {
    column: Column;
    index: number;
    onDeleteColumn: (column: Column) => void;
    isDeleting?: boolean;
    canManageDiscipline?: boolean;
    disciplineId?: string;
}

export const ActiveBoardColumn = ({
    column,
    index,
    onDeleteColumn,
    isDeleting = false,
    canManageDiscipline = false,
    disciplineId,
}: Props) => {
    const filteredTasks = useSelector(selectFilteredTasks);
    const isFiltered = useSelector(selectIsFiltered);

    // Filter tasks for this column when filtering is active
    const displayTasks = isFiltered
        ? column.tasks.filter((task) =>
              filteredTasks.some((filteredTask) => filteredTask.id === task.id)
          )
        : column.tasks;

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided, snapshot) => (
                <Stack
                    minWidth="272px"
                    maxWidth="272px"
                    borderTop={5}
                    borderColor={palette.primary[400]}
                    ref={provided.innerRef}
                    sx={{
                        backgroundColor: column.disciplineColumn
                            ? "#2d2a5a"
                            : palette.primary.main,
                    }}
                    {...provided.draggableProps}
                >
                    <ColumnName
                        name={column.name}
                        isDragging={snapshot.isDragging}
                        tasksLength={displayTasks.length}
                        dragHandleProps={provided.dragHandleProps}
                        onDelete={() => onDeleteColumn(column)}
                        isDeleting={isDeleting}
                    />
                    <Divider
                        sx={{
                            width: "60%",
                            backgroundColor: palette.accent.default,
                            height: 1.8,
                            marginTop: 0,
                            marginLeft: "6%",
                            marginBottom: "16px",
                        }}
                    />
                    {column.disciplineColumn && (
                        <Typography
                            variant="caption"
                            color={palette.accent.default}
                            fontFamily={fonts.secondary}
                            sx={{
                                px: 2,
                                pb: 1,
                                fontWeight: 700,
                                letterSpacing: 0.3,
                            }}
                        >
                            Coluna de Disciplina
                        </Typography>
                    )}
                    <Droppable
                        droppableId={column.id}
                        type={DragType.TASK}
                        isDropDisabled={column.disciplineColumn && !canManageDiscipline}
                    >
                        {(dropProvided) => (
                            <Stack
                                height="100%"
                                overflow="auto"
                                ref={dropProvided.innerRef}
                                {...dropProvided.droppableProps}
                                sx={(theme) =>
                                    CustomScrollBarObject({
                                        theme,
                                        hidden: true,
                                    })
                                }
                            >
                                <For
                                    each={displayTasks}
                                    render={(task, taskIndex) => (
                                        <ColumnTaskItem
                                            task={task}
                                            key={task.id}
                                            index={taskIndex}
                                            isDiscipline={
                                                column.disciplineColumn &&
                                                !canManageDiscipline
                                            }
                                        />
                                    )}
                                />
                                {dropProvided.placeholder}
                                <If
                                    condition={
                                        !column.disciplineColumn ||
                                        canManageDiscipline
                                    }
                                >
                                    <NewTaskButton
                                        columnId={column.id}
                                        columnName={column.name}
                                        disciplineId={disciplineId}
                                        isTeacherDiscipline={
                                            column.disciplineColumn &&
                                            canManageDiscipline
                                        }
                                    />
                                    <Droppable
                                        droppableId={`delete-${column.id}`}
                                        type={DragType.TASK}
                                    >
                                        {(deleteProvided, deleteSnapshot) => (
                                            <Box
                                                ref={deleteProvided.innerRef}
                                                {...deleteProvided.droppableProps}
                                                sx={{
                                                    mt: 2,
                                                    mb: 1,
                                                    mx: 1,
                                                    p: 1.5,
                                                    borderRadius: 2,
                                                    border: "2px dashed",
                                                    borderColor:
                                                        deleteSnapshot.isDraggingOver
                                                            ? palette.error
                                                                  ?.main ||
                                                              "#EA5555"
                                                            : "#ffffff80",
                                                    backgroundColor:
                                                        deleteSnapshot.isDraggingOver
                                                            ? "#ea555525"
                                                            : "transparent",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: 1,
                                                    transition:
                                                        "all 0.2s ease-in-out",
                                                    color: "#fff",
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={700}
                                                >
                                                    Solte aqui para apagar
                                                </Typography>
                                                {deleteProvided.placeholder}
                                            </Box>
                                        )}
                                    </Droppable>
                                </If>
                            </Stack>
                        )}
                    </Droppable>
                </Stack>
            )}
        </Draggable>
    );
};
