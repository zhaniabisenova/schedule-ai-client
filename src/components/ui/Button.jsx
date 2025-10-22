import React from 'react'
import './Button.css'

export const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    onClick, 
    disabled = false, 
    className = '',
    type = 'button',
    ...props 
}) => {
    const baseClasses = 'modern-btn'
    const variantClasses = {
        primary: 'modern-btn-primary',
        secondary: 'modern-btn-secondary',
        success: 'modern-btn-success',
        danger: 'modern-btn-danger',
        warning: 'modern-btn-warning',
        info: 'modern-btn-info',
        light: 'modern-btn-light',
        dark: 'modern-btn-dark',
        outline: 'modern-btn-outline',
        link: 'btn btn-link'
    }
    const sizeClasses = {
        sm: 'modern-btn-sm',
        md: 'modern-btn-md',
        lg: 'modern-btn-lg'
    }

    // Для link варианта используем стандартный bootstrap класс
    if (variant === 'link') {
        return (
            <button
                type={type}
                className={`btn btn-link ${className}`}
                onClick={onClick}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        )
    }

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}
