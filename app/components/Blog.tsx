import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const news = [
    {
        id: 1,
        date: '2024-04-04',
        title: 'Привет мир',
        content: 'Мы открылись в альфарежиме. Замечания по багам и запрос новой функциональности отправляйте на почту help@poputka.by',
    }
];

const Blog = () => {
    return (
        <Container
            id="faq"
            sx={{
                pt: {xs: 4, sm: 12},
                pb: {xs: 8, sm: 16},
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: {xs: 3, sm: 6},
            }}
        >
            <Typography
                component="h2"
                variant="h4"
                color="text.primary"
                sx={{
                    width: {sm: '100%', md: '60%'},
                    textAlign: {sm: 'left', md: 'center'},
                }}
            >
                Новости проекта
            </Typography>
            <Box sx={{width: '100%'}}>
                <Container maxWidth="md" style={{marginTop: '20px'}}>
                    <Stack spacing={3}>
                        {news.map((item) => (
                            <Card key={item.id}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" style={{marginTop: '10px'}}>
                                        {item.date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </Container>
            </Box>
        </Container>
    );
};

export default Blog;
