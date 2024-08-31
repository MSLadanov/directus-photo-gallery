import { makeAutoObservable } from "mobx";

interface Album {
    id: string,
    title: string,
    description: string,
    album_cover: string
}

interface Response<T> {
    data: T[];
  }

class AlbumStore {
    albums : Album[] = [];
    currentAlbumId : null | string= null;
    isLoading : boolean = false;
    error : string | null= null;

    constructor() {
        makeAutoObservable(this);
    }

    fetchAlbum = async () => {
        try {
            const response = await fetch('/directus/items/albums')
            const data : Response<Album> = await response.json()
            return data.data
        } catch (error) {
            console.error('Error fetching albums', error)
            return []
        }
    }

    setCurrentAlbum(id : string) {
        this.currentAlbumId = id;
    }
}

const albumStore = new AlbumStore();
export default albumStore;
