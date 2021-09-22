import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addCacheItem } from '../store/actions/cachedActions'

const useApi = (props) => {
    const dispatch = useDispatch()
    const cache = useSelector(rootReducer => rootReducer.cachedReducer.cache)

    const sendRequest = async (url) => {
        const requestInCache = cache.find((currReq) => currReq.url === url)
        if (requestInCache) return requestInCache.data

        try {
            const data = await fetch(url).then(a => a.json())
            dispatch(addCacheItem({
                url,
                data
            }))
            return data

        } catch (err) {
            console.log('err:', err)
            throw err
        }
    }

    return sendRequest
}

export default useApi