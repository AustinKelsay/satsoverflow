import React from 'react';
import './Alert.module.scss';

const Alert = ({ alerts }) => {
  return alerts.length > 0 &&
    alerts.map((alert, index) => {
      if (alert.alertType === 'success') {
        return (
          <aside key={index} className="alert s-notice s-notice__success s-notice__important" role="alert">
            {alert.msg}
          </aside>
        )
      } else {
        return (
          <aside key={index} className="alert s-notice s-notice__danger s-notice__important" role="alert">
            {alert.msg}
          </aside>
        )
      }
    }
  )
}

export default Alert;
