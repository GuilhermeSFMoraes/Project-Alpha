import { ComponentProps } from "react";

interface INavLinkProps extends ComponentProps<'a'> {
    children: string
}

export const NavLink = (props:INavLinkProps) => {
    return (
        <a {...props} className="font-medium text-sm">{props.children}</a>
    );
}