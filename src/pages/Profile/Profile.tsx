import css from './Profile.module.css'
import {SyntheticEvent, useEffect, useState} from "react";
import {Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink, useHistory} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import actions from "../../services/slices/form/actions";
import {IUpdateUser} from "../../services/slices/form/types";

export const Profile = () => {
    const [form, setForm] = useState<IUpdateUser>({
        name: "",
        email: "",
        password: "",
    })
    const { name, email } = useAppSelector( store => store.form.getUser.data.user);
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(actions.getUser.post());
        setForm({ name: name, email: email, password: ""});
    }, [dispatch])

    const onChange = (e: any) => {
        setForm({...form, [e.target.name] : e.target.value});
    }

    const handleLogout = () => {
        dispatch(actions.getUser.resetUser());
        dispatch(actions.logout.post())
            .then(() => {
                history.replace("/login");
            })
    }

    const handleSave = (form: IUpdateUser) => {
        dispatch(actions.updateUser.post(form))
    }

    const handleCancel = () => {
        setForm({...form, email: email, name: name})
    }

    return (
        <div className={css.container}>
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
                        to={"/login"}
                        className="text text_type_main-medium pt-4 pb-4"
                        style={{ cursor: "pointer", color: "#8585AD" }}
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
            <div className={css.userInfo}>
                <Input
                    onChange={onChange}
                    value={form.name}
                    name={'name'}
                    placeholder="Имя"
                />
                <Input
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    placeholder="Логин"
                />
                <Input
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                    placeholder="Пароль"
                    type="password"
                />
                <Button htmlType="button" size="medium" onClick={() => handleSave(form)}>Сохранить</Button>
                <Button htmlType="button" size="medium" onClick={() => handleCancel()}>Отменить</Button>
            </div>
        </div>
    )
}