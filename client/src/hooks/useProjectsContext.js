import { ProjectsContext } from "../context/ProjectContext";
import { useContext } from "react";

export const useProjectsContext = () => {
    const context = useContext(ProjectsContext);
    if (!context) {
        throw new Error("useProjectsContext must be used within a ProjectContextProvider");
    }
    return context;
}