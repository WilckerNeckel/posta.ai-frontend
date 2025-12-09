import { Divider, Stack } from "@mui/material";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Column } from "../../config/interfaces/board.interface";
import { CustomScrollBarObject } from "../../shared/css/css.global";
import { For } from "../utils/For";
import { ColumnName } from "./ColumnName";
import { ColumnTaskItem } from "./ColumnTaskItem";
import { NewTaskButton } from "./NewTaskButton";
import { DragType } from "../../pages/ActiveBoardPage";
import { palette } from "../../themes/jsonTheme";
import { useSelector } from "react-redux";
import { selectFilteredTasks, selectIsFiltered } from "../../redux/reducers/boards/boards.selector";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";

interface Props {
  column: Column;
  index: number;
  onDeleteColumn: (column: Column) => void;
  isDeleting?: boolean;
}

export const ActiveBoardColumn = ({ column, index, onDeleteColumn, isDeleting = false }: Props) => {
  const filteredTasks = useSelector(selectFilteredTasks);
  const isFiltered = useSelector(selectIsFiltered);

  // Filter tasks for this column when filtering is active
  const displayTasks = isFiltered 
    ? column.tasks.filter(task => 
        filteredTasks.some(filteredTask => filteredTask.id === task.id)
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
          sx={
            {
              backgroundColor: palette.primary.main
              
            }
          }
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
          <Droppable droppableId={column.id} type={DragType.TASK}>
            {(dropProvided) => (
              <Stack
                height="100%"
                overflow="auto"
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                sx={(theme) => CustomScrollBarObject({ theme, hidden: true })}
              >
                <For
                  each={displayTasks}
                  render={(task, taskIndex) => (
                    <ColumnTaskItem
                      task={task}
                      key={task.id}
                      index={taskIndex}
                    />
                  )}
                />
                {dropProvided.placeholder}
                <NewTaskButton 
                  columnId={column.id}
                  columnName={column.name}
                />
                <Droppable droppableId={`delete-${column.id}`} type={DragType.TASK}>
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
                        borderColor: deleteSnapshot.isDraggingOver
                          ? palette.error?.main || "#EA5555"
                          : "#ffffff80",
                        backgroundColor: deleteSnapshot.isDraggingOver
                          ? "#ea555525"
                          : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        transition: "all 0.2s ease-in-out",
                        color: "#fff",
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                      <Typography variant="body2" fontWeight={700}>
                        Solte aqui para apagar
                      </Typography>
                      {deleteProvided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Stack>
            )}
          </Droppable>

        </Stack>
      )}
    </Draggable>
  );
};
