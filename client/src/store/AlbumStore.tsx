import { makeAutoObservable, runInAction } from "mobx";

interface Album {
    id: string;
    title: string;
    album_cover: string;
    description: string
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
    error: string | null = null;
    photos: Photo[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    // fetchStateAlbums = async (): Promise<void> => {
    //     this.isLoading = true;
    //     try {
    //         const response = await fetch('/directus/items/albums');
    //         const data = await response.json();
    //         runInAction(() => {
    //             this.albums = data.data || [];
    //             this.error = null;
    //         });
    //     } catch (error) {
    //         const err = error as Error;
    //         runInAction(() => {
    //             this.error = 'Error fetching albums';
    //         });
    //         console.error('Error fetching albums', err);
    //     } finally {
    //         runInAction(() => {
    //             this.isLoading = false;
    //         });
    //     }
    // };

    fetchStateAlbums = async () => {
        try {
          runInAction(() => {
            this.isLoading = true;
            this.error = '';
          });
          const response = await fetch(
            `/directus/items/albums`
          );
          const data = await response.json();
          runInAction(() => {
            this.albums = data.data;
          });
        } catch (error) {
          runInAction(() => {
            this.error = 'AlbumError';
          });
          console.error(error);
        }
        runInAction(() => {
          this.isLoading = false;
        });
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
    setCurrentAlbumId = (id: string): void => {
      runInAction(() => {
        this.currentAlbumId = id;
    });
    };
    getCurrentAlbumId = () => {
      return this.currentAlbumId
    }
}

const albumStore = new AlbumStore();
export default albumStore;