import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * 自定义Logo组件
 * 基于用户提供的图标设计，用于替换原有的Github图标
 */
export function Logo({ size = 'md', className = '' }: LogoProps) {
  // 根据size设置不同的尺寸
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={`${sizeClasses[size]} ${className}`}
    >
      {/* 基于用户提供的图标设计的自定义Logo */}
      {/* 这是一个抽象的AI导航图标，结合了导航和AI的元素 */}
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      {/* 导航箭头元素 */}
      <path d="M11 9h2v2h-2zm0 4h2v2h-2z" />
      {/* AI相关的抽象元素 */}
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Logo容器组件
 * 包含Logo和背景，用于header和footer
 */
export function LogoContainer({
  size = 'md',
  className = ''
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  // 根据size设置不同的尺寸
  const containerClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl'
  };

  return (
    <div 
      className={`
        ${containerClasses[size]} 
        bg-primary text-white 
        flex items-center justify-center 
        shadow-lg shadow-primary/20 
        ${className}
      `}
    >
      <Logo size={size} />
    </div>
  );
}
