import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import FilterListOffRoundedIcon from '@mui/icons-material/FilterListOffRounded';
import { Box, Button, FormControl, IconButton, InputBase, InputLabel, MenuItem, Select, TextField, Paper } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import { useDispatch } from 'react-redux';
import { displayResult, startSearch } from '../../features/searchSlice'
import useFetch from '../../hooks/useFetch';
import client from '../../client';
import { toast } from 'react-toastify';

const Search = () => {
    const categories = useFetch(`*[_type == 'category']{
        title,
        _id,
    }`, [])

    const [showFilterBox, setShowFilterBox] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [focus, setFocus] = useState(false)
    const [filters, setFilters] = useState({
        category: '',
        priceRange: {
            min: 0, max: 0
        }
    })

    const dispatch = useDispatch()

    const selectCategory = (e) => {
        setFilters({ ...filters, category: e.target.value })
    }

    const search = async (query) => {

        //         client.fetch(`*[_type == "property" && property_location._ref == "${_property_location._id}" && property_type._ref == "${_property_type._id}"  ${budgetFilter.min ? `&& price >= ${budgetFilter.min}` : ''} ${budgetFilter.max ? `&& price <= ${budgetFilter.max}` : ''}  ]{

        //           const productsArr = await client.fetch(`*[_type == 'product' && category._ref == '${categoryId}' ]{
        //     title,
        //     description,
        //     price,
        //     images,
        //     productId,
        //     category->{
        //       title,
        //     }
        //   }`)


        setShowFilterBox(false)
        dispatch(startSearch())
        try {
            const response = await client.fetch(query)
            dispatch(displayResult(response))
        }
        catch (error) {
            toast.error('Error occured..please search again')
            console.log(error)
        }
    }

    const handleSearch = () => {
        setShowFilterBox(false)
        if (filters.category || filters.priceRange.min || filters.priceRange.max) {
            search(`*[_type == 'product' ${filters.category ? `&& category._ref == '${filters.category}'` : ''} ${searchTerm ? `&& title match '${searchTerm}'` : ''} ${filters.priceRange.min ? `&& price >= ${filters.priceRange.min}` : ''} ${filters.priceRange.max ? `&& price <= ${filters.priceRange.max}` : ''} ]{
            title,
            description,
             price,
             images,
             productId,
             category->{
               title,
             }
           }`,)
        } else {
            search(`*[_type == 'product'  ${searchTerm ? `&& title match '${searchTerm}'` : ''} ]{
            title,
            description,
             price,
             images,
             productId,
             category->{
               title,
             }
           }`)
        }
    }

    const removeFilters = () => {
        setFilters({
            category: '',
            priceRange: {
                min: 0, max: 0
            }
        })
        search(`*[_type == 'product'  ${searchTerm ? `&& title match '${searchTerm}'` : ''} ]{
            title,
            description,
             price,
             images,
             productId,
             category->{
               title,
             }
           }`)
    }

    const searchRef = useRef()
    useEffect(() => {
        searchRef.current.focus()
        setFocus(true)
    }, [])


    return (
        <Box sx={{ position: 'relative', width: '90%', maxWidth: '768px', mx: 'auto', display: 'flex' }}>

            <Box sx={{ display: 'flex', borderRadius: 1, px: 1, backgroundColor: 'light.main', width: '100%', borderWidth: 2, borderStyle: 'solid', borderColor: focus ? 'secondary.main' : 'light.light' }} >
                <input ref={searchRef} required id="search" placeholder="Search for products..." type="search" style={{ flex: 1, px: 1, color: '00204A', border: 0, outline: 0, background: 'transparent' }} value={searchTerm} onChange={(e) => {
                    setSearchTerm(e.target.value)
                }} onBlur={() => setFocus(false)} autoFocus onClick={() => setFocus(true)} autoComplete={'off'} />
                <IconButton sx={{ width: 'max-content', height: 'max-content' }} onClick={() => { setShowFilterBox(!showFilterBox) }}>
                    {!showFilterBox ? <FilterListRoundedIcon /> : <FilterListOffRoundedIcon />}
                </IconButton>
            </Box>
            <Button variant='contained' onClick={handleSearch} disabled={!searchTerm} sx={{ ml: 1, '&:disabled': { color: 'dark.main', backgroundColor: '#305d7a', border: '1px solid darkblue' } }}>
                Search
            </Button>

            {
                showFilterBox
                &&
                <Paper sx={{ position: 'absolute', top: 50, backgroundColor: 'light.main', width: '100%', borderRadius: 1, p: 2 }} elevation={5}>

                    <FormControl sx={{ width: '50%', mx: 'auto', my: 2 }}>
                        <InputLabel id="select-category">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filters.category}
                            label={'category'}
                            onChange={selectCategory}
                            sx={{ textTransform: 'capitalize' }}
                        >
                            {
                                categories.loading ?
                                    <MenuItem value={'loading'}>Loading...</MenuItem>
                                    :
                                    categories.data ?
                                        categories.data.map((item) => (
                                            <MenuItem value={item._id} sx={{ textTransform: 'capitalize' }} key={item._id}>
                                                {item.title}
                                            </MenuItem>
                                        ))
                                        :
                                        null

                            }
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', my: 3 }}>

                        <TextField
                            id="outlined-number"
                            label="Min"
                            type="number"
                        />
                        <TextField
                            id="outlined-number"
                            label="Max"
                            type="number"
                            sx={{ ml: 2 }}
                        />

                    </Box>

                    <Button variant="contained" sx={{ display: 'flex', alignItems: 'center', mx: 'auto' }} onClick={handleSearch}>
                        Apply Filters <FilterAltRoundedIcon fontSize="small" sx={{ ml: 1 }} />
                    </Button>

                    {
                        (filters.category || filters.priceRange.min || filters.priceRange.max) ?
                            <Button variant="contained" color="danger" sx={{ display: 'flex', alignItems: 'center', mx: 'auto', color: 'light.main', mt: 1 }} onClick={removeFilters}>
                                Remove Filters <FilterAltOffRoundedIcon fontSize="small" sx={{ ml: 1 }} />
                            </Button>
                            :
                            ""
                    }

                </Paper>
            }
        </Box>
    )
}

export default Search