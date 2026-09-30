import React from 'react'
import './footer.css'
import logo from '../../assets/logo.jpg'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSpinner,  } from '@fortawesome/free-solid-svg-icons';


function Footer() {



  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  function closeModal() {
    setIsModalOpen(false);
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
  }

  function contact(e) {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
  }

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }






  return (
    <div className='footer'>
       <div className="footer__content">
            <Link to="#" className="footer__logo">
                <img src={logo} className="footer__img" alt="Tree Logo" />
            </Link>
            <div className="footer__links">
                <li><Link to="/" className="footer__link">Home</Link></li>
                <li><Link to="/Movies" className="footer__link">What to watch</Link></li>
                <li><Link to="" className="footer__link" onClick={toggleModal}>Contact</Link></li>
            </div>
            <p>&copy; 2026 All Rights Reserved.</p>
        </div>
         <div className={`modal ${isModalOpen ? 'modal--open' : ''}`}>
        <div className="modal-half modal-about">
          <h3 className="modal-title">About Us</h3>
          <p>We love to help families and friends pick out movies that complete their night!<br /> Help us to help you choose the right movie for you.</p>
        </div>
        <div className="modal-half modal-contact">
          <button className="exit" onClick={closeModal} type="button">
            <FontAwesomeIcon className='x-icon' icon={faXmark} />
          </button>
          <div className="contact-title">Contact Us</div>
           <form id="contact__form" className="contact_form" onSubmit={contact}>
                    <div className="form__item">
                        <label className="form__item--label" >Name</label>
                        <input name="user_name" className="input" type="text" required></input>
                    </div>
                     <div className="form__item">
                        <label className="form__item--label" >Email</label>
                        <input name="user_email" className="input" type="email" required></input>
                    </div>
                     <div className="form__item">
                        <label className="form__item--label" required>Message</label>
                        <textarea name="message" className="input" type="text"></textarea>
                    </div>
                    <button id="contact__submit" className ="form__submit" type="submit">
                        Submit
                    </button>
                </form>
          {isLoading && (
            <div className="modal__overlay modal__overlay--loading modal__overlay--visible">
              <FontAwesomeIcon className="faSpinner" icon={faSpinner} />
            </div>
          )}
          {isSuccess && (
            <div className="modal__overlay modal__overlay--success modal__overlay--visible">
              <div className='modal__overlay-p'>Thank you for your message! We will get back to you as soon as possible.</div>
              <button className='x__icon--success' type="button" onClick={closeModal}>
                <FontAwesomeIcon className='x-icon' icon={faXmark} />
              </button>
            </div>
          )}
          {isError && (
            <div className="modal__overlay modal__overlay--error modal__overlay--visible">
              <div className='modal__overlay-p'>The email service is currently unavailable. Please try contacting us directly at email@email.com.</div>
              <button className='x__icon--success' type="button" onClick={closeModal}>
                <FontAwesomeIcon className='x-icon' icon={faXmark} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    
  );
}
export default Footer
