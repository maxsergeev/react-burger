import {Redirect, Route, useHistory, useLocation} from 'react-router-dom';
import {ReactNode, useEffect, useState} from "react";
import {dispatch} from "../../services/store";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import actions from '../../services/slices/form/actions';
import {getCookie} from "../../utils/cookie";
import {ILocation} from "../../services/types";

interface IProtectedRoute {
    children: ReactNode,
    path: string,
    exact?: boolean,
}

export function ProtectedRoute({ children, path, exact }:IProtectedRoute) {
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