import DocumentsService from '@/app/services/DocumentsService';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import TripDatePicker from '../TripDatePicker';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select, MenuItem, SelectChangeEvent, Grid, TextField, Stack, Typography } from '@mui/material';
import { PersonDocumentType } from '@/app/types/PersonDocumentType';

type AddDocumentProps = {
    onCreated?: () => void;
};

const AddDocument: React.FC<AddDocumentProps> = ({ onCreated }) => {
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [documentType, setDocumentType] = useState<PersonDocumentType>(PersonDocumentType.OTHER);
    const [description, setDescription] = useState<string>('');
    const [expirationDate, setExpirationDate] = React.useState<Dayjs>(dayjs());
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePersonDocumentTypeChange = (event: SelectChangeEvent) => {
        setDocumentType(event.target.value as PersonDocumentType);
    };

    const handleFilesChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const next = Array.from(e.target.files ?? []);
        setFiles(next);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        setIsSubmitting(true);

        try {
            const createdDocument = await DocumentsService.createDocument({
                type: documentType,
                description: description,
                expirationDate: expirationDate,
            });

            if (files.length > 0) {
                await DocumentsService.uploadDocumentFiles(createdDocument.id, files);
            }

            setSuccess(`Документ "${createdDocument.description}" успешно добавлен!`);
            onCreated?.();
            // Очистка полей формы
            setDocumentType(PersonDocumentType.OTHER);
            setDescription('');
            setExpirationDate(dayjs());
            setFiles([]);
        } catch (err) {
            setError('Ошибка при добавлении документа. Пожалуйста, попробуйте еще раз.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {isFormVisible && (
                <>
                    <h2>Добавить новый документ</h2>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3} direction="column">
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel id="document-type-select-label">Выберите тип документа</InputLabel>
                                    <Select
                                        labelId="document-type-select-label"
                                        id="document-type-select"
                                        value={documentType}
                                        label="Тип документа"
                                        onChange={handlePersonDocumentTypeChange}
                                    >
                                        <MenuItem value={PersonDocumentType.DRIVER_LICENCE}>Водительское удостоверение</MenuItem>
                                        <MenuItem value={PersonDocumentType.PASSPORT}>Паспорт</MenuItem>
                                        <MenuItem value={PersonDocumentType.OTHER}>Другой тип</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <TextField
                                    type={'text'}
                                    placeholder="Описание документа"
                                    label="Описание документа"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TripDatePicker date={expirationDate} setDate={setExpirationDate} label={"Дата истечения"} isPast={true} />
                            </Grid>
                            <Grid item>
                                <Stack spacing={1}>
                                    <Button component="label" variant="outlined" disabled={isSubmitting}>
                                        Выбрать файлы
                                        <input
                                            hidden
                                            type="file"
                                            multiple
                                            onChange={handleFilesChange}
                                        />
                                    </Button>
                                    {files.length > 0 && (
                                        <Typography variant="body2">
                                            Выбрано файлов: {files.length}
                                        </Typography>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item>
                                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                                    Добавить документ
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </>)}
            {!isFormVisible && (
                <Grid container spacing={3} direction="column">
                    <Grid item>
                        <Button variant="contained" color="primary" fullWidth onClick={() => setIsFormVisible(true)}>
                            Добавить новый документ
                        </Button>
                    </Grid>
                </Grid>
            )}
        </div >
    );
};

export default AddDocument;
