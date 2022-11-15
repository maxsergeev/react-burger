import {Redirect, Route, RouteProps, useLocation} from 'react-router-dom';
import {ReactNode, FC} from "react";
import {getCookie} from "../../utils/cookie";

export const ProtectedRoute:FC<RouteProps & {children?: ReactNode}> = ({ children, path, exact }) => {
    const token = getCookie('token');
    const location = useLocation();

    return (
        <Route
            path={path}
            exact={exact || false}
            render={() => (
                token ?
                    children :
                    <Redirect to={{pathname: '/login', state: { from: location }}} />
            )
            }
        />
    );
} 