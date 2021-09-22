


export function addCacheItem(cacheItem) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_CACHE_ITEM',
            cacheItem
        })
    }
}