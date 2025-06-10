import * as React from 'react';
import {useEffect, useState} from 'react';
import {MenuItem, PaletteMode} from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {Labels} from "@/app/components/labels";
import {logoStyle} from "@/app/components/CustomIcons";
import {useUserInfoService} from "@/app/services/UserAuthService";
import {UserInfo} from "@/app/dti/UserInfo";
import dayjs from "dayjs";
import Image from 'next/image';

interface AppAppBarProps {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

function AppAppBar({mode, toggleColorMode}: AppAppBarProps) {
    const [open, setOpen] = React.useState(false);
    const userInfoService = useUserInfoService()
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const [auth, setAuth] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserInfo>({
        birthday: dayjs(),
        businessActivity: "",
        car: "",
        description: "",
        email: "",
        music: "",
        name: "",
        surname: ""
    })
    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")

    useEffect(() => {
        userInfoService()
            .then(value => {
                const data = value.data
                if (data.email?.length > 3) {
                    setAuth(true)
                    setUserInfo(data)
                    setName(data.name)
                    setSurname(data.surname)
                }
            })
            .catch(reason => {
                console.error(reason)
            })
    }, [name, surname, userInfoService]);

    // const { t } = useTranslation();
    const t = (label: string) => {
        switch (label) {
            case Labels.helpFAQ:
                return "Помощь/FAQ"
            case Labels.singIn:
                return "Войти"
            case Labels.singUp:
                return "Зарегистрироваться"
            default:
                return ""
        }
    }

    const scrollToSection = (sectionId: string) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({behavior: 'smooth'});
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <Link href={'/'}>
                                <Image
                                    width={140}
                                    height={60}
                                    src={'/logo.png'}
                                    style={logoStyle}
                                    alt="logo of Poputka.by"
                                />
                            </Link>
                            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                                <MenuItem
                                    sx={{py: '6px', px: '12px'}}
                                >
                                    {auth && (<Typography variant="body2" color="text.primary">
                                        <Link href={"/trip"}>
                                            Создать новую поездку
                                        </Link>
                                    </Typography>)}
                                </MenuItem>
                                <MenuItem
                                    sx={{py: '6px', px: '12px'}}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        <Link href={"/faq"}>
                                            {t(Labels.helpFAQ)}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                                {/*<MenuItem*/}
                                {/*  onClick={() => scrollToSection('testimonials')}*/}
                                {/*  sx={{ py: '6px', px: '12px' }}*/}
                                {/*>*/}
                                {/*  <Typography variant="body2" color="text.primary">*/}
                                {/*    Testimonials*/}
                                {/*  </Typography>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem*/}
                                {/*  onClick={() => scrollToSection('highlights')}*/}
                                {/*  sx={{ py: '6px', px: '12px' }}*/}
                                {/*>*/}
                                {/*  <Typography variant="body2" color="text.primary">*/}
                                {/*    Highlights*/}
                                {/*  </Typography>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem*/}
                                {/*  onClick={() => scrollToSection('pricing')}*/}
                                {/*  sx={{ py: '6px', px: '12px' }}*/}
                                {/*>*/}
                                {/*  <Typography variant="body2" color="text.primary">*/}
                                {/*    Pricing*/}
                                {/*  </Typography>*/}
                                {/*</MenuItem>*/}
                                {/*<MenuItem*/}
                                {/*  onClick={() => scrollToSection('faq')}*/}
                                {/*  sx={{ py: '6px', px: '12px' }}*/}
                                {/*>*/}
                                {/*  <Typography variant="body2" color="text.primary">*/}
                                {/*    FAQ*/}
                                {/*  </Typography>*/}
                                {/*</MenuItem>*/}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: {xs: 'none', md: 'flex'},
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode}/>
                            {!auth && (<Button
                                color="primary"
                                variant="text"
                                size="small"
                                component="a"
                                href="/sign-in/"
                                // target="_blank"
                            >
                                {t(Labels.singIn)}
                            </Button>)}
                            {!auth && (<Button
                                color="primary"
                                variant="contained"
                                size="small"
                                component="a"
                                href="/sign-up/"
                                // target="_blank"
                            >
                                {t(Labels.singUp)}
                            </Button>)}

                            {auth && (<Button
                                color="primary"
                                variant="contained"
                                size="small"
                                component="a"
                                href="/profile/"
                                // target="_blank"
                            >
                                Добро пожаловать, {name} {surname}
                            </Button>)}

                        </Box>
                        <Box sx={{display: {sm: '', md: 'none'}}}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{minWidth: '30px', p: '4px'}}
                            >
                                <MenuIcon/>
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'end',
                                            flexGrow: 1,
                                        }}
                                    >
                                        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode}/>
                                    </Box>
                                    <MenuItem>
                                        {auth && (<Link href={"/trip"}>
                                            Создать новую поездку
                                        </Link>)}
                                    </MenuItem>
                                    <MenuItem>
                                        <Link href={"/faq"}>
                                            {t(Labels.helpFAQ)}
                                        </Link>
                                    </MenuItem>
                                    {/*<MenuItem onClick={() => scrollToSection('testimonials')}>*/}
                                    {/*  Testimonials*/}
                                    {/*</MenuItem>*/}
                                    {/*<MenuItem onClick={() => scrollToSection('highlights')}>*/}
                                    {/*  Highlights*/}
                                    {/*</MenuItem>*/}
                                    {/*<MenuItem onClick={() => scrollToSection('pricing')}>*/}
                                    {/*  Pricing*/}
                                    {/*</MenuItem>*/}
                                    <Divider/>
                                    {!auth && (<MenuItem>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            component="a"
                                            href="/sign-up/"
                                            target="_blank"
                                            sx={{width: '100%'}}
                                        >
                                            {t(Labels.singUp)}
                                        </Button>
                                    </MenuItem>)}
                                    {!auth && (<MenuItem>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            component="a"
                                            href="/sign-in/"
                                            target="_blank"
                                            sx={{width: '100%'}}
                                        >
                                            {t(Labels.singIn)}
                                        </Button>
                                    </MenuItem>)}
                                    {auth && (<MenuItem>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            component="a"
                                            href="/profile/"
                                            target="_blank"
                                            sx={{width: '100%'}}
                                        >
                                            Добро пожаловать, {name} {surname}
                                        </Button>
                                    </MenuItem>)}
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default AppAppBar;
