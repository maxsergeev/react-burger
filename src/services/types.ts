export interface ILocation {
    background: {
        pathname: string;
        search: string;
        hash: string;
        state: null;
        key: string;
    }
    from: string;
    state?: object;
};