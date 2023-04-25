import api from './api';

export interface Portfolio {
    id: number;
    link: string;
    image: string;
    title: string;
}

export const createPortfolio = async (portfolio: Portfolio) => {
    const response = await api.post('/itensPortfolio', portfolio);
    return response.data;
}

export const getItensPortfolio = async () => {
    const response = await api.get('/itensPortfolio');
    return response.data;
}

export const getPortfolioById = async (id: number) => {
    const response = await api.get(`/itensPortfolio/${id}`);
    return response.data;
}

export const updatePortfolio = async (portfolio: Portfolio) => {
    const response = await api.put(`/itensPortfolio/${portfolio.id}`, portfolio);
    return response.data;
}

export const deletePortfolio = async (id: number) => {
    const response = await api.delete(`/itensPortfolio/${id}`);
    return response.data;
}

export const createOrUpdatePortfolio = async (portfolio: Portfolio) => {
    if (portfolio.id === 0) {
        return await createPortfolio(portfolio);
    } else {
        return await updatePortfolio(portfolio);
    }
}