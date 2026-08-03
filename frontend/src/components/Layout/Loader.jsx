import React from 'react'

const Loader = () => {
    return (
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <div 
                className="spinner-border mb-3" 
                role="status"
                style={{
                    color: 'var(--bronze-hover)'
                }}
            >
                <span className="visually-hidden" style={{ visibility: 'hidden' }}>Loading...</span>
            </div>
            <div className="loading-text-select">
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        </div>
    )
}

export default Loader
