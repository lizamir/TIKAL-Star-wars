const INITIAL_STATE = {
    cache: [],
}

export function cachedReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CACHE':
            return {
                ...state,
                cache: action.cache,
            }
        case 'ADD_CACHE_ITEM':
            return {
                ...state,
                cache: [...state.cache, action.cacheItem],
            }
        case 'REMOVE_CACHE_ITEM':
            return {
                ...state,
                cache: state.cache.filter(({ _id }) => _id !== action.cacheItem),
            }
        case 'UPDATE_CACHE_ITEM':
            return {
                ...state,
                myScans: state.cache.map((cache) =>
                    cache._id === action.cache._id ? action.scan : cache
                ),
            }

        default:
            return state
    }
}