import { useEffect } from 'react'

function Toast({ message, type = 'success', onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 4000)

        return () => clearTimeout(timer)
    }, [onClose])

    const getToastEmoji = () => {
        switch (type) {
            case 'success':
                return '✅'
            case 'error':
                return '❌'
            case 'warning':
                return '⚠️'
            case 'info':
                return 'ℹ️'
            default:
                return '📢'
        }
    }

    return (
        <div className={`toast toast-${type}`}>
            <div className="toast-content">
                <span className="toast-emoji">{getToastEmoji()}</span>
                <span className="toast-message">{message}</span>
                <button
                    onClick={onClose}
                    className="toast-close"
                    aria-label="Close notification"
                >
                    ✖️
                </button>
            </div>
        </div>
    )
}

export default Toast 