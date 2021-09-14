import React from "react";
import styles from "./Modal.module.scss";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
       // shouldComponentUpdate(nextProps, nextState) {
       //        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
       // }

       return (
              <>
                     <Backdrop show={props.show} clicked={props.modalClosed} />
                     <div
                            className={styles.Modal}
                            //  {classNames({
                            //         [styles['Modal']]: true,
                            //         [styles['Loading']]: props.loading
                            //  })}
                            style={{
                                   transform: props.show ? "translate(calc(50vw - 50%))" : "translateY(-100vh)",
                                   opacity: props.show ? "1" : "0"
                            }}>
                            {props.children}
                     </div>
              </>
       );
};

export default React.memo(
       Modal,
       (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children
);
