import {
  DragDropContext,
  Droppable,
  DropResult,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { useEffect, useMemo, useState } from "react";
import { Box, CircularProgress, Typography, Button, Alert, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { ActiveBoardColumn } from "../components/active-board-column/ActiveBoardColumn";
import { DeleteTaskModal } from "../components/delete-task-modal/DeleteTaskModal";
import { NewTaskForm } from "../components/new-task-form/NewTaskForm";
import { NewColumnModal } from "../components/new-column-modal/NewColumnModal";
import { TaskDetails } from "../components/task-details/TaskDetails";
import { NoBoardAlert } from "../components/ui/no-board-alert/NoBoardAlert";
import { DeleteColumnModal } from "../components/delete-column-modal/DeleteColumnModal";
import { Toast } from "../components/ui/toast/Toast";
import { If } from "../components/utils";
import { For } from "../components/utils/For";
import { arrayMove } from "../helpers/arrayMove";
import {
  setColumnsOder,
  setTasksOrder,
  setTaskStatusWithDrag,
  moveTaskOrderAsync,
  moveColumnOrderAsync,
  deleteTaskAsync,
  setActiveTask,
  deleteColumnAsync,
  moveTaskToColumnAsync,
  teacherDeleteTaskAsync,
} from "../redux/reducers/boards/boards.reducer";
import {
  setIsNewBoardModalEditMode,
  setIsNewBoardModalOpen,
} from "../redux/reducers/ui/ui.reducer";
import { selectShowNewTaskModal } from "../redux/reducers/ui/ui.selector";
import { useAppDispatch } from "../redux/store/store";
import { CustomScrollBarObject } from "../shared/css/css.global";
import { useActiveBoardSelector } from "../shared/hooks/useActiveBoardSelector";
import { Column } from "../config/interfaces/board.interface";
import { UserService } from "../services/userService";
import { DisciplineService } from "../services/disciplineService";
import { DisciplineDTO } from "../backend/discipline/DisciplineApi";
import { UserDTO } from "../backend/user/UserApi";

const ColumnsContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  overflow: "auto",
  display: "inline-flex",
  padding: theme.spacing(4, 0),
  "& > *": {
    margin: theme.spacing(0, 4),
  },
  ...CustomScrollBarObject({ theme }),
}));

// ============================================
// COMPONENTES DE LOADING E ERROR
// ============================================

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  gap: theme.spacing(3),
}));

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: "0 auto",
}));

export const DragType = {
  COLUMN: "COLUMN",
  TASK: "TASK",
};

// ============================================
// COMPONENTE PRINCIPAL ATUALIZADO
// ============================================

