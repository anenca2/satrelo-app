/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

export const options = {
    eye: { 
        id: 1,
        name: 'Ojos', 
        dbalias: 'eye',
        icon: '/images/other/eye_icon.png' 
    },
    hair: { 
        id: 2, 
        name: 'Cabello', 
        dbalias: 'hair',
        icon: '/images/other/hair_icon.png'
    },
    torso: { 
        id: 3,
        name: 'Torso', 
        dbalias: 'torso',
        icon: '/images/other/torso_icon.png'
    },
};

export const eye = {
    colors: {
        kind: 'rounded',
        name: 'colors',
        options: {
            blue: {
                id: 1,
                button: 'blue',
                colorHex: '#62ABDF',
                name: 'Azul'
            },
            brown: {
                id: 2,
                button: 'brown',
                colorHex: '#55392F',
                name: 'Café'
            }
        },
        title: 'Color de ojos'
    }
};

export const hair = {
    colors: {
        kind: 'rounded',
        name: 'colors',
        options: {
            black: {
                id: 1,
                button: 'black',
                colorHex: '#030405',
                name: 'Negro'
            },
            blonde: {
                id: 2,
                button: 'blonde',
                colorHex: '#FCD860',
                name: 'Rubio'
            },
            brown: {
                id: 3,
                button: 'brown',
                colorHex: '#9D4427',
                name: 'Café'
            }
        },
        title: 'Color de cabello'
    }
};

export const torso = {
    colors: {
        kind: 'rounded',
        name: 'colors',
        options: {
            blue: {
                id: 1,
                button: 'blue',
                colorHex: '#1C3351',
                name: 'Azul'
            },
            green: {
                id: 2,
                button: 'green',
                colorHex: '#279599',
                name: 'Verde'
            },
            purple: {
                id: 3,
                button: 'purple',
                colorHex: '#612747',
                name: 'Morado'
            }
        },
        title: 'Color del torso'
    }
};