import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export namespace GLOBALTYPES {
    export const AUTH = "AUTH";
    export const ALERT = "ALERT";
}
