import cn from 'classnames';
import { Spinner } from '.';

const Button = ({ children, className, loading, disabled, ...rest }) => {
  const buttonClasses = cn(
    'flex justify-center bg-black text-white px-3 py-2 rounded transition-all hover:opacity-70',
    {
      'opacity-50 cursor-default hover:opacity-50': disabled,
    },
    className
  );

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...rest}>
      {loading && <Spinner />}
      {children}
    </button>
  );
};

export default Button;
