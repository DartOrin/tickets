export interface IFilters {
  declination: string[],
  options: number[],
  checkedList: number[],
  setCheckedList: (list:number[]) => void
}