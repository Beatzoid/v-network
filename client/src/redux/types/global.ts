import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export namespace GLOBALTYPES {
    export const AUTH = "AUTH";
    export const ALERT = "ALERT";
    export const THEME = "THEME";
    export const LOADING = "LOADING";

    export const GET_USER = "GET_USER";

    export const FOLLOW = "FOLLOW";
    export const UNFOLLOW = "UNFOLLOW";

    export const STATUS = "STATUS";
    export const CREATE_POST = "CREATE_POST";
}
