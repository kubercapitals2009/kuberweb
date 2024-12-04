// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYq7emwuBE5umqLsPOVuSAuFVof8AKtsY",
    authDomain: "kuber-capitals-670d4.firebaseapp.com",
    databaseURL: "https://kuber-capitals-670d4-default-rtdb.firebaseio.com",
    projectId: "kuber-capitals-670d4",
    storageBucket: "kuber-capitals-670d4.firebasestorage.app",
    messagingSenderId: "1047880352488",
    appId: "1:1047880352488:web:4b8ab2ed1ed5cac6a2bf5d",
    measurementId: "G-H6N1MTGHHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// initialize varialble

const auth = firebase.auth()
const Datebase = firebase.database()

function Login() {
    
}





if (validate_email(email) == false || validate_password == false) {
    alert('email or password is out line');
    return
}

if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_ == false)) {

}
auth.createUserWithEmailAndPassword(email, password)
    .then(function () {

        var user = auth.currentUser

        // Add this user to firebase Datebase
        var database_ref = db.ref()

        //Create User data
        var user_data = {
            first_name : first_name,
            email : email,
            PhoneNumber : number,
            Gender : gender,
            DOB : dob,
            Aadhar :aadhar,
            PanNumber :pan,
            State :state,
            AccountType :account,
            YourCitiy : city,
            Password : pass,
            ConfirmPass : c_pass,
            Address : address,
            last_login : Date.now()

        }

        database_ref.child('users/' + user.uid).set(user_data)

        alert('User Created!')
    })
    .catch(function (error) {
        var error_code = error.code
        var error_message = error.message

        alert(error_message);
    })



function validate_email(email) {
    const patt = /^[^@]+@\w+(\.\w+)+\w$/
    if (XPathExpression.text(email) == true) {
        return true
    }
    else {
        return false
    }
}

function validate_password(password) {
    if (password < 6) {
        return false
    }
    else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }
    if (field.length <= 0) {
        return false
    }
    else {
        return true
    }
}
