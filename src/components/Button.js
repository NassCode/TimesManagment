import PropTypes from 'prop-types'


const Button = ({color, text, onClick}) => {
    return (
        <div>
            <button 
            style={{backgroundColor: color}} 
            className="btn"
            onClick={onClick}
            >{text}</button>
        </div>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propType = {
    text: PropTypes.string,
    color: PropTypes.string
}

export default Button
