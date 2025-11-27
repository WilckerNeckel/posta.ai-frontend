// ============================================
// MODAL PARA CRIAR NOVA COLUNA
// ============================================
// 
// 🎯 FUNCIONALIDADE: Modal simples para adicionar coluna
// ✅ ESTADO LOCAL: Apenas atualiza Redux (não persiste)
// 🚧 PREPARADO: Para integração com backend futuro
// 
// 📝 USO: setShowNewColumnModal(true) abre modal

import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BaseModal } from "../base-modal/BaseModal";
import { MyInput } from "../my-input/MyInput";
import { useAppDispatch } from "../../redux/store/store";
import { createColumnAsync } from "../../redux/reducers/boards/boards.reducer";
import { setShowNewColumnModal } from "../../redux/reducers/ui/ui.reducer";
import { selectShowNewColumnModal } from "../../redux/reducers/ui/ui.selector";
import { selectActiveBoard } from "../../redux/reducers/boards/boards.selector";
import { fonts, palette } from "../../themes/jsonTheme";
import { stringRequired } from "../../shared/schemas/schemas";

// ============================================
// SCHEMA DE VALIDAÇÃO
// ============================================

const formSchema = yup.object({
  columnName: stringRequired,
});

type NewColumnFormSchema = yup.InferType<typeof formSchema>;

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export const NewColumnModal = () => {
  const isOpen = useSelector(selectShowNewColumnModal);
  const activeBoard = useSelector(selectActiveBoard);
  const dispatch = useAppDispatch();

  const methods = useForm<NewColumnFormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      columnName: "",
    },
  });

  // ============================================
  // HANDLERS
  // ============================================

  const closeModal = () => {
    dispatch(setShowNewColumnModal(false));
    methods.reset();
  };

  /**
   * ✅ FUNCIONAL: Cria nova coluna no board ativo via API
   * - Usa createColumnAsync
   * - Fecha modal e limpa formulário ao concluir com sucesso
   */
  const onSubmit = async (data: NewColumnFormSchema) => {
    if (!activeBoard) {
      console.warn('⚠️ NewColumnModal: Nenhum board ativo para adicionar coluna');
      return;
    }

    console.log('🆕 NewColumnModal: Criando nova coluna:', data.columnName);
    
    const result = await dispatch(
      createColumnAsync({
        name: data.columnName,
        disciplineColumn: false,
      })
    );

    if (createColumnAsync.fulfilled.match(result)) {
      closeModal();
    }
  };

  // ============================================
  // PREPARADO PARA BACKEND (COMENTADO)
  // ============================================
  
  /**
   * 🚧 FUTURO: Função para criar coluna via API
   * Descomente quando backend estiver pronto
   */
  // const onSubmitAsync = async (data: NewColumnFormSchema) => {
  //   if (!activeBoard) return;
  //   
  //   try {
  //     console.log('🚀 NewColumnModal: Criando coluna via API...');
  //     
  //     const columnData = {
  //       name: data.columnName,
  //       boardId: activeBoard.id,
  //     };
  //     
  //     // Dispatch action assíncrona
  //     const result = await dispatch(createColumnAsync(columnData));
  //     
  //     if (result.meta.requestStatus === 'fulfilled') {
  //       console.log('✅ Coluna criada com sucesso via API');
  //       closeModal();
  //     }
  //   } catch (error) {
  //     console.error('❌ Erro ao criar coluna via API:', error);
  //   }
  // };

  // ============================================
  // RENDERIZAÇÃO
  // ============================================

  return (
    <BaseModal
      open={isOpen}
      onClose={closeModal}
      methods={methods}
      onSubmit={methods.handleSubmit(onSubmit)}
      contentSpacing={4}
      contentPadding={{
        xs: 4,
        md: 6,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        fontFamily={fonts.secondary}
        color={palette.primary.main}
      >
        Adicionar Nova Coluna
      </Typography>
      
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ wordBreak: "break-word" }}
      >
        {activeBoard ? 
          `Adicionar nova coluna ao board "${activeBoard.name}"` :
          "Nenhum board ativo"
        }
      </Typography>

      <MyInput 
        name="columnName" 
        customLabel="Nome da Coluna"
        placeholder="Ex: Em Revisão, Finalizado..." 
      />

      <Button 
        variant="contained" 
        type="submit" 
        disabled={!activeBoard}
        sx={{ fontFamily: fonts.secondary }}
      >
        Criar Coluna
      </Button>
    </BaseModal>
  );
}; 
