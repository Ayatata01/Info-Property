import axios from 'axios'
export const baseUrl ='https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
    const {data} = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '7f6645f1aemsh7093a292f9533a1p19b74ejsn20b4acdefdcd'
          }
    })

    return data;
}