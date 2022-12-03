import React, {useCallback, useEffect} from 'react';
import AppHeader from "../Header/AppHeader";
import css from './App.module.css'
import {ForgotPass, Ingredients, Login, NotFound404, Profile, Register, ResetPass} from '../../pages';
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import { actions as mainActions } from "../../services/slices/main/actions";
import {useAppDispatch} from "../../services/hooks";
import {Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {Modal} from "../Modal/Modal";
import {IngredientDetails} from "../Modal/IngredientDetails/IngredientDetails";
import {ILocation} from "../../services/types";
import {getCookie} from "../../utils/cookie";
import { actions as formActions} from "../../services/slices/form/actions";
import { Feed } from '../../pages/Feed/Feed';
import { OrderDetailed } from '../OrderDetailed/OrderDetailed';

function App() {
    const dispatch = useAppDispatch();
    const location = useLocation<ILocation>();
    const history = useHistory();
    const background = location.state?.background;

    const token = getCookie('token');
    const storageToken = localStorage.getItem('refreshToken');

    const isOrderDetailed = useRouteMatch<{[id: string]: string} | null>([
        '/profile/orders/:id',
        '/feed/:id'
    ])?.params?.id;

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
        history.push('/');
    }, [dispatch])

    const closeOrderDetailed = useCallback(() => {
        history.goBack();
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
                            <Route path="/feed" component={Feed} exact />
                            <Route path="/feed/:id" exact>
                                <div className={css.detailed}>
                                    <OrderDetailed />
                                </div>
                            </Route>
                            <ProtectedRoute path="/profile">
                                <Profile />
                            </ProtectedRoute>
                            <ProtectedRoute path="/profile/orders/:id" exact>
                                <OrderDetailed />
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
                        {background && isOrderDetailed && (
                            <ProtectedRoute path='/profile/orders/:id' exact>
                                <Modal handleClose={closeOrderDetailed}>
                                    <OrderDetailed />
                                </Modal>
                            </ProtectedRoute>
                        )}
                        {background && isOrderDetailed && (
                            <Route path='/feed/:id' exact>
                                <Modal handleClose={closeOrderDetailed}>
                                    <OrderDetailed />
                                </Modal>
                            </Route>
                        )}
                    </div>
                </main>
            </div>
    );
}

export default App;
