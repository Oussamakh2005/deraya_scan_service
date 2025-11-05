import { Next, Context } from "hono";
import { USER_SERVICE_END_POINT } from "../config/env";

const authenticated = async (c: Context, next: Next) => {
    const token = c.req.header("Authorization");
    if (!token) {
        return c.json({
            msg: "not authorized"
        }, 401);
    }
    try {
        const response = await fetch(`${USER_SERVICE_END_POINT}/api/user/authenticated`, {
            method: "GET",
            headers: {
                "Authorization": token,
            }
        });
        if (!response.ok) {
            return c.json({
                msg: "invalid token",
            }, 401);
        } else {
            const data = await response.json();
            c.set("jwtPayload", {
                id: data.data.id,
                role: data.data.role,
                institution_id: data.data.institution_id,
            });
            await next();
        }
    } catch(error) {
        console.error(error)
        return c.json({
            msg: "internal server error",
        }, 500);
    }
}

export default authenticated;