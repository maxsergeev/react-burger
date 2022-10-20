import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import {IAppDispatch, IRootState } from "./store"
import {PayloadAction} from "@reduxjs/toolkit";
import {IDataItem} from "../utils/interfaces";

export const useAppDispatch = () => useDispatch<IAppDispatch>()
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;