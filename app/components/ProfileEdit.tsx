import * as React from "react";
import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import Stack from "@mui/material/Stack";
import {Grid} from "@mui/material";
import TripDatePicker from "@/app/components/TripDatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {useSaveProfileService, useUserInfoService} from "@/app/services/UserAuthService";

export default function ProfileEdit() {

    const userInfoService = useUserInfoService()
    const saveProfileService = useSaveProfileService()
    const [auth, setAuth] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [birthday, setBirthday] = useState<Dayjs>(dayjs())
    const [businessActivity, setBusinessActivity] = useState<string>("")
    const [car, setCar] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [music, setMusic] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [telegramId, setTelegramId] = useState<number>(0)
    const [telegramUsername, setTelegramUserame] = useState<string>("")

    useEffect(() => {
        userInfoService()
            .then(value => {
                const data = value.data
                if (data.email?.length > 3) {
                    setAuth(true)
                    setEmail(data.email)
                    setBirthday(dayjs(data.birthday))
                    setBusinessActivity(data.businessActivity)
                    setCar(data.car)
                    setDescription(data.description)
                    setMusic(data.music)
                    setName(data.name)
                    setSurname(data.surname)
                    setTelegramId(data.telegramId)
                    setTelegramUserame(data.telegramUsername)
                }
            })
            .catch(reason => {
                console.error(reason)
            })
    }, [auth, userInfoService]);


    function handleSubmit() {
        saveProfileService({
            birthday: birthday,
            businessActivity: businessActivity,
            car: car,
            description: description,
            email: "",
            music: music,
            name: name,
            surname: surname,
        })
            .then(value => {
                location.reload()
            })
            .catch(reason => {
                console.error(reason)
            })
    }

    return (
        <Stack spacing={2} useFlexGap sx={{width: {xs: '100%', sm: '70%'}}}>
            {auth && (<Stack
                direction={{xs: 'column', sm: 'row'}}
                alignSelf="center"
                spacing={1}
                useFlexGap
                sx={{pt: 2, width: {xs: '100%', sm: 'auto'}}}
            >
                <form>
                    <Grid container spacing={3} direction="column">
                        <Grid item>
                            <Button
                                variant="text"
                                value={email}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                type={'text'}
                                placeholder="Имя"
                                label="Имя"
                                value={name}
                                onChange={event => {
                                    setName(event.target.value)
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                type={'text'}
                                placeholder="Фамилия"
                                label="Фамилия"
                                value={surname}
                                onChange={event => {
                                    setSurname(event.target.value)
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TripDatePicker date={birthday} setDate={setBirthday} label={"Дата рождения"}
                                            isPast={false}/>
                        </Grid>
                        <Grid item>
                            <TextField
                                type={'text'}
                                placeholder="Музыкальные предпочтения"
                                label="Музыкальные предпочтения"
                                value={music}
                                onChange={event => {
                                    setMusic(event.target.value)
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                type={'text'}
                                placeholder="Где работаете/Учитесь"
                                label="Где работаете/Учитесь"
                                value={businessActivity}
                                onChange={event => {
                                    setBusinessActivity(event.target.value)
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                type={'text'}
                                placeholder="Автомобиль"
                                label="Автомобиль"
                                value={car}
                                onChange={event => {
                                    setCar(event.target.value)
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                type={'text'}
                                placeholder="О себе"
                                label="О себе"
                                value={description}
                                onChange={event => {
                                    setDescription(event.target.value)
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Typography variant="caption" textAlign="center" sx={{opacity: 0.8}}>
                            {/*By clicking &quot;Start now&quot; you agree to our&nbsp;*/}
                            Нажимая «Сохранить», вы соглашаетесь с нашими&nbsp;
                            <Link href="/termsandconditions" color="primary">
                                {/*Terms & Conditions*/}
                                Условиями и положениями
                            </Link>
                            .
                        </Typography>
                        <Grid item>
                            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                                Сохранить
                            </Button>
                        </Grid>

                        {telegramId != 0 && (<Grid item>
                            <Typography>
                                Ваш телеграм Юзернейм : {telegramUsername}
                            </Typography>
                            <Typography>
                                Ваш телеграм id : {telegramId}
                            </Typography>
                            <Button variant="contained" color="primary" fullWidth onClick={e => {
                                setTelegramId(0)
                            }}>
                                Обновить привязку телеграмм
                            </Button>
                        </Grid>)}

                        {telegramId == 0 && (<Grid item>
                            <iframe src="/telegram.html"></iframe>
                        </Grid>)}
                    </Grid>
                </form>
            </Stack>)}
        </Stack>
    );
}