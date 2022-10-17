import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { ButtonProps, ButtonStyle } from './prop-types';

const Button = ({ link, buttonType = 'button', className = [], title, loading = false, icon, onClick, ...rest }: ButtonProps) => {
  if (loading || icon) {
    className.push(ButtonStyle.Icons);

    if (loading) {
      className.push(ButtonStyle.Loading);
    }
  }

  if (link) {
    return (
      <Link to={link} className={`button ${className.join(' ')}`} {...rest}>
        {
        (loading || icon) &&
        <div className="button__icon-container">
          {
            loading && (
              <div className="loader--ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )
          }
          {
            icon && (
              <FontAwesomeIcon className='button__icon' icon={icon}/>
            )
          }
        </div>
      }

      {!loading && <span className="button__text">{title}</span>}
      </Link>
    );
  }

  return (
    <button className={`button ${className.join(' ')}`} type={buttonType} onClick={onClick} {...rest}>
      {
        (loading || icon) &&
        <div className="button__icon-container">
          {
            loading && (
              <div className="loader--ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )
          }
          {
            icon && (
              <FontAwesomeIcon className='button__icon' icon={icon}/>
            )
          }
        </div>
      }

      {!loading && <span className="button__text">{title}</span>}

    </button>
  );
};

export default Button;
