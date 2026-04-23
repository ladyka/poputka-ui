import React, { useEffect, useMemo, useState } from 'react';
import DocumentsService from '@/app/services/DocumentsService';
import { UserDocumentDto } from '@/app/types/UserDocumentDto';
import dayjs from 'dayjs';
import { Box, Card, CardContent, Chip, CircularProgress, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';

type DocumentsListProps = {
    refreshToken?: number;
};

const DocumentsList: React.FC<DocumentsListProps> = ({ refreshToken }) => {
    const [documents, setDocuments] = useState<UserDocumentDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const docs = await DocumentsService.getDocuments();
                setDocuments(docs);
            } catch (error) {
                console.error("Error fetching documents:", error);
                setError('Не удалось загрузить документы.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocuments();
    }, [refreshToken]);

    const items = useMemo(() => documents ?? [], [documents]);

    const formatExpiration = (value: unknown) => {
        const d = dayjs(value as any);
        return d.isValid() ? d.format('DD.MM.YYYY') : '—';
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Мои документы
            </Typography>

            {isLoading && (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <CircularProgress size={18} />
                    <Typography variant="body2">Загрузка...</Typography>
                </Stack>
            )}

            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {!isLoading && !error && items.length === 0 && (
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Документов пока нет.
                </Typography>
            )}

            {items.length > 0 && (
                <Card variant="outlined">
                    <CardContent>
                        <List disablePadding>
                            {items.map((doc, idx) => (
                                <ListItem
                                    key={doc.id}
                                    divider={idx !== items.length - 1}
                                    sx={{ px: 0 }}
                                    secondaryAction={
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {doc.status && <Chip size="small" label={doc.status} variant="outlined" />}
                                            <Chip size="small" label={`до ${formatExpiration(doc.expirationDate)}`} />
                                        </Stack>
                                    }
                                >
                                    <ListItemText
                                        primary={
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                {doc.type && <Chip size="small" label={doc.type} />}
                                                <Typography variant="subtitle1">{doc.description}</Typography>
                                            </Stack>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default DocumentsList;
