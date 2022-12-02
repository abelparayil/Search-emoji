import React, {useState, useEffect} from 'react';
import Loader from './Loader';

const Emojis = () => {
    const [allEmojis, setAllEmojis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    const fetchEmojis = async () => {
        const res = await fetch(
            `https://emoji-api.com/emojis?search=${query}&access_key=0409d0f744e12c2abae28666b941648c4cbc648b`
        );
        const data = await res.json();
        setAllEmojis(data);
        setLoading(false);

    }
    useEffect(() => {
        fetchEmojis();
    }, [query]);

    return (
        <div className='emojis'>
            <div className='search'>
                <input 
                    placeholder='Type in keyword to search emoji' 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
            </div>

            <div className="grid-emojis">
                {loading === true ? (
                    <loader />
                ) : (
                    allEmojis?.slice(0,9).map((emoji) => (
                        <div className='item' key={emoji.title}>
                            <span>{emoji.character}</span>
                        </div>
                    ))
                )}
                {allEmojis === null && <h1 className='Error'>Sorry! no emoji found. Try another keyword.</h1>}
            </div>
        </div>
    )
}

export default Emojis;