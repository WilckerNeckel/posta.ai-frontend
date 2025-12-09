import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { DragIndicator, DeleteOutline } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
// @ts-ignore
import "@fontsource/inter";
import { useState } from "react";
import { fonts } from "../../themes/jsonTheme";

interface Props {
    name: string;
    color: string;
    tasksLength: number;
    isDragging: boolean;
    dragHandleProps: DraggableProvidedDragHandleProps | null;
    onDelete?: () => void;
    isDeleting?: boolean;
}

export const ColumnName = ({
    name,
    color,
    isDragging,
    tasksLength,
    dragHandleProps,
    onDelete,
    isDeleting = false,
}: Props) => {
    const [showDragIcon, setShowDragIcon] = useState(true);
    const deleteDisabled = !onDelete || isDeleting;

    return (
        <Stack
            mb={1}
            // spacing={2}
            direction="row"
            minHeight="1.5rem"
            alignItems="center"
            // onMouseEnter={() => setShowDragIcon(true)}
            // onMouseLeave={() => setShowDragIcon(false)}
        >
            <Box
                bgcolor={color}
                borderRadius="50%"
                minWidth=".9375rem"
                minHeight=".9375rem"
            />
            <Typography
                variant="body2"
                fontSize={18}
                fontWeight={1000}
                fontFamily={fonts.secondary}
                // letterSpacing={1}
                color="white"
                pt={2}
                sx={{ flex: 1 }}
            >
                {`${name} (${tasksLength})`}
            </Typography>
            {onDelete && (
                <Tooltip title="Excluir coluna">
                    <span>
                        <IconButton
                            size="small"
                            sx={{ color: "white" }}
                            onClick={onDelete}
                            disabled={deleteDisabled}
                        >
                            {isDeleting ? (
                                <CircularProgress size={18} color="inherit" />
                            ) : (
                                <DeleteOutline fontSize="small" />
                            )}
                        </IconButton>
                    </span>
                </Tooltip>
            )}
            <AnimatePresence>
                {(showDragIcon || isDragging) && (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <Stack
                        {...dragHandleProps}
                        component={motion.div}
                        sx={{ cursor: "grab" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <DragIndicator sx={{ color: "white" }} />
                    </Stack>
                )}
            </AnimatePresence>
        </Stack>
    );
};
