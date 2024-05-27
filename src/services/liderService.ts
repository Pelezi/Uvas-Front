import api from './api';

export interface Lider {
    id: string;
    pessoaId: {
        id?: string
        nome?: string;
    };
    celulas?: {
            id?: string;
            nome?: string;
            
    }[];
}

export interface LiderCreateOrUpdate {
    id?: string;
    pessoaId: string;
    celulas?: {
            id?: string;
            nome?: string;
            
    }[];
}

export const createLider = async (lider: LiderCreateOrUpdate): Promise<Lider> => {
    const response = await api.post<Lider>('/lideres', lider);
    return response.data;
}

export const getLideres = async (): Promise<Lider[]> => {
    const response = await api.get<Lider[]>('/lideres');
    return response.data;
}

export const getLideresById = async (id: string): Promise<Lider> => {
    const response = await api.get<Lider>(`/lideres/${id}`);
    return response.data;
}

export const updateLider = async (lider: LiderCreateOrUpdate): Promise<Lider> => {
    const response = await api.put<Lider>(`/lideres/${lider.id}`, lider);
    return response.data;
}

export const deleteLider = async (id: string | undefined): Promise<Lider> => {
    const response = await api.delete<Lider>(`/lideres/${id}`);
    return response.data;
}

export const createOrUpdateLider = async (lider: LiderCreateOrUpdate): Promise<Lider> => {
    if (!lider.id) {
        return await createLider(lider);
    } else {
        return await updateLider(lider);
    }
}