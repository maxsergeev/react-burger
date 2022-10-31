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
    const dispatch = useAppDispatch();
    const user = useAppSelector(store => store.form.getUser.data);
    const token = getCookie('token');
    const refreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        if (!token && refreshToken) {
            dispatch(actions.refreshToken.post())
                .then(() => dispatch(actions.getUser.post()));
        }
        if (token && refreshToken) {
            dispatch(actions.getUser.post());
        }
    }, [dispatch, refreshToken, token]);

    return (
        <Route
            path={path}
            exact={exact ? exact : false}
            render={({location}) => (
                user.success ?
                    children :
                    <Redirect to={{pathname: '/login', state: { from: location }}} />
            )
            }
        />
    );
} 