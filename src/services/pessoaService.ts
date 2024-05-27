import api from './api';

export interface Pessoa {
    id: string;
    nome: string;
    cargo: string;
    enderecoId?: {
        id?: string;
        numero?: string;
        rua?: string;
        bairro?: string;
        addressType?: string;
    };
    phones?: {
        id?: string;
        numero?: string;
        phoneType?: string;
    }[];
    emails?: {
        id?: string;
        email?: string;
        emailType?: string;
    }[];
    celulaId?: {
        id?: string;
        nome?: string;
        liderId?: {
            id?: string,
            pessoaId?: {
                id?: string,
                nome?: string
            }
        };
    };
}

export const createPessoa = async (pessoa: Pessoa): Promise<Pessoa> => {
    const response = await api.post<Pessoa>('/pessoas', pessoa);
    return response.data;
}

export const getPessoas = async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>('/pessoas');
    return response.data;
}

export const getPessoasById = async (id: string): Promise<Pessoa> => {
    const response = await api.get<Pessoa>(`/pessoas/${id}`);
    return response.data;
}

export const updatePessoa = async (pessoa: Pessoa): Promise<Pessoa> => {
    const response = await api.put<Pessoa>(`/pessoas/${pessoa.id}`, pessoa);
    return response.data;
}

export const deletePessoa = async (id: string | undefined): Promise<Pessoa> => {
    const response = await api.delete<Pessoa>(`/pessoas/${id}`);
    return response.data;
}

export const createOrUpdatePessoa = async (pessoa: Pessoa): Promise<Pessoa> => {
    if (!pessoa.id) {
        return await createPessoa(pessoa);
    } else {
        return await updatePessoa(pessoa);
    }
}