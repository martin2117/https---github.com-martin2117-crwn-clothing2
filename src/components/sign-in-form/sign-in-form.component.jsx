import { useState, useContext } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields;

    const { setCurrentUser } = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        setCurrentUser(user);
      };

    const handleSubmit = async(event) => {
        event.preventDefault();
        

        try {
           const {user} = await signInAuthUserWithEmailAndPassword(email, password)
           resetFormFields();
           setCurrentUser(user);
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email.')
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email.')
                    break;
                default:
                    console.log(error)
            }
            
        }
    }


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    return(
        <div className="sign-in-container">
            <h2>Do you have an account already?</h2>
            <span>Sign-in with your e-mail and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required name='email' value={email} onChange={handleChange}/>
                <FormInput label='Password' type='password' required name='password' value={password} onChange={handleChange}/>
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;