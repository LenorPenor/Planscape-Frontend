import { ReactComponent as ContactImg } from '../../imgs/illustrations/contact-img.svg'
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser';

const Contact = () => {
    const {ref: contactHeadingRef, inView: contactHeadingVisible} = useInView()
    const {ref: contactFormRef, inView: contactFormVisible} = useInView()

    const form = useRef();

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const sendEmail = (e) => {
        e.preventDefault();

        if(!firstname || !lastname || !email || !message){                                                          //if any of the fields is empty
            setError('Please fill out all fields.')                                                                     //set error message
            return                                                                                                      //return
        }else{                                                                                                      //else
            emailjs.sendForm('service_h4hfbok', 'template_ftlya4i', form.current, 'WMcaydfhNnRav9qHZ')                  //send form
            .then((result) => {
                console.log(result.text);                                                                               //log result
                setError('')                                                                                            //clear error
                setSuccess('Thank you for reaching out to us! Your message has been sent.')                             //set success meaage
            }, (error) => {
                console.log(error.text);                                                                                //log error
            })
            .then(() => {                                                                                               //clear form
                setFirstname('')
                setLastname('')
                setEmail('')
                setMessage('')
            })
        }
      };

      useEffect(() => {
        if (success) {                                                                                                  //if email was sent
          const timeoutId = setTimeout(() => {                                                                              //show success message for 5 seconds
            setSuccess('');
          }, 5000);
    
          return () => clearTimeout(timeoutId);
        }
      }, [success]);
      
    return(
        <div>
            <h2 ref={contactHeadingRef} className={`${contactHeadingVisible && 'animate-entrance'} hidden-entrance contactHeading text-4xl font-bold mb-10 mt-96 text-center`}>Contact <span className="text-purple">Us</span></h2>
            <div ref={contactFormRef} id="contact" className="contact-container flex text-center relative">
                <img className="home-bg2 absolute" src={require("../../imgs/illustrations/home-bg2.png")} alt="" />
                <div className={`${contactFormVisible && 'animate-entrance'} hidden-entrance contactForm w-full`}>
                    <div className="flex px-6 py-8 mx-auto text-start">
                        <div className="auth-container contact rounded-lg shadow bg-card-light dark:bg-card-dark flex">
                            <div className='auth-img'>
                                <div>
                                    <ContactImg />
                                </div>
                            </div>
                            <div className="form p-6 space-y-4 p-8">
                                <form ref={form} onSubmit={sendEmail} className="space-y-4 md:space-y-6" action="#">
                                    <div className='name-input flex'>
                                        {/* First Name ---------------------------------- */}
                                        <div>
                                            <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-black dark:text-white">First Name</label>
                                            <input 
                                                type="text" 
                                                name="firstname" 
                                                id="firstname"
                                                value={firstname}
                                                onChange={(e) => {setFirstname(e.target.value)}}
                                                className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 dark:text-white" 
                                                placeholder="John" 
                                                required=""
                                            />
                                        </div>

                                        {/* Last Name ----------------------------------- */}
                                        <div>
                                            <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-black dark:text-white">Last Name</label>
                                            <input 
                                                type="text" 
                                                name="lastname" 
                                                id="lastname"
                                                value={lastname}
                                                onChange={(e) => {setLastname(e.target.value)}}
                                                className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 dark:text-white" 
                                                placeholder="Doe" 
                                                required=""
                                                />
                                            </div>
                                    </div>
                                    {/* Email ----------------------------------- */}
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Email</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email"
                                            value={email}
                                            onChange={(e) => {setEmail(e.target.value)}}
                                            className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 text-black dark:text-white" 
                                            placeholder="example@email.com" 
                                            required=""
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="font-semibold">Message</label>
                                        <textarea
                                            name="message" 
                                            id="message"
                                            value={message}
                                            onChange={(e) => {setMessage(e.target.value)}}
                                            rows={5}
                                            className="bg-section-light dark:bg-list-dark border border-white dark:border-black text-black sm:text-sm rounded-lg block w-full p-2.5 text-black dark:text-white" 
                                            placeholder="What would you like to tell us?"
                                            required=""
                                        />
                                    </div>
                                    
                                    <button type="submit" value="send" className="w-full text-white bg-purple font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-black transition-all">
                                        Send Message
                                    </button>
                                    {error && <small className='text-red'>{error}</small> }
                                    {success && <p className='text-green font-semibold text-center border border-green bg-green-lighter p-3 rounded-lg'>{success}</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact