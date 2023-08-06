export interface ResponseRepository {
    node: {
      databaseId: number;
      name: string;
      owner: {
        login: string;
        avatarUrl: string;
      };
      description: string;
      url: string;
      createdAt: string;
    };
  }

  export interface Repository {
    id: number;
    name: string;
    rating: number;
  }