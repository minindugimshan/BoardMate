import { Outlet } from "react-router-dom";
import Navigationbar from "../components/Navigationbar/Navigationbar";

export function UserLayout() {
    return (
        <div>
            <Navigationbar></Navigationbar>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}