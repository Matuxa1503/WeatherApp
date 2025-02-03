import s from './Button.module.scss';

export const Button = ({ children, classBtn, handleDisabled = null, handleClick = null }) => {
  return (
    <button className={`${s.btn} ${classBtn}`} disabled={handleDisabled} onClick={handleClick}>
      {children}
    </button>
  );
};
