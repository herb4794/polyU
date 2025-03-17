import React, { createContext } from 'react'

type ContextType = {
  myself: string
  education: string
}

export const ContextObj = createContext<ContextType>({
  myself: "",
  education: ""
})

 const ContextProvider: React.FC<{ children: any }> = (props: any) => {

  const contextValue : ContextType = {
    myself: "",
    education: ""
  }
  return <ContextObj.Provider value={contextValue}>{props.children}</ContextObj.Provider>
}

export default ContextProvider
