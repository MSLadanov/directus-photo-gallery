import { makeAutoObservable, runInAction } from "mobx";

interface Album {
    id: string;
    title: string;
    album_cover: string;
    description: string;
}

interface Photo {
    album_id: string;
    id: string;
    description: string;
    title: string;
    image: string;
}

class AlbumStore {
    albums: Album[] = [];
    currentAlbumId: string | null = null;
    isLoading: boolean = false;
    isError: string | null = null;
    photos: Photo[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    fetchStateAlbums = async () => {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.isError = null;
            });
            const response = await fetch(`/directus/items/albums`);
            const data = await response.json();
            runInAction(() => {
                this.albums = data.data;
            });
        } catch (error) {
            runInAction(() => {
                this.isError = 'Error fetching albums';
            });
            console.error('Error fetching albums', error);
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
        runInAction(() => {
            this.isLoading = true;
            this.isError = null;
        });
        try {
            const response = await fetch(`/directus/items/photos?filter[album_id][_eq]=${currentAlbumId}`);
            const data = await response.json();
            runInAction(() => {
                this.photos = data.data;
            });
        } catch (error) {
            runInAction(() => {
                this.isError = 'Error fetching photos';
            });
            console.error('Error fetching photos', error);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    setCurrentAlbumId = (id: string): void => {
        runInAction(() => {
            this.currentAlbumId = id;
        });
    };

    getCurrentAlbumId = () => {
        return this.currentAlbumId;
    };
}

const albumStore = new AlbumStore();
export default albumStore;
