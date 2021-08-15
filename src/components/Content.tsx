import { Grid, GridCellRenderer } from 'react-virtualized';
import { MovieCard } from './MovieCard';

interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

export function Content({ selectedGenre, movies }: ContentProps) {
  const cellRenderer: GridCellRenderer = ({ columnIndex, key, style }) => {
    return (
      <div key={key} style={style} className='movie-list'>
        <MovieCard
          title={movies[columnIndex].Title}
          poster={movies[columnIndex].Poster}
          runtime={movies[columnIndex].Runtime}
          rating={movies[columnIndex].Ratings[0].Value}
        />
      </div>
    );
  };

  return (
    <div className='container'>
      <header>
        <span className='category'>
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      {/* virtualização */}
      <main>
        <div className='movies-list'>
          <Grid
            autoHeight
            autoWidth
            overscanRowCount={3}
            rowCount={movies.length}
            cellRenderer={cellRenderer}
          />
        </div>
      </main>
    </div>
  );
}
