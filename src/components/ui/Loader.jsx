import React from 'react'

export const Loader = ({ 
    size = 'md', 
    text = 'Загрузка...', 
    className = '',
    centered = false 
}) => {
    const sizeClasses = {
        sm: 'spinner-border-sm',
        md: '',
        lg: 'spinner-border-lg'
    }

    const spinnerClasses = `spinner-border text-primary ${sizeClasses[size]} ${className}`.trim()
    
    const containerClasses = centered ? 'd-flex justify-content-center align-items-center' : ''

    return (
        <div className={containerClasses}>
            <div className={spinnerClasses} role="status">
                <span className="visually-hidden">{text}</span>
            </div>
            {text && <span className="ms-2">{text}</span>}
        </div>
    )
}
