import css from './Profile.module.css'
import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink, Route, Switch, useHistory, useLocation, useRouteMatch} from 'react-router-dom';
import {useAppDispatch} from "../../services/hooks";
import actions from "../../services/slices/form/actions";
import ordersActions from "../../services/slices/orders/actions";
import {IUpdateUser} from "../../services/slices/form/types";
import { ILocation } from '../../services/types';
import { FeedList } from '../../components/FeedList/FeedList';
import {OrderDetailed} from "../../components/OrderDetailed/OrderDetailed";
import {getCookie} from "../../utils/cookie";

export const Profile = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation<ILocation>();
    const background = location.state?.background;
    const token = getCookie('token');
    const matchProfileOrders = !!useRouteMatch({ path: '/profile/orders', exact: true });
    const matchProfile = !!useRouteMatch({ path: '/profile', exact: true });

    const [shouldRenderSidebar] = useState(matchProfile || matchProfileOrders);
    const [initialState, setInitialState] = useState<IUpdateUser>({
        name: "",
        email: "",
        password: "",
    })
    const [form, setForm] = useState<IUpdateUser>(initialState);
    const [hasChanged, setChanged] = useState<boolean>(false);

    useEffect(() => {
        dispatch(actions.getUser.post()).then((res) => {
            setForm({ ...form, name: res.payload.user.name, email: res.payload.user.email });
            setInitialState({ ...initialState, name: res.payload.user.name, email: res.payload.user.email })
        });
        dispatch(ordersActions.orders.wsInit(`?token=${token}`))
        return () => {
            dispatch(ordersActions.orders.wsConnectionClosed())
        }
    }, [dispatch, token])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name] : e.target.value});
    }
    useEffect(() => {
        if(initialState.name !== form.name ||
            initialState.email !== form.email ||
            initialState.password !== form.password
        ){
            setChanged(true);
        }else{
            setChanged(false);
        }
    }, [form])


    const handleLogout = () => {
        dispatch(actions.getUser.resetUser());
        dispatch(actions.logout.post())
            .then(() => {
                history.replace("/login");
            })
    }

    const handleSave = (form: IUpdateUser) => {
        dispatch(actions.updateUser.post(form)).then(() => {
            alert('Ваши космо-данные успешно изменены!');
            setInitialState(form);
            setChanged(false);
        });
    }

    const handleCancel = () => {
        setForm({...form, email: initialState.email, name: initialState.name, password: ""});
        setChanged(false);
    }

    return (
        <div className={css.container}>
            {shouldRenderSidebar &&
            <div className={css.sidebarMenu}>
                <div className={css.menu}>
                    <NavLink
                        to="/profile"
                        exact
                        activeClassName={css.activeLink}
                        className="text text_type_main-medium pt-4 pb-4"
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        to="/profile/orders"
                        exact
                        activeClassName={css.activeLink}
                        className="text text_type_main-medium pt-4 pb-4"
                    >
                        История заказов
                    </NavLink>
                    <NavLink
                        to="/login"
                        className="text text_type_main-medium pt-4 pb-4"
                        style={{cursor: "pointer", color: "#8585AD"}}
                        onClick={handleLogout}
                    >
                        Выход
                    </NavLink>
                </div>
                <div className={`${css.description}`}>
                    <p className="text text_type_main-default">
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
            </div>
            }
            <Switch location={background || location}>
                <Route path="/profile/orders/" exact>
                    <div className={css.feed_list}>
                        <FeedList style={{ flex: 1 }} />
                    </div>
                </Route>
                <Route path="/profile/orders/:id" exact>
                    <div className={css.detailed}>
                        <OrderDetailed />
                    </div>
                </Route>
                <Route exact path="/profile">
                    <div className={css.userInfo}>
                        <Input
                            onChange={(e) => onChange(e)}
                            value={form.name}
                            name="name"
                            placeholder="Имя"
                        />
                        <Input
                            onChange={(e) => onChange(e)}
                            value={form.email}
                            name="email"
                            placeholder="Логин"
                        />
                        <Input
                            onChange={(e) => onChange(e)}
                            value={form.password}
                            name="password"
                            placeholder="Пароль"
                            type="password"
                            autoComplete="off"
                        />
                        { hasChanged &&
                            <>
                                <Button htmlType="button" size="medium" onClick={() => handleSave(form)}>Сохранить</Button>
                                <Button htmlType="button" size="medium" onClick={() => handleCancel()}>Отменить</Button>
                            </>
                        }
                    </div>
                </Route>
            </Switch>

        </div>
    )
}