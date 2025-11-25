import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "@fontsource/inter";
import studentBackground from "../assets/student_background.jpg";
import { AuthApi, LoginRequestDTO } from "../backend/auth/AuthApi";
import { ApiError } from "../backend/http/ApiError";
import { fonts, palette } from "../themes/jsonTheme";

const PageBackground = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, ${palette.background.default} 0%, #f6e8db 40%, #f8d37f 100%)`,
    padding: theme.spacing(6, 2),
}));

const LoginShell = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 1180,
    borderRadius: theme.spacing(4),
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    boxShadow: "0 24px 80px rgba(68, 27, 22, 0.18)",
    backgroundColor: "#fff",
    [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
    },
}));

const HighlightPanel = styled(Box)(({ theme }) => ({
    backgroundImage: `linear-gradient(180deg, rgba(68,27,22,0.86) 0%, rgba(68,27,22,0.78) 100%), url(${studentBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    padding: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
    justifyContent: "space-between",
    minHeight: "28rem",
}));

const FormPanel = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 7),
    backgroundColor: "#fff9f3",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(6, 4),
    },
}));

const FormActions = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

export const LoginPage = () => {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginRequestDTO>({
        defaultValues: { usuario: "", senha: "" },
        mode: "onBlur",
    });

    const onSubmit = async (values: LoginRequestDTO) => {
        setSubmitError(null);
        setIsSubmitting(true);

        try {
            const authApi = new AuthApi();
            const { accessToken } = await authApi.login(values);
            localStorage.setItem("accessToken", accessToken);
            navigate("/board", { replace: true });
        } catch (error) {
            if (error instanceof ApiError) {
                setSubmitError(error.message);
            } else if (error instanceof Error) {
                setSubmitError(error.message);
            } else {
                setSubmitError("Não foi possível realizar o login. Tente novamente.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageBackground>
            <LoginShell elevation={0}>
                <HighlightPanel>
                    <Stack spacing={2}>
                        <Typography
                            variant="h3"
                            fontFamily={fonts.primary}
                            fontWeight={700}
                            color="#fff"
                        >
                            Posta.ai
                        </Typography>
                        <Typography
                            variant="h5"
                            fontFamily={fonts.secondary}
                            fontWeight={700}
                            color={palette.accent.default}
                        >
                            Organize a rotina acadêmica com um quadro pensado para a sua turma.
                        </Typography>
                    </Stack>

                    <Stack spacing={1.5}>
                        <Typography
                            variant="body1"
                            fontFamily={fonts.secondary}
                            color="#f6e8db"
                        >
                            Conecte-se, valide suas credenciais e tenha acesso ao board colaborativo
                            logo de cara.
                        </Typography>
                        <Divider
                            flexItem
                            sx={{ borderColor: "rgba(255,255,255,0.35)", maxWidth: "60%" }}
                        />
                        <Typography
                            variant="subtitle1"
                            fontFamily={fonts.secondary}
                            color="#fcefdc"
                        >
                            Dica: utilize o usuário e a senha criados pelo seu professor para entrar.
                        </Typography>
                    </Stack>
                </HighlightPanel>

                <FormPanel component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={1}>
                        <Typography
                            variant="h4"
                            fontFamily={fonts.primary}
                            color={palette.primary.main}
                        >
                            Bem-vindo de volta
                        </Typography>
                        <Typography
                            variant="body1"
                            fontFamily={fonts.secondary}
                            color={palette.secondary.main}
                        >
                            Faça login para acessar o board da sua disciplina.
                        </Typography>
                    </Stack>

                    <Stack spacing={3}>
                        <TextField
                            label="Usuário"
                            placeholder="Digite seu usuário"
                            fullWidth
                            {...register("usuario", { required: "Informe o usuário" })}
                            error={!!errors.usuario}
                            helperText={errors.usuario?.message}
                            InputProps={{
                                sx: { fontFamily: fonts.secondary },
                            }}
                        />

                        <TextField
                            label="Senha"
                            placeholder="Digite sua senha"
                            type="password"
                            fullWidth
                            {...register("senha", { required: "Informe a senha" })}
                            error={!!errors.senha}
                            helperText={errors.senha?.message}
                            InputProps={{
                                sx: { fontFamily: fonts.secondary },
                            }}
                        />

                        {submitError && (
                            <Alert severity="error" sx={{ borderRadius: 3 }}>
                                {submitError}
                            </Alert>
                        )}
                    </Stack>

                    <FormActions>
                        <Button
                            variant="contained"
                            type="submit"
                            size="large"
                            disableElevation
                            disabled={isSubmitting}
                            sx={{
                                backgroundColor: palette.primary.main,
                                color: "#fff",
                                fontFamily: fonts.secondary,
                                fontWeight: 700,
                                paddingY: 1.2,
                                "&:hover": { backgroundColor: palette.primary[400] },
                            }}
                            startIcon={
                                isSubmitting ? (
                                    <CircularProgress size={18} color="inherit" thickness={5} />
                                ) : null
                            }
                        >
                            {isSubmitting ? "Validando..." : "Entrar no board"}
                        </Button>

                        <Typography
                            variant="body2"
                            fontFamily={fonts.secondary}
                            color={palette.divider.default}
                        >
                            O acesso é exclusivo para alunos e professores cadastrados. Em caso de
                            dúvida, procure sua coordenação.
                        </Typography>
                    </FormActions>
                </FormPanel>
            </LoginShell>
        </PageBackground>
    );
};
