import { useEffect } from "react"

export const usePageTitle = (title : string, appName:string = "MyApp") => {

    useEffect(() => {
        document.title = `${title} - ${appName}`;

    },[title, appName])

}