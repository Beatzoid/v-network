import { createElement } from "react";
import { useParams } from "react-router-dom";

import NotFound from "../components/NotFound";
import { useAppSelector } from "../redux/types/global";

const generatePage = (pageName: string) => {
    const component = () => require(`../pages/${pageName}`).default;

    try {
        return createElement(component());
    } catch (err: any) {
        return <NotFound />;
    }
};

const PageRenderer = () => {
    const { page, id } = useParams<{ page: string; id?: string }>();
    const { auth } = useAppSelector((state) => state);

    let pageName = "";

    if (auth.token) {
        if (id) {
            pageName = `${page}/[id]`;
        } else {
            pageName = page;
        }
    }

    return generatePage(pageName);
};

export default PageRenderer;
