import api from './AxiosConfig';

class APIService {
    getAllPokemons() {
        return api.get(`/pokemon?limit=1000000`);
    }
    getPokemons(limit) {
        return api.get(`/pokemon?limit=${limit}`);
    }
    getPokemonDetail(name) {
        return api.get(`/pokemon/${name}`);
    }
    getPokemonSpecies(name) {
        return api.get(`/pokemon-species/${name}`);
    }
    getPokemonEvolutions(name) {
        return api.get(`/evolution-chain/${name}`);
    }
    
    
}

export default new APIService();