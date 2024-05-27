import api from './api';

export interface Celula {
    id: string;
    nome: string;
    liderId?: {
        id?: string,
        pessoaId?: {
            id?: string,
            nome?: string
        }
    };
    discipuladorId: string;
    enderecoId?: {
        id: string;
        numero: string;
        rua: string;
        bairro: string;
        addressType: string;
    };
}

export const createCelula = async (celula: Celula): Promise<Celula> => {
    const response = await api.post<Celula>('/celulas', celula);
    return response.data;
}

export const getCelulas = async (): Promise<Celula[]> => {
    const response = await api.get<Celula[]>('/celulas');
    return response.data;
}

export const getCelulasById = async (id: string): Promise<Celula> => {
    const response = await api.get<Celula>(`/celulas/${id}`);
    return response.data;
}

export const updateCelula = async (celula: Celula): Promise<Celula> => {
    const response = await api.put<Celula>(`/celulas/${celula.id}`, celula);
    return response.data;
}

export const deleteCelula = async (id: string | undefined): Promise<Celula> => {
    const response = await api.delete<Celula>(`/celulas/${id}`);
    return response.data;
}

export const createOrUpdateCelula = async (celula: Celula): Promise<Celula> => {
    if (!celula.id) {
        return await createCelula(celula);
    } else {
        return await updateCelula(celula);
    }
}