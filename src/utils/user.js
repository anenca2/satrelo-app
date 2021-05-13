/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 * 
 * @description Archivo encargado de realizar acciones relaionadas al usuario
 */

export const buildRandomColor = () => {
    const hex = '0123456789ABCDEF'
    let color = '#';
    for (let i = 0; i < 6; i++)
        color += hex[Math.floor(Math.random() * 16)];

    return color;
}

export const buildUserAlias = (name, last_name) => {
    const firstLetter = name.charAt(0);
    const secondLetter = last_name.charAt(0);
    return (firstLetter + secondLetter).toUpperCase();
}

export const checkEmail = (email) => {
    const emailRegex = /[a-zA-Z0-9.+_-]+@[a-z]+\.[a-z]+/;
    return emailRegex.test(email);
}

export const checkUserFields = (state, update) => {
    let user = Object.assign({}, state);

    let hasErrors = false;
    /** Verificar que los campos no estén vacíos */
    if (user.name.value.trim() === '') {
        user.name.error = 'Este campo es obligatorio.';
        hasErrors = true;
    }
    
    if (user.last_name.value.trim() === '') {
        user.last_name.error = 'Este campo es obligatorio.';
        hasErrors = true;
    }

    if (user.email.value.trim() === '') {
        user.email.error = 'Este campo es obligatorio.';
        hasErrors = true;
    }

    if (user.id.value.trim() === '') {
        user.id.error = 'Este campo es obligatorio.';
        hasErrors = true;
    }

    if (user.username.value.trim() === '') {
        user.username.error = 'Este campo es obligatorio.';
        hasErrors = true;
    }
    
    let checkPassword = true;
    if (!update && user.password.value.trim() === '') {
        user.password.error = 'Este campo es obligatorio.';
        hasErrors = true;
        checkPassword= false;
    }
    
    /** Verificar que el campo email sea un email correcto */
    const emailRegex = /[a-zA-Z0-9.+_-]+@[a-z]+\.[a-z]+/;
    if (!emailRegex.test(user.email.value.trim())) {
        user.email.error = 'Debes ingresar un email válido.';
        hasErrors = true;
    }

    /** Verificar el campo contraseña para el paciente */
    if (checkPassword) {
        if (user.password.value.trim() !== '' && user.id_role.value === 1) {
            /** Verificar que la contraseña sólo contenga comas */
            const pwdRegex = /[ `!@#$%^g*()_+\-=[\]{};':"\\|.<>/?~]/;
            if (pwdRegex.test(user.password.value.trim())) {
                user.password.error = 'La contraseña del paciente no puede ' +
                                      'tener ningún caracter especial exceptuando ' +
                                      'la coma (,).';
                hasErrors = true; 
            }
            else {
                /** Verificar que la contraseña tenga 4 palabras */
                const words = user.password.value.trim().split(',');
                if (words.length !== 4) {
                    user.password.error = 'La contraseña del paciente debe tener ' +
                                          '4 palabras separadas por coma (,).';
                    hasErrors = true;
                }
                else {
                    /** Verificar que las palabras pertenezcan al conjunto */
                    const wordsSet = ['árbol', 'corazón', 'flor', 'nube', 'sol'];
                    let notInSet = false;
                    words.forEach(word => {
                        if (!wordsSet.includes(word)) notInSet = true;
                    });

                    if (notInSet) {
                        user.password.error = 'La contraseña del paciente debe ' + 
                                              'tener palabras pertenecientes ' + 
                                              'al conjunto descrito.';
                        hasErrors = true;
                    }
                }
            }
        }
    }

    return { hasErrors, user };
}