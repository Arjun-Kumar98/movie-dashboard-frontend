import React,{useEffect,useState} from "react";
import {getAllMovies,Movie} from '../../api/movies.api';
import MovieCard from "../../components/MovieCard/MovieCard";
import {t} from '../../i18n';
import { useNavigate } from "react-router-dom";

const MovieList: React.FC=()=>{
    const[movies,setMovies]  = useState<Movie[]>([]);
    const[page,setPage] = useState(1);
    const[totalPages,setTotalPages] = useState(1);
    const navigate = useNavigate();

    const storedUserId = localStorage.getItem('userId');
    const userId = storedUserId ? Number(storedUserId):null;

    useEffect(()=>{
        if(!userId){
            navigate('/login');
            return;
        }

        const fetchMovies = async()=>{
            const result = await getAllMovies(userId,page);
            if(result.success){
                setMovies(result.data);
                setTotalPages(result.totalPages);
            }
        };
        fetchMovies();
    },[page,userId,navigate]);

    return(
        <div className="movie-list-wrapper">
            <h2>{t('movies.title')}</h2>
            
            {movies.length===0?(
                <p>{t('movies.emptyList')}</p>
            ):(
                <div className="movie-grid">
                    {movies.map((movie)=>(
                      <MovieCard
                      key={movie.id}
                      movie={movie}
                      onClick={()=>navigate(`/movies/edit/${movie.id}`)}
                    />
            ))}
        </div>
    )}
   <div className="pagination-controls">
    <button disabled={page===1} onClick={()=>setPage((p)=>p-1)}>
    {t('pagination.prev')}
    </button>
    <span>Page {page} of {totalPages}</span>
    <button disabled={page === totalPages} onClick={()=>setPage((p)=>p+1)}>
        {t('pagination.next')}
    </button>
   </div>

   <button onClick={()=>navigate('/movies/add')}>{t('movies.add')}</button>
   </div>
    );
};