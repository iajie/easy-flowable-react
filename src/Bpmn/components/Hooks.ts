/**
 * @Date: 2024-10-2 14:22:15
 * @Description: 侧边属性栏
 * @Author: MoJie
 */
import { MutableRefObject, useEffect, useRef } from "react";

/**
 * 绑定保存hook
 * @param func
 */
export function useSaveHotKeyFunction(func: () => void) {
    const commandKeyDown: MutableRefObject<boolean> = useRef(false);
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                commandKeyDown.current = true;
            }
            if (commandKeyDown.current && e.key == 's') {
                commandKeyDown.current = false;
                e.preventDefault();
                func();
                return false;
            }
        }
        // ctrl+s监听
        document.addEventListener("keydown", onKeyDown);

        const onKeyUp = (e: any) => {
            commandKeyDown.current = false;
        }

        document.addEventListener("keyup", onKeyUp);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
        }
    }, []);
}
