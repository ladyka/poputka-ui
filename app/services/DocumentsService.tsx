import {apiInstance} from "@/app/services/ApiInstance";
import { UserDocumentDto } from "../types/UserDocumentDto";
import { UserDocumentRequestDto } from "../types/UserDocumentRequestDto";

class DocumentsService {
    // Получение всех документов пользователя
    async getDocuments(): Promise<UserDocumentDto[]> {
        const response = await apiInstance.get<UserDocumentDto[]>('/documents');
        return response.data;
    }

    // Создание нового документа
    async createDocument(dto: UserDocumentRequestDto): Promise<UserDocumentDto> {
        const response = await apiInstance.put<UserDocumentDto>('/documents/create', dto);
        return response.data;
    }

    // Обновление существующего документа
    async updateDocument(documentId: string, dto: UserDocumentRequestDto): Promise<UserDocumentDto> {
        const response = await apiInstance.put<UserDocumentDto>(`/documents/update/${documentId}`, dto);
        return response.data;
    }

    // Загрузка файлов документа
    async uploadDocumentFiles(documentId: string, files: File[]): Promise<string[]> {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });
        const response = await apiInstance.post<string[]>(`/documents/upload/${documentId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    // Отправка документа на проверку
    async submitDocument(documentId: string): Promise<UserDocumentDto> {
        const response = await apiInstance.post<UserDocumentDto>(`/documents/submit/${documentId}`);
        return response.data;
    }
}

export default new DocumentsService();
