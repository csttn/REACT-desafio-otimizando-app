import {
  Collection,
  CollectionCellRenderer,
  CollectionCellSizeAndPositionGetter,
} from 'react-virtualized';
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
  const collectionCellRender: CollectionCellRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style} className='movies-list'>
        <MovieCard
          poster={movies[index].Poster}
          rating={movies[index].Ratings[0].Value}
          runtime={movies[index].Runtime}
          title={movies[index].Title}
          key={key}
        />
      </div>
    );
  };

  const sizeAndpositionGetter: CollectionCellSizeAndPositionGetter = ({ index }) => ({
    width: 400,
    height: 200,
    x: (index % 4) * 300,
    y: Math.floor(index / 4) * 100,
  });

  return (
    <div className='container'>
      <header>
        <span className='category'>
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      {/* virtualização */}
      <main>
        <Collection
          height={400}
          width={800}
          cellCount={movies.length}
          cellRenderer={collectionCellRender}
          cellSizeAndPositionGetter={sizeAndpositionGetter}
          horizontalOverscanSize={2}
        />
      </main>
    </div>
  );
}