export const ActiveBoardPage = () => {
  const isOpen = useSelector(selectShowNewTaskModal);
  
  // 🔄 MUDANÇA: Usando estados expandidos do hook
  const { 
    activeBoard, 
    boards, 
    loading, 
    error, 
    appReady,
    reloadData 
  } = useActiveBoardSelector();

  const dispatch = useAppDispatch();
  const [columnToDelete, setColumnToDelete] = useState<Column | null>(null);
  const [isDeletingColumn, setIsDeletingColumn] = useState(false);
  const [deleteColumnError, setDeleteColumnError] = useState<string | null>(null);
  const [showDeleteColumnToast, setShowDeleteColumnToast] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserDTO | null>(null);
  const [userDisciplines, setUserDisciplines] = useState<DisciplineDTO[]>([]);
  console.log("user disciplines", userDisciplines);

  const openNewBoardModal = () => {
    dispatch(setIsNewBoardModalOpen(true));
  };

  const handleOpenEditBoardModal = () => {
    openNewBoardModal();
    dispatch(setIsNewBoardModalEditMode(true));
  };

  const onDragColumn = ({ destination, source }: DropResult) => {
    if (!destination || !activeBoard) return;
    if (destination.index === source.index) return;
    const newColumns = arrayMove(
      activeBoard.columns,
      source.index,
      destination.index
    );
    dispatch(setColumnsOder(newColumns));

    const movedColumn = newColumns[destination.index];
    if (movedColumn) {
      dispatch(
        moveColumnOrderAsync({
          columnId: movedColumn.id,
          newPosition: destination.index + 1,
        })
      );
    }
  };

  const onDragTask = ({ destination, source, draggableId }: DropResult) => {
    if (!destination || !activeBoard) return;
    const sourceColumn = activeBoard.columns.find(
      (col) => col.id === source.droppableId
    );
    const destColumn = activeBoard.columns.find(
      (col) => col.id === destination.droppableId
    );
    if (destination.droppableId.startsWith("delete-")) {
      const deleteColumnId = destination.droppableId.replace("delete-", "");
      const deleteColumn =
        activeBoard.columns.find((col) => col.id === deleteColumnId) ||
        sourceColumn;
      if (deleteColumn?.disciplineColumn && !canManageDisciplineColumn(deleteColumn)) return;

      if (deleteColumn?.disciplineColumn) {
        const disciplineId = getDisciplineIdForColumn(deleteColumn);
        if (!disciplineId) return;
        dispatch(
          teacherDeleteTaskAsync({
            taskId: draggableId,
            disciplineId,
          })
        );
      } else {
        dispatch(deleteTaskAsync(draggableId));
      }
      dispatch(setActiveTask(null));
      return;
    }

    const canManageSource = sourceColumn
      ? canManageDisciplineColumn(sourceColumn)
      : false;
    const canManageDest = destColumn ? canManageDisciplineColumn(destColumn) : false;
    const involvesDiscipline =
      sourceColumn?.disciplineColumn || destColumn?.disciplineColumn;

    // Bloqueia se envolve disciplina e o usuário não pode gerenciar
    if (involvesDiscipline && (!canManageSource || !canManageDest)) return;

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const column = activeBoard.columns.find(
        (col) => col.id === source.droppableId
      );

      if (!column) return;

      const newTasks = arrayMove(column.tasks, source.index, destination.index);
      dispatch(setTasksOrder(newTasks));

      // Envia posição 1-based para API
      const movedTask = newTasks[destination.index];
      if (movedTask) {
        dispatch(
          moveTaskOrderAsync({
            taskId: movedTask.id,
            newPosition: destination.index + 1,
          })
        );
      }
    } else {
      dispatch(
        setTaskStatusWithDrag({
          taskId: draggableId,
          newPosition: destination.index,
          oldColumnId: source.droppableId,
          newColumnId: destination.droppableId,
        })
      );
      dispatch(
        moveTaskToColumnAsync({
          taskId: draggableId,
          targetColumnId: destination.droppableId,
          newPosition: destination.index + 1,
        })
      );
    }
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    if (result.type === DragType.TASK) return onDragTask(result);
    if (result.type === DragType.COLUMN) return onDragColumn(result);
  };

  const handleRequestDeleteColumn = (column: Column) => {
    setDeleteColumnError(null);
    setColumnToDelete(column);
  };

  const handleCloseDeleteColumnModal = () => {
    if (isDeletingColumn) return;
    setColumnToDelete(null);
    setDeleteColumnError(null);
  };

  const handleConfirmDeleteColumn = async () => {
    if (!columnToDelete) return;

    setIsDeletingColumn(true);
    const result = await dispatch(deleteColumnAsync(columnToDelete.id));
    setIsDeletingColumn(false);

    if (deleteColumnAsync.fulfilled.match(result)) {
      setColumnToDelete(null);
      setShowDeleteColumnToast(true);
    } else {
      const payloadMessage =
        (result.payload as string) ||
        (result.payload as { message?: string })?.message ||
        result.error?.message;
      setDeleteColumnError(
        payloadMessage || "Erro ao deletar coluna. Tente novamente."
      );
    }
  };

  useEffect(() => {
    UserService.getCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch((err) => {
        console.error("Erro ao carregar usuário:", err);
      });

    DisciplineService.getMyDisciplines()
      .then((disciplines) => setUserDisciplines(disciplines))
      .catch((err) => {
        console.error("Erro ao carregar disciplinas do usuário:", err);
      });
  }, []);

  const disciplineMapByName = useMemo(() => {
    const map = new Map<string, DisciplineDTO>();
    userDisciplines.forEach((d) => {
      map.set(d.name.toLowerCase().trim(), d);
    });
    return map;
  }, [userDisciplines]);

  const canManageDisciplineColumn = (column: Column) => {
    console.log("column", column)
    if (!column.disciplineColumn) return true;
    if (currentUser?.role !== "professor") return false;
    const d = disciplineMapByName.get(column.name.toLowerCase().trim());
    console.log("discipline for column", d)
    console.log("can manage?", d && d.professorId === currentUser?.id)
    return Boolean(d && d.professorId === currentUser?.id);
  };

  const getDisciplineIdForColumn = (column: Column) => {
    const d = disciplineMapByName.get(column.name.toLowerCase().trim());
    return d?.id;
  };

  // ============================================
  // RENDERIZAÇÃO CONDICIONAL COM NOVOS ESTADOS
  // ============================================

  // 🆕 LOADING: Mostra spinner enquanto carrega
  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress size={60} />
        <Typography variant="h6" color="textSecondary">
          Carregando seu quadro Kanban...
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Buscando dados da API
        </Typography>
      </LoadingContainer>
    );
  }

  // 🆕 ERROR: Mostra erro com botão de retry
  if (error) {
    return (
      <ErrorContainer>
        <Alert 
          severity="error" 
          sx={{ width: "100%", mb: 3 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={reloadData}
              variant="outlined"
            >
              Tentar Novamente
            </Button>
          }
        >
          <Typography variant="h6" component="div" gutterBottom>
            Erro ao carregar dados
          </Typography>
          <Typography variant="body2">
            {error}
          </Typography>
        </Alert>
        
        <Stack spacing={2} alignItems="center">
          <Typography variant="body1" color="textSecondary" textAlign="center">
            Não foi possível carregar seus boards. Verifique sua conexão e tente novamente.
          </Typography>
          
          <Button 
            variant="contained" 
            onClick={reloadData}
            size="large"
          >
            🔄 Recarregar Dados
          </Button>
          
          <Button 
            variant="text" 
            onClick={openNewBoardModal}
            size="small"
          >
            Ou criar um novo board
          </Button>
        </Stack>
      </ErrorContainer>
    );
  }

  // ============================================
  // RENDERIZAÇÃO NORMAL (MANTIDA IGUAL)
  // ============================================
  
  // 📝 NOTA: Lógica existente mantida para compatibilidade
  // Agora só executa quando appReady = true

  if (boards.length === 0) {
    return <NoBoardAlert type="no-boards" onAction={openNewBoardModal} />;
  }

  if (!activeBoard) return null;

  if (activeBoard.columns.length === 0) {
    return (
      <NoBoardAlert type="board-empty" onAction={handleOpenEditBoardModal} />
    );
  }

  // ✅ RENDERIZAÇÃO PRINCIPAL: Só quando dados estão prontos
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        type={DragType.COLUMN}
        direction="horizontal"
        droppableId="active-board"
      >
        {(provided) => (
          <ColumnsContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <For
              each={activeBoard.columns}
              render={(col, i) => (
                <ActiveBoardColumn
                  key={col.id}
                  column={col}
                  index={i}
                  onDeleteColumn={handleRequestDeleteColumn}
                  isDeleting={
                    isDeletingColumn && columnToDelete?.id === col.id
                  }
                  canManageDiscipline={canManageDisciplineColumn(col)}
                  disciplineId={getDisciplineIdForColumn(col)}
                />
              )}
            />
            {provided.placeholder}
            {/* <NewColumnButton /> */}
            <TaskDetails />
            <DeleteTaskModal />
            <If condition={isOpen}>
              <NewTaskForm />
            </If>
            <NewColumnModal />
            <DeleteColumnModal
              open={Boolean(columnToDelete)}
              columnName={columnToDelete?.name}
              tasksCount={columnToDelete?.tasks.length}
              isDeleting={isDeletingColumn}
              errorMessage={deleteColumnError}
              onClose={handleCloseDeleteColumnModal}
              onConfirm={handleConfirmDeleteColumn}
            />
            <Toast
              isOpen={showDeleteColumnToast}
              message="Coluna removida com sucesso"
              onClose={() => setShowDeleteColumnToast(false)}
            />
          </ColumnsContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};
