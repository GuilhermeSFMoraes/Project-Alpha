import icon from "../../asset/icon.svg"
import { NavLink } from "../Nav-link/Nav-link"

export const Header = () => {
    return (
        <div className="flex items-center gap-5 py-2">
            <img src={icon} alt="" />
            <nav className="flex items-center gap-5">
                <NavLink  href="/eventos">Eventos</NavLink>
                <NavLink href="/participantes">Participantes</NavLink>
            </nav>
        </div>
    )
}