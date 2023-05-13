import api from './api';

export interface Projeto {
    id?: number;
    link: string;
    image: string;
    title: string;
    description?: string;
}

export const createProjeto = async (projeto: Projeto): Promise<Projeto> => {
    const response = await api.post<Projeto>("/portfolio", projeto);
    return response.data;
}

export const getPortfolio = async (): Promise<Projeto[]> => {
    const response = await api.get<Projeto[]>("/portfolio");
    return response.data;
}

export const deleteProjeto = async (id: number | undefined): Promise<Projeto> => {
    const response = await api.delete<Projeto>(`/portfolio/${id}`);
    return response.data;
}

export const updateProjeto = async (projeto: Projeto): Promise<Projeto> => {
    const response = await api.put<Projeto>(`/portfolio/${projeto.id}`, projeto);
    return response.data;
}

export const getProjeto = async (id: number): Promise<Projeto> => {
    const response = await api.get<Projeto>(`/portfolio/${id}`);
    return response.data;
}

export const createOrUpdateProjeto = async (projeto: Projeto): Promise<Projeto> => {
    if (!projeto.id) {
        return await createProjeto(projeto);
    } else {
        return await updateProjeto(projeto);
    }
}