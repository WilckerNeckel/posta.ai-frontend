import { Alert, Button, Stack, Typography } from "@mui/material";
import { BaseModal } from "../base-modal/BaseModal";
import { fonts } from "../../themes/jsonTheme";

interface DeleteColumnModalProps {
    open: boolean;
    columnName?: string;
    tasksCount?: number;
    isDeleting?: boolean;
    errorMessage?: string | null;
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteColumnModal = ({
    open,
    columnName,
    tasksCount = 0,
    isDeleting = false,
    errorMessage,
    onClose,
    onConfirm,
}: DeleteColumnModalProps) => {
    const hasTasks = tasksCount > 0;
    const displayName = columnName || "coluna selecionada";

    return (
        <BaseModal open={open} onClose={onClose}>
            <Typography
                variant="h6"
                fontWeight={700}
                color="error"
                fontFamily={fonts.secondary}
            >
                Excluir coluna?
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                fontFamily={fonts.secondary}
                sx={{ wordBreak: "break-word" }}
            >
                Tem certeza de que deseja excluir a coluna "{displayName}"?
                {hasTasks
                    ? ` Todas as ${tasksCount} tarefas associadas serão removidas.`
                    : " Essa ação não pode ser desfeita."}
            </Typography>

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Stack direction="row" spacing={4}>
                <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    onClick={onConfirm}
                    disabled={isDeleting}
                    sx={{
                        fontFamily: fonts.secondary,
                    }}
                >
                    {isDeleting ? "Excluindo..." : "Excluir"}
                </Button>
                <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    sx={{
                        fontFamily: fonts.secondary,
                    }}
                    onClick={onClose}
                    disabled={isDeleting}
                >
                    Cancelar
                </Button>
            </Stack>
        </BaseModal>
    );
};
