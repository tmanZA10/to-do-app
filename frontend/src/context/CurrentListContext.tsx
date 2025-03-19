import {createContext, ReactNode, useState} from "react";


type contextType = {
  listId: number,
  setListId: (id: number) => void,
  listName: string,
  setListName: (name: string) => void,
}

type propTypes = {
  children: ReactNode | ReactNode[]
}

export const CurrentListContext = createContext<contextType | undefined>(undefined)

function CurrentListProvider({ children }: propTypes) {
  const [listId, setListId] = useState(-1)
  const [listName, setListName] = useState("")
  return (
    <CurrentListContext.Provider value={
      {listId, setListId, listName, setListName}
    }>
      {children}
    </CurrentListContext.Provider>
  );
}

export default CurrentListProvider;

