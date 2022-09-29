import React, {ReactNode} from "react";
import css from './HeaderMenuItem.module.css'

interface IAppHeaderProps {
    menuItemName: string;
    icon: ReactNode;
    active?: boolean;
}

class HeaderMenuItem extends React.Component<IAppHeaderProps> {
    constructor(props: IAppHeaderProps) {
        super(props);
    }
    render (){
        let isActive = !this.props.active && 'text_color_inactive';
        return (
            <div className={`${css.menu_item} pl-5 pr-5 pt-4 pb-4`}>
                <div className={`text text_type_main-default ${css.icon}`}>{this.props.icon}</div>
                <div className={`text text_type_main-default ${isActive}`}>{this.props.menuItemName}</div>
            </div>
        );
    }
}

export default HeaderMenuItem;