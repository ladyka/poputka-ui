import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {alpha, PaletteMode} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import ForgotPassword from './ForgotPassword';
import getSignUpInTheme from '../getSignUpInTheme';
import ToggleColorMode from './ToggleColorMode';
import {PoputkaByIcon} from '../components/CustomIcons';
import {Labels} from "@/app/components/labels";
import useLoginService from "@/app/services/UserAuthService";
import InvalidEmailOrPassword from "@/app/sign-in/InvalidEmailOrPassword";
import {useRouter} from "next/navigation";
import {ToggleCustomTheme} from "@/app/customThemeService";

export default function SignIn() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const defaultTheme = createTheme({palette: {mode}});
    const SignInTheme = createTheme(getSignUpInTheme(mode));
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openInvalidEmailOrPassword, setOpenInvalidEmailOrPassword] = React.useState(false);
    const loginService = useLoginService()
    const router = useRouter();
    // const { t } = useTranslation();
    const t = (label: string) => {
        switch (label) {
            case Labels.email:
                return "Электронная почта (Email)"
            case Labels.password:
                return "Пароль"
            case Labels.password_forgot:
                return "Забыли свой пароль?"
            case Labels.sign_in_have_not_account:
                return "Нет аккаунта. Зарегистрироваться"
            case Labels.signIn:
                return "Войти"
            case Labels.forward_main_page:
                return "На главную"
            default:
                return "FIX : " + label
        }
    }

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseInvalidEmailOrPassword = () => {
        setOpenInvalidEmailOrPassword(false);
    };

    const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginData = new FormData();
        loginData.append("username", '' + data.get('email'));
        loginData.append("password", '' + data.get('password'));
        loginService(loginData)
            .then(value => {
                if (value.status == 200) {
                    if (value.data.indexOf('Bad credentials') > 0) {
                        setOpenInvalidEmailOrPassword(true)
                    } else {
                        router.push("/");
                    }
                } else {
                    setOpenInvalidEmailOrPassword(true)
                    console.log(value)
                }
            })
            .catch(reason => {
                if (reason.response?.status === 302) {
                    router.push("/");
                }
                setOpenInvalidEmailOrPassword(true)
            })
    };

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
            <CssBaseline/>
            <Stack
                direction="column"
                justifyContent="space-between"
                sx={(theme) => ({
                    backgroundImage:
                        theme.palette.mode === 'light'
                            ? `linear-gradient(180deg, ${alpha('#CEE5FD', 0.2)}, #FFF)`
                            : `linear-gradient(${alpha('#02294F', 0.2)}, ${alpha('#021F3B', 0.0)})`,
                    backgroundRepeat: 'no-repeat',
                    height: {xs: 'auto', sm: '100dvh'},
                    pb: {xs: 12, sm: 0},
                })}
                component="main"
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                        position: {xs: 'static', sm: 'fixed'},
                        width: '100%',
                        p: {xs: 2, sm: 4},
                    }}
                >
                    <Button
                        startIcon={<ArrowBackRoundedIcon/>}
                        component="a"
                        href="/"
                    >
                        {t(Labels.forward_main_page)}
                    </Button>
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode}/>
                </Stack>
                <Stack
                    justifyContent="center"
                    sx={{height: {xs: '100%', sm: '100dvh'}, p: 2}}
                >
                    <Card
                        sx={(theme) => ({
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'center',
                            width: {xs: '100%', sm: '450px'},
                            p: {xs: 2, sm: 4},
                            gap: 4,
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? 'rgba(0, 0, 0, 0.05) 0px 5px 15px 0px, rgba(25, 28, 33, 0.05) 0px 15px 35px -5px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px'
                                    : 'rgba(0, 0, 0, 0.5) 0px 5px 15px 0px, rgba(25, 28, 33, 0.08) 0px 15px 35px -5px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
                        })}
                    >
                        <PoputkaByIcon sx={{width: 100}}/>
                        {/*<img*/}
                        {/*    src={'/logo.png'}*/}
                        {/*    style={logoStyle}*/}
                        {/*    alt="logo of Poputka.by"*/}
                        {/*/>*/}
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                        >
                            {t(Labels.signIn)}
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleLoginSubmit}
                            noValidate
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                gap: 2,
                            }}
                        >
                            <FormControl>
                                <FormLabel htmlFor="email">{t(Labels.email)}</FormLabel>
                                <TextField
                                    error={emailError}
                                    helperText={emailErrorMessage}
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    autoComplete="email"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={emailError ? 'error' : 'primary'}
                                    sx={{ariaLabel: 'email'}}
                                />
                            </FormControl>
                            <FormControl>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <FormLabel htmlFor="password">{t(Labels.password)}</FormLabel>
                                    {/*<Link*/}
                                    {/*    component="button"*/}
                                    {/*    onClick={handleClickOpen}*/}
                                    {/*    variant="body2"*/}
                                    {/*    sx={{alignSelf: 'baseline'}}*/}
                                    {/*>*/}
                                    {/*    {t(Labels.password_forgot)}*/}
                                    {/*</Link>*/}
                                </Box>
                                <TextField
                                    error={passwordError}
                                    helperText={passwordErrorMessage}
                                    name="password"
                                    placeholder="••••••"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    autoFocus
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={passwordError ? 'error' : 'primary'}
                                />
                            </FormControl>
                            {/*<FormControlLabel*/}
                            {/*  control={<Checkbox value="remember" color="primary" />}*/}
                            {/*  label="Remember me"*/}
                            {/*/>*/}
                            <ForgotPassword open={open} handleClose={handleClose}/>
                            <InvalidEmailOrPassword open={openInvalidEmailOrPassword}
                                                    handleClose={handleCloseInvalidEmailOrPassword}/>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={validateInputs}
                            >
                                {t(Labels.signIn)}
                            </Button>
                            <Link
                                href="/sign-up/"
                                variant="body2"
                                sx={{alignSelf: 'center'}}
                            >
                                {t(Labels.sign_in_have_not_account)}
                            </Link>
                        </Box>
                        {/*<Divider>or</Divider>*/}
                        {/*<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>*/}
                        {/*  <Button*/}
                        {/*    type="submit"*/}
                        {/*    fullWidth*/}
                        {/*    variant="outlined"*/}
                        {/*    color="secondary"*/}
                        {/*    onClick={() => alert('Sign in with Google')}*/}
                        {/*    startIcon={<GoogleIcon />}*/}
                        {/*  >*/}
                        {/*    Sign in with Google*/}
                        {/*  </Button>*/}
                        {/*  <Button*/}
                        {/*    type="submit"*/}
                        {/*    fullWidth*/}
                        {/*    variant="outlined"*/}
                        {/*    color="secondary"*/}
                        {/*    onClick={() => alert('Sign in with Facebook')}*/}
                        {/*    startIcon={<FacebookIcon />}*/}
                        {/*  >*/}
                        {/*    Sign in with Facebook*/}
                        {/*  </Button>*/}
                        {/*</Box>*/}
                    </Card>
                </Stack>
            </Stack>
            <ToggleCustomTheme
                showCustomTheme={showCustomTheme}
                toggleCustomTheme={toggleCustomTheme}
            />
        </ThemeProvider>
    );
}
