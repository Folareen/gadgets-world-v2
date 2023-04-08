import { useState, useEffect } from "react";
import client from '../client'

const useFetch = (query, dependencies) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setError('')
        console.log(query)
        setLoading(true)
        client.fetch(query).then((data) => {
            setData(data)
        }).catch((err) => {
            console.log(err, 'errrr')
            setError(err?.message || err)
        }).finally(
            () => setLoading(false)
        )
    }, [...dependencies]);

    return {
        data,
        loading,
        error,
    };
};

export default useFetch;