import { makeAutoObservable, runInAction } from "mobx";

interface Album {
    id: string,
    title: string,
    description: string,
    album_cover: string
}

interface Response<T> {
    data: T[];
  }

interface Photo {
    album_id: string;
    id: string;
    description: string;
    title: string;
    image: string;
}

class AlbumStore {
    albums : Album[] = [];
    currentAlbumId : null | string= null;
    isLoading : boolean = false;
    error : string | null= null;
    photos : Photo [] = []

    constructor() {
        makeAutoObservable(this);
    }

    fetchAlbum = async () => {
        try {
            const response = await fetch('/directus/items/albums')
            const data : Response<Album> = await response.json()
            runInAction(() => {
                this.albums = data.data;
              });
        } catch (error) {
            console.error('Error fetching albums', error)
            return []
        }
    }

    fetchPhotos = async () => {
        try {
            const response = await fetch(`/directus/items/photos?filter[album_id][_eq]=${this.currentAlbumId}`)
            const data = await response.json()
            runInAction(() => {
                this.photos = data.data
            })
        } catch (error) {
            console.error('Error fetching photos', error)
            return []
        }
    }

    setCurrentAlbum(id : string) {
        this.currentAlbumId = id;
    }
}

const albumStore = new AlbumStore();
export default albumStore;
