import Stack from "@mui/material/Stack";
import {Box, Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";
import {useEffect, useState} from "react";
import {PopularRoute} from "@/app/dti/PopularRoute";
import {usePopularRoutesService} from "@/app/services/TripService";

export default function PopularRoutes() {
    const [popularRoutes, setPopularRoutes] = useState<PopularRoute[]>([])
    const popularRoutesService = usePopularRoutesService();

    useEffect(() => {
        popularRoutesService().then(value => {
            setPopularRoutes(value.data)
            console.log(value.data)
        })
    }, [popularRoutesService]);

    return (<Stack spacing={2} useFlexGap sx={{width: {xs: '100%', sm: '70%'}}}>
        <Stack
            direction={{xs: 'column', sm: 'row'}}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{pt: 2, width: {xs: '100%', sm: 'auto'}}}
        >
            <Box
                sx={{
                    width: {sm: '100%', md: '60%'},
                    textAlign: {sm: 'left', md: 'center'},
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary">
                    Маршруты, популярные у наших пользователей:
                </Typography>
            </Box>
            {popularRoutes.map((route) => (
                <Card key={route.placeFrom + '-' + route.placeTo} sx={{
                    width: '100%',
                    padding: '10px'
                }}>
                    <CardContent>
                        <Typography variant="h4">
                            <Link href={'/ride-sharing/' + route.placeFrom + '/' + route.placeTo}>
                                {route.placeFrom + ' - ' + route.placeTo}
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    </Stack>);
}