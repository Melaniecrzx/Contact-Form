const submitBtn = document.getElementById('submit-btn');
const formulaire = document.getElementById('formulaire');
const inputs = document.querySelectorAll('input, textarea');

const checkValidity = (input) => {
    const wrapper = input.closest('.wrapper');
    const error = wrapper.querySelector('.error');
    let isValid = true;
//input = radio 
    if(input.type === 'radio') {
        const radioGroup = document.querySelectorAll(`input[name="${input.name}"]`);
        isValid = Array.from(radioGroup).some(radio => radio.checked);
    }
//input = checkbox 
    else if(input.type === 'checkbox') {
       if(!input.checked){
        isValid = false;
       }
    }
//input = textarea 
     else if (input.tagName.toLowerCase() === 'textarea') {
        isValid = input.value.trim() !== '';
    }
//input = email 
    else if(input.type === 'email') {
        isValid = input.value.trim() !== '' && input.validity.valid;
    }
//input = text 
    else if(input.type === 'text') {
        isValid = input.value.trim() !== '';
    }
//Display error    
    if(error) {
        if(!isValid) {
            error.classList.remove('hidden');
            input.classList.add('border-red-error');
        } else {
            error.classList.add('hidden');
            input.classList.remove('border-red-error');
        }
    }
    return isValid;
}


formulaire.addEventListener('submit',(e) => {
    e.preventDefault();
    let formValid = true;
    inputs.forEach(ipt => {
        if(!checkValidity(ipt)) {
            formValid = false;
        }
    });
    if(formValid) {
        const successMessage = document.getElementById('success-message');
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 3000);
        e.target.reset();
    }
})