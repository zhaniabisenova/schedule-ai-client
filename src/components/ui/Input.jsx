import React from 'react'

export const Input = ({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    label = '',
    error = '',
    disabled = false,
    required = false,
    className = '',
    ...props
}) => {
    const inputClasses = `form-control ${error ? 'is-invalid' : ''} ${className}`.trim()

    return (
        <div className="mb-3">
            {label && (
                <label className="form-label">
                    {label}
                    {required && <span className="text-danger"> *</span>}
                </label>
            )}
            <input
                type={type}
                className={inputClasses}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
                {...props}
            />
            {error && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    )
}
