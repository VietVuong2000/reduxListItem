export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }
  
  export interface Row {
    id: number;
    title: string;
    originalTitle: string;
    thumbnailUrl: string;
    isEdit: boolean;
    isChanged: boolean;
    isEven: boolean;
  }
  
  export interface RootState {
    rows: Row[];
  }