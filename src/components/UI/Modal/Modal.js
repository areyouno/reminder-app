import React from 'react';
import styles from './Modal.module.css';
import Ox from '../../../hoc/Ox';
import Backdrop from '../Backdrop/Backdrop';
// import classNames from 'classnames';

const Modal = props => {
       // shouldComponentUpdate(nextProps, nextState) {
       //        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
       // }

       return (
              <Ox>
                     <Backdrop show={props.show} clicked={props.modalClosed} />
                     <div
                            className={styles.Modal}
                            //  {classNames({
                            //         [styles['Modal']]: true,
                            //         [styles['Loading']]: props.loading
                            //  })}
                            style={{
                                   transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                                   opacity: props.show ? '1' : '0'
                            }}>
                            {props.children}
                     </div>
              </Ox>
       );
};

export default React.memo(
       Modal,
       (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children
);
