import * as React from 'react';
import {useState} from 'react';
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
import getSignUpInTheme from '../getSignUpInTheme';
import ToggleColorMode from './ToggleColorMode';
import {PoputkaByIcon} from '../components/CustomIcons';
import {ToggleCustomTheme} from "@/app/customThemeService";
import {useSignUpService} from "@/app/services/UserAuthService";
import {SignUpRequest} from "@/app/dti/SignUpRequest";
import SignUpThanks from "@/app/sign-up/SignUpThanks";
import {useRouter} from "next/navigation";

export default function SignUp() {
  const router = useRouter()
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpInTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');
  const [openSignUpThanks, setOpenSignUpThanks] = useState<boolean>(false)

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const lastName = document.getElementById('lastName') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      // setEmailErrorMessage('Please enter a valid email address.');
      setEmailErrorMessage('Введите корректный email адрес');
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

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!lastName.value || lastName.value.length < 1) {
      setLastNameError(true);
      setLastNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage('');
    }

    return isValid;
  };

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const signUpService = useSignUpService()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get('name'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    });

    const signUpData: SignUpRequest = {
      email: data.get('email') as string,
      password: data.get('password') as string,
      name: data.get('name') as string,
      surname: data.get('lastName') as string,
    };
    signUpService(signUpData)
        .then(value => {
          if (value.data.success) {
            setOpenSignUpThanks(true)
          }
        });
  };

  const handleCloseSignUpThanks = () => {
    setOpenSignUpThanks(false)
    router.push("/sign-in")
  }
  return (
    <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
      <CssBaseline />
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={(theme) => ({
          backgroundImage:
            theme.palette.mode === 'light'
              ? `linear-gradient(180deg, ${alpha('#CEE5FD', 0.2)}, #FFF)`
              : `linear-gradient(${alpha('#02294F', 0.2)}, ${alpha('#021F3B', 0.0)})`,
          backgroundRepeat: 'no-repeat',
          height: { xs: 'auto', sm: '100dvh' },
          pb: { xs: 12, sm: 0 },
        })}
        component="main"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            position: { xs: 'static', sm: 'fixed' },
            width: '100%',
            p: { xs: 2, sm: 4 },
          }}
        >
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            component="a"
            href="/"
          >
            Back
          </Button>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        </Stack>
        <Stack
          justifyContent="center"
          sx={{ height: { xs: '100%', sm: '100dvh' }, p: 2 }}
        >
          <Card
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              width: { xs: '100%', sm: '450px' },
              p: { xs: 2, sm: 4 },
              gap: 4,
              boxShadow:
                theme.palette.mode === 'light'
                  ? 'rgba(0, 0, 0, 0.05) 0px 5px 15px 0px, rgba(25, 28, 33, 0.05) 0px 15px 35px -5px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px'
                  : 'rgba(0, 0, 0, 0.5) 0px 5px 15px 0px, rgba(25, 28, 33, 0.08) 0px 15px 35px -5px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
            })}
          >
            <PoputkaByIcon sx={{ width: 100 }} />
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="John"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastName">Last name</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  placeholder="Snow"
                  name="lastName"
                  autoComplete="last-name"
                  error={lastNameError}
                  helperText={lastNameErrorMessage}
                  color={lastNameError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
              {/*<FormControlLabel*/}
              {/*  control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
              {/*  label="I want to receive updates via email."*/}
              {/*/>*/}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Sign up
              </Button>
              <Link
                href="/sign-in/"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Already have an account? Sign in
              </Link>
            </Box>
            {/*<Divider>*/}
            {/*  <Typography color="text.secondary">or</Typography>*/}
            {/*</Divider>*/}
            <SignUpThanks open={openSignUpThanks}
                          handleClose={handleCloseSignUpThanks}/>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/*<Button*/}
              {/*  type="submit"*/}
              {/*  fullWidth*/}
              {/*  variant="outlined"*/}
              {/*  color="secondary"*/}
              {/*  onClick={() => alert('Sign up with Google')}*/}
              {/*  startIcon={<GoogleIcon />}*/}
              {/*>*/}
              {/*  Sign up with Google*/}
              {/*</Button>*/}
              {/*<Button*/}
              {/*  type="submit"*/}
              {/*  fullWidth*/}
              {/*  variant="outlined"*/}
              {/*  color="secondary"*/}
              {/*  onClick={() => alert('Sign up with Facebook')}*/}
              {/*  startIcon={<FacebookIcon />}*/}
              {/*>*/}
              {/*  Sign up with Facebook*/}
              {/*</Button>*/}
            </Box>
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
