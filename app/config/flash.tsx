import { showMessage } from "react-native-flash-message"

type StatusType = "success" | "error" | "warning"

/**
 * Flash messages
 * @param type "success": green, "error": red, "warning": yellow
 * @param message message to show in flash
 */
export const flash = (type: StatusType, message: string) => {
  showMessage({
    message,
    duration: 3000,
    type: type === "error" ? "danger" : type,
  })
}

export default flash
