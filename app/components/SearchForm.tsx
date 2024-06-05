import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {alpha} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from 'dayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/navigation";

interface SearchFormProps {
    from_default: string
    to_default: string
}

export default function SearchForm({from_default, to_default} : SearchFormProps) {
    const belarus_cities_ru = ["Барановичи","Барань","Белоозёрск","Белыничи","Березино","Берёза","Берёзовка","Бобруйск","Борисов","Браслав","Брест","Буда-Кошелёво","Быхов","Василевичи","Верхнедвинск","Ветка","Вилейка","Витебск","Волковыск","Воложин","Высокое","Ганцевичи","Глубокое","Гомель","Горка","Горки","Городок","Гродно","Давид-Городок","Дзержинск","Дисна","Добруш","Докшицы","Дороги","Дрогичин","Дубровно","Дятлово","Ельск","Жабинка","Житковичи","Жлобин","Жодино","Заславль","Иваново","Ивацевичи","Ивье","Калинковичи","Каменец","Кировск","Клецк","Климовичи","Кличев","Кобрин","Копыль","Коссово","Костюковичи","Кричев","Круглое","Крупки","Лепель","Лида","Логойск","Лунинец","Любань","Ляховичи","Малорита","Микашевичи","Минск","Миоры","Могилёв","Мозырь","Молодечно","Мосты","Мстиславль","Мядель","Наровля","Несвиж","Новогрудок","Новолукомль","Новополоцк","Орша","Осиповичи","Островец","Ошмяны","Петриков","Пинск","Полоцк","Поставы","Пружаны","Речица","Рогачёв","Светлогорск","Свислочь","Сенно","Скидель","Славгород","Слоним","Слуцк","Смолевичи","Сморгонь","Солигорск","Столбцы","Столин","Толочин","Туров","Узда","Фаниполь","Хойники","Чаусы","Чашники","Червень","Чериков","Чечерск","Шклов","Щучин"]
    const [from, setFrom] = useState<string|null>(from_default);
    const [to, setTo] = useState<string|null>(to_default);
    const [date, setDate] = React.useState<Dayjs | null>(dayjs());

    const [passengers, setPassengers] = useState(1);
    const router = useRouter();
    const handleSearch = () => {
        // Действия по выполнению поиска
        console.log(`Searching for trips from ${from} to ${to} on ${date} for ${passengers} passengers`);
        if ((from && from.trim().length > 0) && (to && to.trim().length > 0)) {
            const url = `/ride-sharing/${from}/${to}`
            router.push(url);
        }
    };
    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: '100%',
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: {xs: 14, sm: 20},
                    pb: {xs: 8, sm: 12},
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' },
                    marginBottom: '40px' }}>
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                        }}
                    >
                        Попутка&nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                fontSize: 'clamp(3rem, 10vw, 4rem)',
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                            }}
                        >
                            BY
                        </Typography>
                    </Typography>
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
                    >
                        Место в котором водители и попутчики находят друг-друга.
                    </Typography>
                </Stack>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Autocomplete
                            value={from}
                            onChange={(event: any, newValue: string | null) => {
                                setFrom(newValue);
                            }}
                            options={belarus_cities_ru}
                            renderInput={(params) => <TextField {...params} label="Откуда" fullWidth/>}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Autocomplete
                            value={to}
                            onChange={(event: any, newValue: string | null) => {
                                setTo(newValue);
                            }}
                            options={belarus_cities_ru}
                            renderInput={(params) => <TextField {...params} label="Откуда" fullWidth/>}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Дата"
                                value={date}
                                onChange={(newDate) => setDate(newDate)}
                                disablePast
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Количество человек"
                            type="number"
                            value={passengers}
                            onChange={(e) => {
                                const p = parseInt(e.target.value)
                                if (p > 0 && p < 10) {
                                    setPassengers(p)
                                } else {
                                    setPassengers(0)
                                }

                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid>
                    <Grid item xs={12} sm={12}>
                        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ width: '100%', margin: '10px'}}>
                            Найти
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
