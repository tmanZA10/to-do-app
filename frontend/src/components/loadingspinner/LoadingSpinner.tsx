import styles from './LoadingSpinner.module.css'

type propTypes = {
    display: boolean
}


function LoadingSpinner({ display }: propTypes) {
    return (
        <div className={styles.container} style={display ? {}: {
            display: 'none'
        }}>
            <div className={styles.ldsRoller}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default LoadingSpinner;