import React, {createContext, FunctionComponent, useContext} from "react";
// import driveService, {dbDocument} from "../services/driveService";

const DriveContext = createContext({
    getDocs: () => console.log('fail')
});

export function useDrive() {
    return useContext(DriveContext);
}

export const DriveProvider: FunctionComponent = ({children}) => {

    // function getDocs(doc: dbDocument) {
    //     return driveService.getDocs(doc)
    // }

    const value = {
        getDocs: () => console.log('hello world')
    };

    return (<DriveContext.Provider value={value}>
        {children}
    </DriveContext.Provider>)
}

export function withDrive(Component: FunctionComponent) {
    return function WithDrive(props: any) {
        return (<DriveProvider>
            <Component {...props}/>
        </DriveProvider>)
    }
}