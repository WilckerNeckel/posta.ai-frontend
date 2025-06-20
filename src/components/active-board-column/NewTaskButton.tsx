// ============================================
// BOTÃO PARA CRIAR NOVA TASK
// ============================================
// 
// 🎯 FUNCIONALIDADE: Abre modal NewTaskForm em modo criação
// ✅ ESTADO LOCAL: Apenas atualiza Redux (não persiste)
// 🚧 PREPARADO: Para integração com backend futuro
// 
// 📝 USO: setActiveTask(null) + setShowNewTaskModal(true)

import { Add } from "@mui/icons-material";
import { Box, CardActionArea, Stack, Typography } from "@mui/material";
import { setActiveTask } from "../../redux/reducers/boards/boards.reducer";
import { setShowNewTaskModal } from "../../redux/reducers/ui/ui.reducer";
import { useAppDispatch } from "../../redux/store/store";
import { palette } from "../../themes/jsonTheme";

interface Props {
  columnId: string;
  columnName: string;
}

export const NewTaskButton = ({ columnId, columnName }: Props) => {
  const dispatch = useAppDispatch();

  // ============================================
  // FUNÇÃO PRINCIPAL - CRIAR NOVA TASK
  // ============================================
  
  /**
   * ✅ FUNCIONAL: Abre modal para criação de task
   * - Limpa activeTask (modo criação)
   * - Abre modal NewTaskForm
   * - Formulário será submetido via useNewTaskForm
   */
  const handleCreateNewTask = () => {
    console.log('🆕 NewTaskButton: Criando nova task na coluna:', columnName);
    
    // 1. Limpa task ativa (garante modo criação)
    dispatch(setActiveTask(null));
    
    // 2. Abre modal de nova task
    dispatch(setShowNewTaskModal(true));
    
    // 📝 NOTA: columnId será selecionado no formulário
    // O NewTaskForm permite escolher a coluna de destino
  };

  // ============================================
  // PREPARADO PARA BACKEND (COMENTADO)
  // ============================================
  
  /**
   * 🚧 FUTURO: Função para criar task via API
   * Descomente quando backend estiver pronto
   */
  // const handleCreateTaskAsync = async () => {
  //   try {
  //     console.log('🚀 NewTaskButton: Criando task via API...');
  //     
  //     // Exemplo de payload mínimo
  //     const taskData = {
  //       title: 'Nova Task',
  //       description: '',
  //       columnId,
  //       subtasks: []
  //     };
  //     
  //     // Dispatch action assíncrona
  //     const result = await dispatch(createTaskAsync(taskData));
  //     
  //     if (result.meta.requestStatus === 'fulfilled') {
  //       console.log('✅ Task criada com sucesso via API');
  //     }
  //   } catch (error) {
  //     console.error('❌ Erro ao criar task via API:', error);
  //   }
  // };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100px"
      borderRadius="8px"
      mt={3}
      mb={2}
      mx={1}
      sx={(theme) => ({
        cursor: "pointer",
        background: "transparent",
        // border: `2px dashed ${palette.accent.default}`,
        border: `2px dashed white`,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          // backgroundColor: palette.accent.light,
          borderColor: palette.accent.default,
          "& .new-task-button": {
            color: palette.accent.default,
            // color: "white",

          },
        },
      })}
      onClick={handleCreateNewTask}
    >
      <CardActionArea 
        sx={{ 
          height: "100%", 
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          className="new-task-button"
          sx={{ 
        transition: "color 0.2s ease-in-out",
        color: "white",
        textAlign: "center",
          }}
        >
          <Add
        sx={{
          fontSize: "2rem",
        }}
          />
          <Typography
        fontFamily={"inter"}
        variant="body2"
        fontWeight={600}
        color="inherit"
        textAlign="center"
          >
        Nova Task
          </Typography>
        </Stack>
      </CardActionArea>
    </Box>
  );
}; 