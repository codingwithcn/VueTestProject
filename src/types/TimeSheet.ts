export default interface TimeSheet {
    id: string | null ;
    startTimestamp: number | null ;
    endTimestamp: number | null ;
    duration: number | null ;
    dateCreatedTimestamp: number | null ;
    dateModifiedTimestamp: number | null ;
    finished: boolean | null;
}
