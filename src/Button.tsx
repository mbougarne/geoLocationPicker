import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded" {...props}>
      {label}
    </button>
  );
};

export default Button;
