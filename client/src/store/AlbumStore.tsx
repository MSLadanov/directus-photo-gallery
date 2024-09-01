import { makeAutoObservable, runInAction } from "mobx";

interface Album {
    id: string;
    title: string;
    album_cover: string;
}

interface Photo {
    id: string;
    album_id: string;
    url: string;
}

class AlbumStore {
    albums: Album[] = [];
    currentAlbumId: string | null = null;
    isLoading: boolean = false;
    error: string | null = null;
    photos: Photo[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    fetchStateAlbums = async (): Promise<void> => {
        this.isLoading = true;
        try {
            const response = await fetch('/directus/items/albums');
            const data = await response.json();
            runInAction(() => {
                this.albums = data.data || [];
                this.error = null;
            });
        } catch (error) {
            const err = error as Error;
            runInAction(() => {
                this.error = 'Error fetching albums';
            });
            console.error('Error fetching albums', err);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    fetchStatePhotos = async (): Promise<void> => {
        const currentAlbumId = this.currentAlbumId;
        if (!currentAlbumId) {
            console.warn('Current album ID is null');
            return;
        }
        this.isLoading = true;
        try {
            const response = await fetch(`/directus/items/photos?filter[album_id][_eq]=${currentAlbumId}`);
            const data = await response.json();
            runInAction(() => {
                this.photos = data.data || [];
                this.error = null;
            });
        } catch (error) {
            const err = error as Error;
            runInAction(() => {
                this.error = 'Error fetching photos';
            });
            console.error('Error fetching photos', err);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    setCurrentAlbum = (id: string): void => {
        this.currentAlbumId = id;
    };
}

const albumStore = new AlbumStore();
export default albumStore;