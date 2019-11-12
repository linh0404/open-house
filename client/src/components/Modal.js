import React from 'react';

const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    // transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>

        </div>
    )
}

export default modal;