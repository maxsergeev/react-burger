import React, {useCallback, useEffect} from 'react';
import AppHeader from "./components/Header/AppHeader";
import css from './App.module.css'
import {ForgotPass, Ingredients, Login, NotFound404, Profile, Register, ResetPass} from './pages';
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute";
import { actions as mainActions } from "./services/slices/main/actions";
import {useAppDispatch, useAppSelector} from "./services/hooks";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {Modal} from "./components/Modal/Modal";
import {IngredientDetails} from "./components/Modal/IngredientDetails/IngredientDetails";
import {ILocation} from "./services/types";
import {getCookie} from "./utils/cookie";
import { actions as formActions} from "./services/slices/form/actions";

function App() {
    const dispatch = useAppDispatch();
    const location = useLocation<ILocation>();
    const history = useHistory();
    const background = location.state?.background;

    const user = useAppSelector(store => store.form.getUser.data);
    const token = getCookie('token');
    const storageToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        dispatch(mainActions.ingredients.get());
    }, [])

    useEffect(() => {
        if (!token && storageToken) {
            dispatch(formActions.refreshToken.post())
                .then(() => dispatch(formActions.getUser.post()));
        }
        if (token && storageToken) {
            dispatch(formActions.getUser.post());
        }
    }, [dispatch, storageToken, token]);

    const closeIngredientsModal = useCallback(() => {
        dispatch(mainActions.modals.closeIngredientModal());
        history.push('/');
    }, [dispatch])

    return (
            <div className={css.app}>
                <AppHeader />
                <main className={`${css.content}`}>
                    <div className={`${css.content_container} pl-5 pr-5 pb-10`}>
                        <Switch location={background || location}>
                            <Route path="/" exact>
                                <Ingredients />
                            </Route>
                            <Route path="/login" component={Login} exact />
                            <Route path="/register" component={Register} exact/>
                            <Route path="/forgot-password" component={ForgotPass} exact />
                            <Route path="/reset-password" component={ResetPass} exact />
                            <Route path="/ingredients/:id" exact>
                                <IngredientDetails/>
                            </Route>
                            <ProtectedRoute path="/profile">
                                <Profile />
                            </ProtectedRoute>
                            <Route component={NotFound404} />
                        </Switch>
                        {background && (
                            <Route path='/ingredients/:id' exact>
                                <Modal title='Детали ингредиента' handleClose={closeIngredientsModal}>
                                    <IngredientDetails />
                                </Modal>
                            </Route>
                        )}
                    </div>
                </main>
            </div>
    );
}

export default App;
