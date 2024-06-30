import logo from '../assets/logo.svg'

export const ShopLogo = ({onClick}) => {

    const handleClick = () => {
        if (onClick) {
            onClick?.();
        }
    }

  return (
    <div className='logo-wrapper' onClick={handleClick}>
        <img className='shop-logo' src={logo} alt="Shop Logo" />
    </div>
  )
}
