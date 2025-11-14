import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`rounded-lg transition-colors font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  )
}
