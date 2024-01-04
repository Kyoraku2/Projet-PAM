import {forwardRef, useContext, useImperativeHandle, useState} from "react";
import {IoClose, IoWarning} from "react-icons/io5";
import {FaCheck, FaInfoCircle} from "react-icons/fa";
import {MdError} from "react-icons/md";
import AlertContext from "./AlertContext";
import './alert.scss';

export const ALERT_TYPES = {
  SUCCESS: {
    type: 'success',
    default: 'Succès',
    icon: <FaCheck />
  },
  ERROR: {
    type: 'error',
    default: 'Erreur',
    icon: <MdError />
  },
  INFO: {
    type: 'info',
    default: 'Information',
    icon: <FaInfoCircle />
  },
  WARNING: {
    type: 'warning',
    default: 'Attention',
    icon: <IoWarning />
  }
}

const Alert = (props) => {
  const {alert ,setAlert} = useContext(AlertContext);

  if(alert === null) {
    return null;
  }

  return (
    <div
      className={'alert alert--' + alert.type}
    >
      <div className="alert__content">
        <button className="alert__content__close" onClick={() => setAlert(null)}>
          <IoClose />
        </button>
        <div className="alert__content__icon">
          {alert.icon}
        </div>
        <div className="alert__content__text">
          {alert.message}
        </div>
      </div>
      <div className="alert__timer">
        <div></div>
      </div>
    </div>
  );
};

export default Alert;