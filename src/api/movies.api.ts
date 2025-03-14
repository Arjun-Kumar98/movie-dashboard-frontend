export interface Movie{
    id:number;
    title:string;
    publishYear:number;
    posterUrl:string;
}
    export const getAllMovies = async(userId:number,page:number=1)=>{
        try{
            const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/api/movies/list?userId=${userId}&page=${page}&limit=8`,
                {
                    method:'GET',
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            const result = await response.json();
            return{
                success:response.ok,
                data:result.movies||[],
                totalPages:result.totalPages||1,
            };
        }catch(error){
            console.error('Failed to fetch movies:',error);
            return{success:false,data:[],totalPages:1};
        }
    
    };

    // src/api/movies.api.ts

export const addMovie = async (
    data: { title: string; publishYear: number; posterFile: File },
    userId: string,
    token: string
  ) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('publishYear', String(data.publishYear));
      formData.append('userId', userId);
      formData.append('image', data.posterFile); // Backend expects this key as 'image'
  
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/movies/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const result = await response.json();
  
      return { success: response.ok, ...result };
    } catch (error) {
      console.error('Create movie error:', error);
      return { success: false, error: 'Failed to create movie.' };
    }
  };

  // src/api/movies.api.ts

export const updateMovie = async (
    movieId: number,
    data: { title: string; publishYear: number; posterFile: File | null },
    userId: string,
    token: string
  ) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('publishYear', String(data.publishYear));
      formData.append('userId', userId);
      formData.append('movieId', String(movieId));
      if (data.posterFile) {
        formData.append('image', data.posterFile);
      }
  
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/movies/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const result = await response.json();
      return { success: response.ok, ...result };
    } catch (error) {
      console.error('Update movie error:', error);
      return { success: false, error: 'Failed to update movie.' };
    }
  };
  
  export const getMovieById = async (
    movieId: string,
    token: string
  ) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/movies/${movieId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const result = await response.json();
  
      return {
        success: response.ok,
        data: result.movie || null,
      };
    } catch (error) {
      console.error('Fetch movie by ID error:', error);
      return {
        success: false,
        data: null,
        error: 'Failed to fetch movie details.',
      };
    }
  };
  